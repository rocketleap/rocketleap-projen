import { Project, YamlFile } from 'projen';

/**
 * A stage in the ordered `main` → prod pipeline.
 *
 * `environment` is used both as the CDK app file segment for
 * `yarn synth` (looks at `bin/<environment>.ts` or
 * `bin/<environment>/<workload>.ts`) and as the GitHub Environment
 * name applied to the deploy job. Gating for a stage is configured
 * entirely via required reviewers on the matching GitHub Environment
 * in the repo settings.
 *
 * `workload` is only used by multi-app projects.
 */
export interface PipelineStage {
  /**
   * The CDK app file segment AND the GitHub Environment name.
   */
  readonly environment: string;
  /**
   * Optional workload name for multi-app projects.
   */
  readonly workload?: string;
}

/**
 * Pipeline workflow configuration for a Rocketleap CDK project.
 *
 * Emits a single `main` → prod pipeline: `build` uploads a workspace
 * artifact once, `synth` is a matrix job that fans out over every
 * stage in parallel, and `push-main.yml` deploys stages sequentially
 * with consecutive same-environment stages grouped into a parallel
 * fan-out under one GitHub Environment gate.
 */
export interface PipelineOptions {
  /**
   * Ordered list of stages the `main` → prod pipeline promotes through.
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

const WORKSPACE_ARTIFACT = 'build-workspace';

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
    'set -euo pipefail',
    'manifest="${{env.cdk_out_dir}}/manifest.json"',
    'if [ ! -f "$manifest" ]; then',
    '  echo "::error::$manifest not found — the cdk.out artifact for this stage was not downloaded."',
    '  exit 1',
    'fi',
    'env_uri=$(jq -r \'.artifacts | to_entries | map(select(.value.type == "aws:cloudformation:stack")) | .[0].value.environment // ""\' "$manifest")',
    'if [ -z "$env_uri" ] || [ "$env_uri" = "null" ]; then',
    '  echo "::error::No aws:cloudformation:stack artifact found in $manifest — nothing to deploy."',
    '  exit 1',
    'fi',
    'if [[ ! "$env_uri" =~ ^aws://[0-9]+/[a-z0-9-]+$ ]]; then',
    '  echo "::error::Malformed CDK environment URI in $manifest: $env_uri (expected aws://ACCOUNT/REGION)."',
    '  exit 1',
    'fi',
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

function stageSlug(stage: PipelineStage): string {
  const base = stage.workload ? `${stage.environment}-${stage.workload}` : stage.environment;
  return base.replace(/[^a-zA-Z0-9_-]/g, '-');
}

/** Emits `action-build.yml`: install → drift check → format/lint/tsc/test → upload `build-workspace`. */
export function addActionBuildWorkflow(project: Project): void {
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
      env: { GITHUB_TOKEN: '${{ secrets.GITHUB_TOKEN }}' },
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
              // Exclude `node_modules` — actions/upload-artifact packs into
              // a zip that loses the execute bit on native binaries (esbuild,
              // swc, ...). The synth job reinstalls via the yarn cache
              // instead, which is fast and preserves permissions correctly.
              name: 'Upload build workspace',
              uses: 'actions/upload-artifact@v4',
              with: {
                'name': WORKSPACE_ARTIFACT,
                'path': ['.', '!.git', '!cdk.out', '!node_modules'].join('\n'),
                'include-hidden-files': 'true',
                'retention-days': 1,
                'if-no-files-found': 'error',
              },
            },
          ],
        },
      },
    },
  });
}

/**
 * Emits `action-synth.yml` — single-stage reusable, mirrors action-diff.yml's shape.
 *
 * Downloads the `build-workspace` artifact, reinstalls dependencies via
 * the yarn cache (permissions on native binaries are only preserved when
 * yarn unpacks, not when actions/upload-artifact does), runs
 * `yarn synth <env>[/<workload>]`, and uploads the cloud assembly as
 * `cdk-out-<env>[-<workload>]`.
 */
export function addActionSynthWorkflow(project: Project): void {
  new YamlFile(project, '.github/workflows/action-synth.yml', {
    obj: {
      name: 'Action: Synth Environment',
      on: {
        workflow_call: {
          inputs: {
            environment: { type: 'string', required: true },
            workload: { type: 'string', required: false },
          },
        },
      },
      env: { GITHUB_TOKEN: '${{ secrets.GITHUB_TOKEN }}' },
      permissions: PERMISSIONS_DEFAULT,
      jobs: {
        synth: {
          'runs-on': 'ubuntu-latest',
          'steps': [
            {
              name: 'Download build workspace',
              uses: 'actions/download-artifact@v4',
              with: { name: WORKSPACE_ARTIFACT, path: '.' },
            },
            ...bootstrapSteps(),
            { run: 'yarn' },
            { name: 'Set paths', shell: 'bash', run: pathsScript() },
            {
              name: 'Synth',
              run: 'yarn synth "${{ inputs.workload && format(\'{0}/{1}\', inputs.environment, inputs.workload) || inputs.environment }}"',
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

/** Emits `action-deploy.yml`: install → download stage cdk.out → `yarn run deploy:ci "<cdk_out_dir>"`. */
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
      env: { GITHUB_TOKEN: '${{ secrets.GITHUB_TOKEN }}' },
      concurrency: '${{inputs.environment}}${{inputs.workload}}',
      permissions: { ...PERMISSIONS_DEFAULT, 'id-token': 'write' },
      jobs: {
        deploy: {
          'runs-on': 'ubuntu-latest',
          'steps': [
            checkoutStep(),
            ...bootstrapSteps(),
            { run: 'yarn' },
            { name: 'Set paths', shell: 'bash', run: pathsScript() },
            {
              name: 'Download cdk.out',
              uses: 'actions/download-artifact@v4',
              with: { name: '${{ env.artifact_name }}', path: '${{ env.cdk_out_dir }}' },
            },
            { name: 'Set AWS AccountId and Region', shell: 'bash', run: accountAndRegionFromManifestScript() },
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

/** Emits `action-diff.yml`: download stage cdk.out → `corymhall/cdk-diff-action@v2` with `noSynth: true`. */
export function addActionDiffWorkflow(project: Project, options?: CdkDiffOptions): void {
  const failOnDestructiveChanges = options?.failOnDestructiveChanges ?? false;
  new YamlFile(project, '.github/workflows/action-diff.yml', {
    obj: {
      name: 'Action: Diff environment',
      on: {
        workflow_call: {
          inputs: {
            'job-name': { type: 'string', required: true },
            'environment': { type: 'string', required: true },
            'workload': { type: 'string', required: false },
          },
        },
      },
      env: { GITHUB_TOKEN: '${{ secrets.GITHUB_TOKEN }}' },
      permissions: PERMISSIONS_PR,
      jobs: {
        diff: {
          'runs-on': 'ubuntu-latest',
          'steps': [
            { name: 'Set paths', shell: 'bash', run: pathsScript() },
            {
              name: 'Download cdk.out',
              uses: 'actions/download-artifact@v4',
              with: { name: '${{ env.artifact_name }}', path: '${{ env.cdk_out_dir }}' },
            },
            { name: 'Set AWS AccountId and Region', shell: 'bash', run: accountAndRegionFromManifestScript() },
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

function synthMatrixJob(stages: PipelineStage[]): Record<string, unknown> {
  const stageEntries = stages.map((stage) => {
    const entry: Record<string, string> = { environment: stage.environment };
    if (stage.workload) entry.workload = stage.workload;
    return entry;
  });
  return {
    name: "Synth ${{ matrix.stage.environment }}${{ matrix.stage.workload && format(' ({0})', matrix.stage.workload) || '' }}",
    needs: 'build',
    strategy: { 'fail-fast': false, 'matrix': { stage: stageEntries } },
    uses: './.github/workflows/action-synth.yml',
    with: {
      environment: '${{ matrix.stage.environment }}',
      workload: '${{ matrix.stage.workload }}',
    },
  };
}

function deployJobFor(stage: PipelineStage, needs: string[]): Record<string, unknown> {
  const withInputs: Record<string, unknown> = { environment: stage.environment };
  if (stage.workload) withInputs.workload = stage.workload;
  return {
    name: stage.workload ? `Deploy ${stage.environment} (${stage.workload})` : `Deploy ${stage.environment}`,
    needs,
    uses: './.github/workflows/action-deploy.yml',
    with: withInputs,
  };
}

function diffJobFor(stage: PipelineStage, needs: string[]): Record<string, unknown> {
  const jobName = stage.workload ? `Diff ${stage.environment} (${stage.workload})` : `Diff ${stage.environment}`;
  const withInputs: Record<string, unknown> = { 'job-name': jobName, 'environment': stage.environment };
  if (stage.workload) withInputs.workload = stage.workload;
  return { name: jobName, needs, uses: './.github/workflows/action-diff.yml', with: withInputs };
}

/** Emits `pr-main.yml`: `build` → `synth` (matrix over every stage) → per-stage `diff`. */
export function addPrMainWorkflow(project: Project, stages: PipelineStage[]): void {
  if (!stages || stages.length === 0) {
    throw new Error('addPrMainWorkflow: stages must contain at least one entry');
  }
  const jobs: Record<string, unknown> = {
    build: {
      name: 'Build',
      if: 'github.event.pull_request.draft == false',
      uses: './.github/workflows/action-build.yml',
    },
    synth: synthMatrixJob(stages),
  };
  stages.forEach((stage, index) => {
    jobs[`diff-${stageSlug(stage)}-${index}`] = diffJobFor(stage, ['synth']);
  });
  new YamlFile(project, '.github/workflows/pr-main.yml', {
    obj: {
      name: 'PR: Main Branch',
      on: {
        pull_request: {
          branches: ['main', 'dev'],
          types: ['opened', 'synchronize', 'reopened', 'ready_for_review'],
        },
      },
      concurrency: {
        'group': 'pr-main-${{ github.ref }}',
        'cancel-in-progress': true,
      },
      permissions: PERMISSIONS_PR,
      jobs,
    },
  });
}

/**
 * Emits `push-main.yml`: `build` → `synth` (matrix over every stage) → for each
 * consecutive same-`environment` group, one `gate-<env>-<idx>` job that owns
 * the GitHub Environment approval, followed by every deploy in the group
 * running in parallel behind that single gate. Between-env promotion is
 * sequential: the next group's gate waits for the previous group's deploys.
 */
export function addPushMainWorkflow(project: Project, stages: PipelineStage[]): void {
  if (!stages || stages.length === 0) {
    throw new Error('addPushMainWorkflow: stages must contain at least one entry');
  }
  const jobs: Record<string, unknown> = {
    build: { name: 'Build', uses: './.github/workflows/action-build.yml' },
    synth: synthMatrixJob(stages),
  };

  // Group consecutive stages by environment. Each group gets ONE gate
  // job that carries `environment: <env>` (so GH Environment protection
  // asks for a single approval per env group), and the group's deploy
  // jobs run in parallel behind that gate.
  //
  // - First group's gate needs `synth`.
  // - Subsequent groups' gates need every deploy id from the previous group.
  // - Deploy jobs never carry `environment:` themselves — the gate owns it.
  let previousGroupDeploys: string[] = ['synth'];
  let currentGroupDeploys: string[] = [];
  let currentEnv: string | null = null;
  let currentGateId: string | null = null;
  stages.forEach((stage, index) => {
    if (currentEnv === null || stage.environment !== currentEnv) {
      // New group starts.
      if (currentEnv !== null) {
        previousGroupDeploys = currentGroupDeploys;
        currentGroupDeploys = [];
      }
      currentEnv = stage.environment;
      currentGateId = `gate-${stageSlug({ environment: stage.environment })}-${index}`;
      jobs[currentGateId] = {
        'name': `Await approval for ${stage.environment}`,
        'needs': previousGroupDeploys,
        'runs-on': 'ubuntu-latest',
        'environment': stage.environment,
        'steps': [{ run: `echo "Approved — starting deploys to ${stage.environment}"` }],
      };
    }
    const deployId = `deploy-${stageSlug(stage)}-${index}`;
    jobs[deployId] = deployJobFor(stage, [currentGateId!]);
    currentGroupDeploys.push(deployId);
  });

  new YamlFile(project, '.github/workflows/push-main.yml', {
    obj: {
      name: 'Push: Main Branch',
      on: { push: { branches: ['main', 'dev'] }, workflow_dispatch: {} },
      permissions: PERMISSIONS_PUSH,
      concurrency: 'main',
      jobs,
    },
  });
}

/**
 * Adds the six-file Rocketleap CDK pipeline: `action-build.yml`,
 * `action-synth.yml`, `action-deploy.yml`, `action-diff.yml`,
 * `pr-main.yml`, `push-main.yml`.
 */
export function addCdkPipelineWorkflows(project: Project, options: PipelineOptions): void {
  if (!options.stages || options.stages.length === 0) {
    throw new Error('pipeline.stages must contain at least one entry');
  }
  addActionBuildWorkflow(project);
  addActionSynthWorkflow(project);
  addActionDeployWorkflow(project);
  addActionDiffWorkflow(project, options.cdkDiff);
  addPrMainWorkflow(project, options.stages);
  addPushMainWorkflow(project, options.stages);
}
