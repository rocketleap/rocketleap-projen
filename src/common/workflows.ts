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
  /**
   * AWS account this stage deploys into. Used to assume `CdkDeployRole`
   * before `yarn synth` so context lookups (AMI, hosted zone, availability
   * zones) succeed in CI. Must match `stackProps.env.account` in
   * `bin/<environment>[/<workload>].ts`.
   */
  readonly account: string;
  /**
   * AWS region this stage deploys into. Used with `account` for the
   * pre-synth role assumption. Must match `stackProps.env.region`.
   */
  readonly region: string;
}

/**
 * Pipeline workflow configuration for a Rocketleap CDK project.
 *
 * Emits a single `main` → prod pipeline: `build` uploads a workspace
 * tarball (including `node_modules`) once, then per-stage diff/deploy
 * jobs unpack that tarball, assume `CdkDeployRole` in the stage's
 * account, and `yarn synth` inside the target account. `push-main.yml`
 * deploys stages sequentially with consecutive same-environment stages
 * grouped into a parallel fan-out under one GitHub Environment gate.
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

function unpackWorkspaceSteps(): Array<Record<string, unknown>> {
  return [
    {
      name: 'Download build workspace',
      uses: 'actions/download-artifact@v4',
      with: { name: WORKSPACE_ARTIFACT, path: '.' },
    },
    {
      name: 'Unpack build workspace',
      shell: 'bash',
      run: ['set -euo pipefail', 'tar -xzf build-workspace.tar.gz', 'rm build-workspace.tar.gz'].join('\n'),
    },
    ...bootstrapSteps(),
  ];
}

function configureAwsStep(): Record<string, unknown> {
  return {
    name: 'Configure AWS credentials',
    uses: 'aws-actions/configure-aws-credentials@v4',
    with: {
      'role-to-assume': 'arn:aws:iam::${{ inputs.account }}:role/CdkDeployRole',
      'aws-region': '${{ inputs.region }}',
    },
  };
}

function stageSlug(stage: { environment: string; workload?: string }): string {
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
              // Tar the workspace ourselves (including node_modules) so
              // native binary execute bits are preserved — actions/upload-artifact's
              // zip strips them, forcing every downstream job to reinstall.
              // Downstream jobs untar and skip `yarn install` entirely.
              name: 'Pack build workspace',
              shell: 'bash',
              run: [
                'set -euo pipefail',
                'tar --exclude=./.git --exclude=./cdk.out --exclude=./build-workspace.tar.gz -czf build-workspace.tar.gz .',
              ].join('\n'),
            },
            {
              name: 'Upload build workspace',
              uses: 'actions/upload-artifact@v4',
              with: {
                'name': WORKSPACE_ARTIFACT,
                'path': 'build-workspace.tar.gz',
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
 * Emits `action-deploy.yml`: unpack workspace → assume `CdkDeployRole`
 * (using `account`/`region` inputs) → `yarn synth` → `yarn deploy:ci`.
 *
 * Synth runs *after* AWS credentials are configured so CDK context
 * providers (AMI lookup, hosted zone, availability zones) succeed.
 */
export function addActionDeployWorkflow(project: Project): void {
  new YamlFile(project, '.github/workflows/action-deploy.yml', {
    obj: {
      name: 'Action: Deploy Environment',
      on: {
        workflow_call: {
          inputs: {
            environment: { type: 'string', required: true },
            workload: { type: 'string', required: false },
            account: { type: 'string', required: true },
            region: { type: 'string', required: true },
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
            ...unpackWorkspaceSteps(),
            { name: 'Set paths', shell: 'bash', run: pathsScript() },
            configureAwsStep(),
            {
              name: 'Synth',
              run: 'yarn synth "${{ inputs.workload && format(\'{0}/{1}\', inputs.environment, inputs.workload) || inputs.environment }}"',
            },
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

/**
 * Emits `action-diff.yml`: unpack workspace → assume `CdkDeployRole`
 * (using `account`/`region` inputs) → `yarn synth` →
 * `corymhall/cdk-diff-action@v2` with `noSynth: true`.
 *
 * Synth runs *after* AWS credentials are configured so CDK context
 * providers succeed.
 */
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
            'account': { type: 'string', required: true },
            'region': { type: 'string', required: true },
          },
        },
      },
      env: { GITHUB_TOKEN: '${{ secrets.GITHUB_TOKEN }}' },
      permissions: PERMISSIONS_PR,
      jobs: {
        diff: {
          'runs-on': 'ubuntu-latest',
          'steps': [
            ...unpackWorkspaceSteps(),
            { name: 'Set paths', shell: 'bash', run: pathsScript() },
            configureAwsStep(),
            {
              name: 'Synth',
              run: 'yarn synth "${{ inputs.workload && format(\'{0}/{1}\', inputs.environment, inputs.workload) || inputs.environment }}"',
            },
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

function deployJobFor(stage: PipelineStage, needs: string[]): Record<string, unknown> {
  const withInputs: Record<string, unknown> = {
    environment: stage.environment,
    account: stage.account,
    region: stage.region,
  };
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
  const withInputs: Record<string, unknown> = {
    'job-name': jobName,
    'environment': stage.environment,
    'account': stage.account,
    'region': stage.region,
  };
  if (stage.workload) withInputs.workload = stage.workload;
  return { name: jobName, needs, uses: './.github/workflows/action-diff.yml', with: withInputs };
}

/** Emits `pr-main.yml`: `build` → per-stage `diff` (each diff synths with its own AWS creds). */
export function addPrMainWorkflow(project: Project, stages: PipelineStage[]): void {
  if (!stages || stages.length === 0) {
    throw new Error('addPrMainWorkflow: stages must contain at least one entry');
  }
  const jobs: Record<string, unknown> = {
    build: { name: 'Build', uses: './.github/workflows/action-build.yml' },
  };
  stages.forEach((stage, index) => {
    jobs[`diff-${stageSlug(stage)}-${index}`] = diffJobFor(stage, ['build']);
  });
  new YamlFile(project, '.github/workflows/pr-main.yml', {
    obj: {
      name: 'PR: Main Branch',
      on: { pull_request: { branches: ['main', 'dev'] } },
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
 * Emits `push-main.yml`: `build` → for each consecutive same-`environment`
 * group, one `gate-<env>-<idx>` job that owns the GitHub Environment
 * approval, followed by every deploy in the group running in parallel
 * behind that single gate. Between-env promotion is sequential: the next
 * group's gate waits for the previous group's deploys. Each deploy job
 * synths inside the target account (see `action-deploy.yml`).
 */
export function addPushMainWorkflow(project: Project, stages: PipelineStage[]): void {
  if (!stages || stages.length === 0) {
    throw new Error('addPushMainWorkflow: stages must contain at least one entry');
  }
  const jobs: Record<string, unknown> = {
    build: { name: 'Build', uses: './.github/workflows/action-build.yml' },
  };

  // Group consecutive stages by environment. Each group gets ONE gate
  // job that carries `environment: <env>` (so GH Environment protection
  // asks for a single approval per env group), and the group's deploy
  // jobs run in parallel behind that gate.
  //
  // - First group's gate needs `build`.
  // - Subsequent groups' gates need every deploy id from the previous group.
  // - Deploy jobs never carry `environment:` themselves — the gate owns it.
  let previousGroupDeploys: string[] = ['build'];
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
 * Adds the five-file Rocketleap CDK pipeline: `action-build.yml`,
 * `action-deploy.yml`, `action-diff.yml`, `pr-main.yml`, `push-main.yml`.
 *
 * Synth runs inside each diff/deploy job after `CdkDeployRole` is assumed,
 * so CDK context lookups (AMI, hosted zone, availability zones) succeed.
 */
export function addCdkPipelineWorkflows(project: Project, options: PipelineOptions): void {
  if (!options.stages || options.stages.length === 0) {
    throw new Error('pipeline.stages must contain at least one entry');
  }
  addActionBuildWorkflow(project);
  addActionDeployWorkflow(project);
  addActionDiffWorkflow(project, options.cdkDiff);
  addPrMainWorkflow(project, options.stages);
  addPushMainWorkflow(project, options.stages);
}
