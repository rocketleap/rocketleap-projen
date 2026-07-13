import { Project, YamlFile } from 'projen';

/**
 * A stage in the single main → production pipeline.
 *
 * `environment` is used both as
 *   - the CDK app file segment for `yarn synth` (looks at
 *     `bin/<environment>.ts` or `bin/<environment>/<workload>.ts`), and
 *   - the GitHub Environment name applied to the deploy job.
 *
 * Every deploy job carries `environment: <environment>` — whether that
 * pauses the pipeline for approval depends purely on the GitHub
 * Environment protection rules configured in the repo settings for that
 * name. Empty required-reviewers → the deploy runs freely and just gets
 * recorded in the Environments tab. Required reviewers → the deploy
 * waits on approval.
 *
 * `workload` is only used by multi-app projects (e.g. platform-cdk).
 */
export interface PipelineStage {
  /**
   * The CDK app file segment AND the GitHub Environment name.
   *
   * @example 'iam'
   * @example 'dev'
   * @example 'prodeu'
   */
  readonly environment: string;
  /**
   * Optional workload name for multi-app projects.
   *
   * @example 'example-ecs'
   */
  readonly workload?: string;
}

/**
 * Pipeline workflow configuration for a Rocketleap CDK project.
 *
 * The generated pipeline is a single `main` → production chain:
 *   - PR to `main` runs the reusable `action-build.yml` (which internally
 *     compiles once and synths every stage in parallel via a matrix) then
 *     a per-stage diff job.
 *   - Push to `main` runs the same `action-build.yml` then a sequential
 *     deploy chain in the order listed. Every deploy sets its GitHub
 *     Environment so stages whose Environment has required reviewers wait
 *     on approval before running.
 */
export interface PipelineOptions {
  /**
   * Ordered list of stages the pipeline promotes through, from earliest
   * (e.g. `dev`) to latest (e.g. `produs`). Every stage's deploy job sets
   * `environment: <environment>` — configure GitHub Environment protection
   * rules in the repo settings on the prod-tier stages to gate them.
   */
  readonly stages: PipelineStage[];
  /**
   * Customize the `corymhall/cdk-diff-action` step used in the PR diff
   * workflow.
   *
   * @default - failOnDestructiveChanges: false
   */
  readonly cdkDiff?: CdkDiffOptions;
}

/**
 * Configuration for the `corymhall/cdk-diff-action@v2` step run inside the
 * generated PR diff workflow (`pr-main.yml`).
 */
export interface CdkDiffOptions {
  /**
   * Fail the diff workflow when destructive changes are detected.
   *
   * Default: `false` — destructive changes are surfaced in the rich PR
   * comment for reviewer attention but don't block the workflow. The
   * GitHub Environment approval on prod-tier deploy jobs is the gate;
   * CI just shows what would change.
   *
   * @default false
   */
  readonly failOnDestructiveChanges?: boolean;
}

const PERMISSIONS_DEFAULT = {
  actions: 'write',
  contents: 'read',
  packages: 'read',
} as const;

const PERMISSIONS_PR = {
  'actions': 'write',
  'pull-requests': 'write',
  'contents': 'read',
  'packages': 'read',
  'id-token': 'write',
} as const;

const PERMISSIONS_PUSH = {
  'actions': 'write',
  'contents': 'write',
  'packages': 'read',
  'id-token': 'write',
  'pull-requests': 'write',
} as const;

function bootstrapSteps(): Array<Record<string, unknown>> {
  return [
    {
      name: 'Enable Corepack',
      run: 'corepack enable',
    },
    {
      uses: 'actions/setup-node@v6',
      with: {
        'node-version': '24',
        'cache': 'yarn',
      },
    },
  ];
}

function pathsScript(): string {
  // Shared by synth (upload) + deploy/diff (download): sets `cdk_out_dir`
  // and `artifact_name` from `environment` / `workload` inputs so
  // upload and download agree on the artifact name without touching
  // GH Actions expression tricks.
  return [
    'if [ "${{inputs.workload}}" == "" ]; then',
    '  echo \'cdk_out_dir=cdk.out/${{inputs.environment}}\' >> "$GITHUB_ENV"',
    '  echo \'artifact_name=cdk-out-${{inputs.environment}}\' >> "$GITHUB_ENV"',
    'else',
    '  echo \'cdk_out_dir=cdk.out/${{inputs.environment}}/${{inputs.workload}}\' >> "$GITHUB_ENV"',
    '  echo \'artifact_name=cdk-out-${{inputs.environment}}-${{inputs.workload}}\' >> "$GITHUB_ENV"',
    'fi',
  ].join('\n');
}

function accountAndRegionFromManifestScript(): string {
  return [
    'env_uri=$(jq -r \'.artifacts | to_entries | map(select(.value.type == "aws:cloudformation:stack")) | .[0].value.environment\' "${{env.cdk_out_dir}}/manifest.json")',
    'echo "account_id=$(echo "$env_uri" | awk -F\'/\' \'{print $3}\')" >> "$GITHUB_ENV"',
    'echo "region=$(echo "$env_uri" | awk -F\'/\' \'{print $4}\')" >> "$GITHUB_ENV"',
  ].join('\n');
}

function configureAwsStep(): Record<string, unknown> {
  return {
    name: 'Configure AWS credentials',
    uses: 'aws-actions/configure-aws-credentials@v4',
    with: {
      'role-to-assume': 'arn:aws:iam::${{env.account_id}}:role/CdkDeployRole',
      'aws-region': '${{ env.region }}',
    },
  };
}

function checkoutStep(): Record<string, unknown> {
  return {
    name: 'Checkout',
    uses: 'actions/checkout@v6',
    with: {
      ref: '${{ github.event.pull_request.head.ref || github.ref }}',
      repository: '${{ github.event.pull_request.head.repo.full_name || github.repository }}',
    },
  };
}

function matrixStageEntries(stages: PipelineStage[]): Array<Record<string, string>> {
  return stages.map((stage) => {
    const entry: Record<string, string> = { environment: stage.environment };
    if (stage.workload) {
      entry.workload = stage.workload;
    }
    return entry;
  });
}

/**
 * `action-build.yml` — reusable workflow with two internal jobs:
 *
 *   1. `build` — install, projen drift check, format/lint/tsc/test, then
 *      upload the compiled workspace (minus `.git` and `cdk.out`) as a
 *      `build-workspace` artifact. Runs once.
 *   2. `synth` — matrix over the configured stages, `needs: build`. Each
 *      matrix entry downloads the `build-workspace` artifact so it skips
 *      the reinstall + rebuild, runs `yarn synth <env>[/<workload>]`, and
 *      uploads the resulting cloud assembly as `cdk-out-<env>[-<workload>]`.
 *
 * By the time an external caller's `needs: build` fires, both jobs have
 * finished — so downstream deploy/diff jobs can download any
 * `cdk-out-<env>[-<workload>]` artifact directly.
 */
export function addActionBuildWorkflow(project: Project, stages: PipelineStage[]): void {
  if (!stages || stages.length === 0) {
    throw new Error('addActionBuildWorkflow: stages must contain at least one entry');
  }
  new YamlFile(project, '.github/workflows/action-build.yml', {
    obj: {
      name: 'Action: Build',
      on: {
        workflow_call: {
          inputs: {
            ref: {
              description: 'Git ref to checkout. Defaults to the PR head ref when called from a pull request.',
              required: false,
              type: 'string',
              default: '',
            },
          },
        },
      },
      env: {
        GITHUB_TOKEN: '${{ secrets.GITHUB_TOKEN }}',
      },
      permissions: PERMISSIONS_DEFAULT,
      jobs: {
        build: {
          'runs-on': 'ubuntu-latest',
          'steps': [
            {
              name: 'Checkout',
              uses: 'actions/checkout@v6',
              with: {
                ref: '${{ inputs.ref || github.event.pull_request.head.ref || github.ref }}',
                repository: '${{ github.event.pull_request.head.repo.full_name || github.repository }}',
              },
            },
            ...bootstrapSteps(),
            { run: 'yarn' },
            {
              name: 'projen',
              run: [
                'npx projen',
                'git diff --exit-code || (echo "::error::.projenrc.ts and committed files are out of sync. Run \'npx projen\' locally and commit the result." && exit 1)',
              ].join('\n'),
            },
            { run: 'yarn format:ci' },
            { run: 'yarn lint:ci' },
            { run: 'yarn build' },
            { run: 'yarn test:ci' },
            {
              name: 'Upload build workspace',
              uses: 'actions/upload-artifact@v4',
              with: {
                'name': 'build-workspace',
                // The whole workspace minus VCS + prior cdk.out so downstream
                // synth entries skip the install + tsc.
                'path': ['.', '!.git', '!cdk.out'].join('\n'),
                'include-hidden-files': 'true',
                'retention-days': 1,
                'if-no-files-found': 'error',
              },
            },
          ],
        },
        synth: {
          'name':
            "Synth ${{ matrix.stage.environment }}${{ matrix.stage.workload && format(' ({0})', matrix.stage.workload) || '' }}",
          'needs': 'build',
          'runs-on': 'ubuntu-latest',
          'strategy': {
            'fail-fast': false,
            'matrix': {
              stage: matrixStageEntries(stages),
            },
          },
          'steps': [
            {
              name: 'Download build workspace',
              uses: 'actions/download-artifact@v4',
              with: {
                name: 'build-workspace',
                path: '.',
              },
            },
            ...bootstrapSteps(),
            {
              name: 'Set paths',
              shell: 'bash',
              env: {
                MATRIX_ENVIRONMENT: '${{ matrix.stage.environment }}',
                MATRIX_WORKLOAD: '${{ matrix.stage.workload }}',
              },
              // Same shape as pathsScript() but reads from matrix env vars
              // instead of workflow_call inputs.
              run: [
                'if [ -z "$MATRIX_WORKLOAD" ]; then',
                '  echo "cdk_out_dir=cdk.out/$MATRIX_ENVIRONMENT" >> "$GITHUB_ENV"',
                '  echo "artifact_name=cdk-out-$MATRIX_ENVIRONMENT" >> "$GITHUB_ENV"',
                '  echo "synth_arg=$MATRIX_ENVIRONMENT" >> "$GITHUB_ENV"',
                'else',
                '  echo "cdk_out_dir=cdk.out/$MATRIX_ENVIRONMENT/$MATRIX_WORKLOAD" >> "$GITHUB_ENV"',
                '  echo "artifact_name=cdk-out-$MATRIX_ENVIRONMENT-$MATRIX_WORKLOAD" >> "$GITHUB_ENV"',
                '  echo "synth_arg=$MATRIX_ENVIRONMENT/$MATRIX_WORKLOAD" >> "$GITHUB_ENV"',
                'fi',
              ].join('\n'),
            },
            {
              name: 'Synth',
              run: 'yarn synth "${{ env.synth_arg }}"',
            },
            {
              name: 'Upload cdk.out',
              uses: 'actions/upload-artifact@v4',
              with: {
                'name': '${{ env.artifact_name }}',
                'path': '${{ env.cdk_out_dir }}',
                'retention-days': 7,
                'if-no-files-found': 'error',
              },
            },
          ],
        },
      },
    },
  });
}

export function addActionDeployWorkflow(project: Project): void {
  new YamlFile(project, '.github/workflows/action-deploy.yml', {
    obj: {
      name: 'Action: Deploy Environment',
      on: {
        workflow_call: {
          inputs: {
            environment: { type: 'string', required: true },
            workload: { type: 'string', required: false },
          },
        },
      },
      env: {
        GITHUB_TOKEN: '${{ secrets.GITHUB_TOKEN }}',
      },
      concurrency: '${{inputs.environment}}${{inputs.workload}}',
      permissions: {
        ...PERMISSIONS_DEFAULT,
        'id-token': 'write',
      },
      jobs: {
        deploy: {
          'runs-on': 'ubuntu-latest',
          'environment': '${{ inputs.environment }}',
          'steps': [
            checkoutStep(),
            ...bootstrapSteps(),
            { run: 'yarn' },
            {
              name: 'Set paths',
              shell: 'bash',
              run: pathsScript(),
            },
            {
              name: 'Download cdk.out',
              uses: 'actions/download-artifact@v4',
              with: {
                name: '${{ env.artifact_name }}',
                path: '${{ env.cdk_out_dir }}',
              },
            },
            {
              name: 'Set AWS AccountId and Region',
              shell: 'bash',
              run: accountAndRegionFromManifestScript(),
            },
            configureAwsStep(),
            {
              name: 'Deploy',
              run: 'yarn run deploy:ci "${{env.cdk_out_dir}}"',
            },
          ],
        },
      },
    },
  });
}

export function addActionDiffWorkflow(project: Project, options?: CdkDiffOptions): void {
  const failOnDestructiveChanges = options?.failOnDestructiveChanges ?? false;
  new YamlFile(project, '.github/workflows/action-diff.yml', {
    obj: {
      name: 'Action: Diff environment',
      on: {
        workflow_call: {
          inputs: {
            'job-name': {
              type: 'string',
              required: true,
              description:
                'Display name for this diff entry; passed to cdk-diff-action as `title` so each stage gets its own PR comment.',
            },
            'environment': { type: 'string', required: true },
            'workload': { type: 'string', required: false },
          },
        },
      },
      env: {
        GITHUB_TOKEN: '${{ secrets.GITHUB_TOKEN }}',
      },
      permissions: PERMISSIONS_PR,
      jobs: {
        diff: {
          'runs-on': 'ubuntu-latest',
          'steps': [
            {
              name: 'Set paths',
              shell: 'bash',
              run: pathsScript(),
            },
            {
              name: 'Download cdk.out',
              uses: 'actions/download-artifact@v4',
              with: {
                name: '${{ env.artifact_name }}',
                path: '${{ env.cdk_out_dir }}',
              },
            },
            {
              name: 'Set AWS AccountId and Region',
              shell: 'bash',
              run: accountAndRegionFromManifestScript(),
            },
            configureAwsStep(),
            {
              name: 'Diff',
              uses: 'corymhall/cdk-diff-action@v2',
              with: {
                githubToken: '${{ secrets.GITHUB_TOKEN }}',
                title: '${{ inputs.job-name }}',
                failOnDestructiveChanges: String(failOnDestructiveChanges),
                cdkOutDir: '${{ env.cdk_out_dir }}',
                noSynth: 'true',
              },
            },
          ],
        },
      },
    },
  });
}

function stageSlug(stage: PipelineStage): string {
  const base = stage.workload ? `${stage.environment}-${stage.workload}` : stage.environment;
  return base.replace(/[^a-zA-Z0-9_-]/g, '-');
}

function deployJobId(stage: PipelineStage, index: number): string {
  return `deploy-${stageSlug(stage)}-${index}`;
}

function diffJobId(stage: PipelineStage, index: number): string {
  return `diff-${stageSlug(stage)}-${index}`;
}

function deployJobFor(stage: PipelineStage, needs: string[]): Record<string, unknown> {
  const withInputs: Record<string, unknown> = { environment: stage.environment };
  if (stage.workload) {
    withInputs.workload = stage.workload;
  }
  return {
    name: stage.workload ? `Deploy ${stage.environment} (${stage.workload})` : `Deploy ${stage.environment}`,
    needs,
    uses: './.github/workflows/action-deploy.yml',
    with: withInputs,
  };
}

function diffJobFor(stage: PipelineStage, needs: string[]): Record<string, unknown> {
  const jobName = stage.workload ? `Diff ${stage.environment} (${stage.workload})` : `Diff ${stage.environment}`;
  const withInputs: Record<string, unknown> = {
    'job-name': jobName,
    'environment': stage.environment,
  };
  if (stage.workload) {
    withInputs.workload = stage.workload;
  }
  return {
    name: jobName,
    needs,
    uses: './.github/workflows/action-diff.yml',
    with: withInputs,
  };
}

export function addPrMainWorkflow(project: Project, stages: PipelineStage[]): void {
  if (!stages || stages.length === 0) {
    throw new Error('addPrMainWorkflow: stages must contain at least one entry');
  }
  const jobs: Record<string, unknown> = {
    // `build` runs install/test + a parallel synth matrix over every stage
    // inside action-build.yml, so by the time it completes every stage's
    // cdk.out artifact is already uploaded. Diff jobs just need `build`.
    build: { name: 'Build', uses: './.github/workflows/action-build.yml' },
  };
  stages.forEach((stage, index) => {
    jobs[diffJobId(stage, index)] = diffJobFor(stage, ['build']);
  });

  new YamlFile(project, '.github/workflows/pr-main.yml', {
    obj: {
      name: 'PR: Main Branch',
      on: {
        pull_request: { branches: ['main', 'dev'] },
      },
      permissions: PERMISSIONS_PR,
      jobs,
    },
  });
}

export function addPushMainWorkflow(project: Project, stages: PipelineStage[]): void {
  if (!stages || stages.length === 0) {
    throw new Error('addPushMainWorkflow: stages must contain at least one entry');
  }
  const jobs: Record<string, unknown> = {
    build: { name: 'Build', uses: './.github/workflows/action-build.yml' },
  };
  // Sequential deploy chain. The first deploy needs `build` (which produced
  // every stage's synth artifact). Each subsequent deploy needs the previous
  // deploy so gated stages pause the chain until approved.
  let previous = 'build';
  stages.forEach((stage, index) => {
    const deployId = deployJobId(stage, index);
    jobs[deployId] = deployJobFor(stage, [previous]);
    previous = deployId;
  });

  new YamlFile(project, '.github/workflows/push-main.yml', {
    obj: {
      name: 'Push: Main Branch',
      on: {
        push: { branches: ['main', 'dev'] },
        workflow_dispatch: {},
      },
      permissions: PERMISSIONS_PUSH,
      concurrency: 'main',
      jobs,
    },
  });
}

/**
 * Adds the standard Rocketleap CDK pipeline GitHub Actions workflows.
 *
 * Emits five workflows:
 *
 *   - `action-build.yml` — reusable. Two internal jobs: `build` (install +
 *     drift + format/lint/tsc/test + upload `build-workspace` artifact) and
 *     `synth` (matrix over stages, downloads `build-workspace`, runs
 *     `yarn synth <env>[/<workload>]`, uploads `cdk-out-<env>[-<workload>]`).
 *   - `action-deploy.yml` — reusable deploy: install, download the stage's
 *     `cdk-out-<env>[-<workload>]` artifact, `yarn run deploy:ci "<cdk_out_dir>"`.
 *     Sets `environment: ${{ inputs.environment }}` at the job level so
 *     GitHub Environment protection rules configured on that name gate the
 *     deploy.
 *   - `action-diff.yml` — reusable diff: download the stage's cdk.out
 *     artifact, run `corymhall/cdk-diff-action@v2` with `noSynth: true`
 *     against the pre-synthed cloud assembly.
 *   - `pr-main.yml` — `build` → per-stage `diff` (all diffs fan out from
 *     build, so they run in parallel after build's synth matrix completes).
 *   - `push-main.yml` — `build` → sequential deploy chain. Each deploy
 *     needs the previous deploy so stages whose GitHub Environment has
 *     required reviewers pause the chain until approved.
 */
export function addCdkPipelineWorkflows(project: Project, options: PipelineOptions): void {
  if (!options.stages || options.stages.length === 0) {
    throw new Error('pipeline.stages must contain at least one entry');
  }

  addActionBuildWorkflow(project, options.stages);
  addActionDeployWorkflow(project);
  addActionDiffWorkflow(project, options.cdkDiff);
  addPrMainWorkflow(project, options.stages);
  addPushMainWorkflow(project, options.stages);
}
