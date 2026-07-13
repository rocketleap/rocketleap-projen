import { Project, YamlFile } from 'projen';

/**
 * A stage in the single main → production pipeline.
 *
 * `environment` maps to the CDK app file segment used by `yarn synth`
 * (which looks at `bin/<environment>.ts` or
 * `bin/<environment>/<workload>.ts`).
 *
 * `workload` is only used by multi-app projects (e.g. platform-cdk).
 *
 * `gated: true` puts the deploy job behind a GitHub Environment protection
 * rule of the same name as `environment`. Reviewers configured on that
 * Environment in the repo settings must approve before the job runs.
 */
export interface PipelineStage {
  /**
   * The CDK app file segment / GitHub Environment name.
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
  /**
   * When `true`, the deploy job for this stage sets `environment: <environment>`
   * so GitHub Environment protection rules (required reviewers) gate the deploy.
   *
   * @default false
   */
  readonly gated?: boolean;
}

/**
 * Pipeline workflow configuration for a Rocketleap CDK project.
 *
 * The generated pipeline is a single `main` → production chain:
 *   - PR to `main` runs build + diff on every stage
 *   - Push to `main` builds once, then deploys stages sequentially in the
 *     order listed; stages with `gated: true` wait on a GitHub Environment
 *     approval before running.
 */
export interface PipelineOptions {
  /**
   * Ordered list of stages the pipeline promotes through, from earliest
   * (e.g. `dev`) to latest (e.g. `produs`). Prod-tier stages should carry
   * `gated: true` so their deploy waits on a GitHub Environment approval.
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

const CDK_OUT_ARTIFACT = 'cdk-out';

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

function cdkOutDirScript(): string {
  return [
    'if [ "${{inputs.workload}}" == "" ]; then',
    '  echo \'cdk_out_dir=cdk.out/${{inputs.environment}}\' >> "$GITHUB_ENV"',
    'else',
    '  echo \'cdk_out_dir=cdk.out/${{inputs.environment}}/${{inputs.workload}}\' >> "$GITHUB_ENV"',
    'fi',
  ].join('\n');
}

function accountAndRegionFromManifestScript(): string {
  // Reads the first stack's AWS environment URI (aws://ACCOUNT/REGION)
  // from the pre-synthed cloud assembly's manifest.json.
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

function synthStepFor(stage: PipelineStage): Record<string, unknown> {
  const label = stage.workload ? `${stage.environment}/${stage.workload}` : stage.environment;
  const arg = stage.workload ? `${stage.environment}/${stage.workload}` : stage.environment;
  return {
    name: `Synth ${label}`,
    run: `yarn synth ${arg}`,
  };
}

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
            ...stages.map(synthStepFor),
            {
              name: 'Upload cdk.out',
              uses: 'actions/upload-artifact@v4',
              with: {
                'name': CDK_OUT_ARTIFACT,
                'path': 'cdk.out/',
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
            'environment': { type: 'string', required: true },
            'workload': { type: 'string', required: false },
            'gh-environment': {
              type: 'string',
              required: false,
              default: '',
              description: 'GitHub Environment name for approval gating; leave empty to deploy without a gate.',
            },
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
          'environment': '${{ inputs.gh-environment }}',
          'steps': [
            {
              name: 'Download cdk.out',
              uses: 'actions/download-artifact@v4',
              with: { name: CDK_OUT_ARTIFACT, path: 'cdk.out/' },
            },
            {
              name: 'Set cdk.out directory',
              shell: 'bash',
              run: cdkOutDirScript(),
            },
            {
              name: 'Set AWS AccountId and Region',
              shell: 'bash',
              run: accountAndRegionFromManifestScript(),
            },
            configureAwsStep(),
            {
              name: 'Enable Corepack',
              run: 'corepack enable',
            },
            {
              uses: 'actions/setup-node@v6',
              with: { 'node-version': '24' },
            },
            {
              name: 'Deploy',
              run: 'npx cdk deploy --concurrency 10 --ci --all --require-approval never --app "${{env.cdk_out_dir}}"',
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
                'Display name for this matrix entry; passed to cdk-diff-action as `title` so each matrix entry gets its own PR comment.',
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
              name: 'Download cdk.out',
              uses: 'actions/download-artifact@v4',
              with: { name: CDK_OUT_ARTIFACT, path: 'cdk.out/' },
            },
            {
              name: 'Set cdk.out directory',
              shell: 'bash',
              run: cdkOutDirScript(),
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

function matrixBlock(entries: PipelineStage[]): Record<string, unknown> {
  return {
    'fail-fast': false,
    'matrix': {
      workloads: entries.map((e) =>
        e.workload ? { environment: e.environment, name: e.workload } : { environment: e.environment },
      ),
    },
  };
}

const MATRIX_DIFF_JOB_NAME_WITH_WORKLOAD = 'Diff (${{ matrix.workloads.environment }}, ${{ matrix.workloads.name }})';
const MATRIX_DIFF_JOB_NAME_ENV_ONLY = 'Diff (${{ matrix.workloads.environment }})';

function diffJob(stages: PipelineStage[], needs?: string[]): Record<string, unknown> {
  const isMatrix = stages.length > 1 || (stages[0] && stages[0].workload !== undefined);
  const hasWorkload = stages.some((e) => e.workload !== undefined);
  const matrixJobName = hasWorkload ? MATRIX_DIFF_JOB_NAME_WITH_WORKLOAD : MATRIX_DIFF_JOB_NAME_ENV_ONLY;
  const job: Record<string, unknown> = {
    name: isMatrix ? matrixJobName : 'Diff',
    ...(needs ? { needs } : {}),
    uses: './.github/workflows/action-diff.yml',
  };
  if (isMatrix) {
    job.strategy = matrixBlock(stages);
    job.with = {
      'job-name': matrixJobName,
      'environment': '${{ matrix.workloads.environment }}',
      ...(hasWorkload ? { workload: '${{ matrix.workloads.name }}' } : {}),
    };
  } else {
    job.with = {
      'job-name': 'Diff',
      'environment': stages[0].environment,
    };
  }
  return job;
}

function stageJobId(stage: PipelineStage, index: number): string {
  const base = stage.workload ? `deploy-${stage.environment}-${stage.workload}` : `deploy-${stage.environment}`;
  return `${base}-${index}`.replace(/[^a-zA-Z0-9_-]/g, '-');
}

function stageJobName(stage: PipelineStage): string {
  return stage.workload ? `Deploy ${stage.environment} (${stage.workload})` : `Deploy ${stage.environment}`;
}

function deployJobFor(stage: PipelineStage, needs: string[]): Record<string, unknown> {
  const withInputs: Record<string, unknown> = { environment: stage.environment };
  if (stage.workload) {
    withInputs.workload = stage.workload;
  }
  if (stage.gated) {
    withInputs['gh-environment'] = stage.environment;
  }
  return {
    name: stageJobName(stage),
    needs,
    uses: './.github/workflows/action-deploy.yml',
    with: withInputs,
  };
}

export function addPrMainWorkflow(project: Project, stages: PipelineStage[]): void {
  if (!stages || stages.length === 0) {
    throw new Error('addPrMainWorkflow: stages must contain at least one entry');
  }
  new YamlFile(project, '.github/workflows/pr-main.yml', {
    obj: {
      name: 'PR: Main Branch',
      on: {
        pull_request: { branches: ['main', 'dev'] },
      },
      permissions: PERMISSIONS_PR,
      jobs: {
        build: { name: 'Build', uses: './.github/workflows/action-build.yml' },
        diff: diffJob(stages, ['build']),
      },
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
  let previous = 'build';
  stages.forEach((stage, index) => {
    const jobId = stageJobId(stage, index);
    jobs[jobId] = deployJobFor(stage, [previous]);
    previous = jobId;
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
 * Adds the standard Rocketleap CDK pipeline GitHub Actions workflows to the
 * project. Emits exactly five files:
 *
 *   - `action-build.yml` — reusable build workflow: install, projen drift
 *     check, format/lint/build/test, synth every stage into
 *     `cdk.out/<environment>[/<workload>]`, upload as artifact
 *   - `action-deploy.yml` — reusable deploy workflow: download `cdk.out`,
 *     assume `CdkDeployRole`, `cdk deploy --app cdk.out/<...>` (no re-install,
 *     no re-build). Sets `environment: ${{ inputs.gh-environment }}` so
 *     gated stages honour GitHub Environment protection rules.
 *   - `action-diff.yml` — reusable diff workflow: download `cdk.out`, run
 *     `corymhall/cdk-diff-action@v2` with `noSynth: true` against the
 *     pre-synthed cloud assembly
 *   - `pr-main.yml` — build + diff on PRs against `main` / `dev`
 *   - `push-main.yml` — build once on push to `main` / `dev`, then deploy
 *     stages sequentially in the configured order; stages with `gated: true`
 *     carry `gh-environment: <environment>` so their deploy waits on the
 *     GitHub Environment approval configured in the repo settings.
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
