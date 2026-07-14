import { Project, YamlFile } from 'projen';

/**
 * A (environment, workload) pair the pipeline iterates over.
 *
 * `environment` maps to the CDK app file segment used by `yarn diff:ci` /
 * `yarn deploy:ci` (which look at `bin/<environment>.ts` or
 * `bin/<environment>/<workload>.ts`).
 *
 * `workload` is only used by multi-app projects (e.g. platform-cdk).
 */
export interface PipelineMatrixEntry {
  /**
   * The GitHub Actions environment / CDK app file segment.
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
 * A stage in the ordered `main` → prod pipeline emitted by the new
 * `stages` shape of `PipelineOptions`.
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
 * Two shapes are supported so consumers can migrate gradually:
 *
 * 1. **Legacy shape** — set `deployMain` (+ optional `diffMain`,
 *    `deployProduction`, `diffProduction`). Emits the historical set of
 *    workflows including the GitOps `production`-branch flow when
 *    `deployProduction` is set.
 *
 * 2. **Stages shape** — set `stages` to an ordered list of promotion
 *    stages. Emits a single `main` → prod pipeline (no `production`
 *    branch): `build` uploads a workspace artifact once, `synth` is one
 *    matrix job fanning out over every stage in parallel, and
 *    `push-main.yml` deploys stages sequentially with consecutive
 *    same-environment stages grouped into a parallel fan-out under one
 *    GitHub Environment gate.
 *
 * Exactly one of `stages` or `deployMain` must be provided.
 */
export interface PipelineOptions {
  /**
   * Ordered list of stages the `main` → prod pipeline promotes through.
   * When set, the new pipeline shape is emitted and the legacy
   * `deployMain` / `deployProduction` fields are ignored.
   *
   * @default - use the legacy `deployMain` shape
   */
  readonly stages?: PipelineStage[];
  /**
   * Matrix of (environment, workload) pairs deployed by `push-main.yml`
   * on pushes to `main` / `dev`.
   *
   * A single entry without a `workload` collapses to a non-matrix job;
   * otherwise the workflow fans out via a `strategy.matrix` block.
   *
   * Legacy shape. Required unless `stages` is provided.
   */
  readonly deployMain?: PipelineMatrixEntry[];
  /**
   * Matrix of (environment, workload) pairs diffed by `pr-main.yml` on PRs
   * to `main` / `dev`. Defaults to `deployMain` when omitted.
   *
   * Typically set to staging / production-like environments so a PR previews
   * the change that will eventually reach prod, rather than the dev deploy
   * that `push-main` runs.
   *
   * @default - falls back to `deployMain`
   */
  readonly diffMain?: PipelineMatrixEntry[];
  /**
   * Matrix of (environment, workload) pairs deployed by `push-production.yml`
   * on pushes to `production`.
   *
   * Setting this enables the GitOps-style production promotion flow:
   *   - emits `.github/workflows/action-promote-pr.yml`
   *   - extends `push-main.yml` with a `promote` job that opens a PR from
   *     `main` → `production`, and a `production-diff` job that comments
   *     the prod diff on that promote PR
   *   - emits `.github/workflows/push-production.yml` that deploys this
   *     matrix on commits to the `production` branch
   *
   * Omit to skip the production flow entirely (e.g. iam-cdk, root-cdk).
   *
   * @default - production flow disabled
   */
  readonly deployProduction?: PipelineMatrixEntry[];
  /**
   * Matrix of (environment, workload) pairs diffed on the auto-opened
   * main → production promote PR. Defaults to `deployProduction` when
   * omitted. Ignored if `deployProduction` is not set.
   *
   * @default - falls back to `deployProduction`
   */
  readonly diffProduction?: PipelineMatrixEntry[];
  /**
   * Customize the `corymhall/cdk-diff-action` step used in the PR diff
   * workflows.
   *
   * @default - failOnDestructiveChanges: false
   */
  readonly cdkDiff?: CdkDiffOptions;
}

/**
 * Configuration for the `corymhall/cdk-diff-action@v2` step run inside the
 * generated PR diff workflows (`pr-main.yml` / `pr-production.yml`).
 */
export interface CdkDiffOptions {
  /**
   * Fail the diff workflow when destructive changes are detected.
   *
   * Default: `false` — destructive changes are surfaced in the rich PR
   * comment for reviewer attention but don't block the workflow. The
   * reviewer (and, for prod, the GitOps promotion PR) is the gate; CI
   * just shows what would change. Set to `true` to make destructive
   * changes a hard fail on PR CI.
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

function cdkAppFileScript(): string {
  return [
    'if [ "${{inputs.workload}}" == "" ]; then',
    '  echo \'cdk_app_file=bin/${{inputs.environment}}.ts\' >> "$GITHUB_ENV"',
    'else',
    '  echo \'cdk_app_file=bin/${{inputs.environment}}/${{inputs.workload}}.ts\' >> "$GITHUB_ENV"',
    'fi',
  ].join('\n');
}

function accountAndRegionScript(): string {
  return [
    'echo "account_id=$(sed -n \'/stackProps: {/,/},/p\'  ${{env.cdk_app_file}}  | grep -o "account: \'[0-9]*\'" | awk -F"\'" \'{print $2}\')" >> "$GITHUB_ENV"',
    'echo "region=$(sed -n \'/stackProps: {/,/},/p\'  ${{env.cdk_app_file}}  | grep -o "region: \'[a-z0-9-]*\'" | awk -F"\'" \'{print $2}\')" >> "$GITHUB_ENV"',
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

function checkoutStep(extraWith?: Record<string, unknown>): Record<string, unknown> {
  return {
    name: 'Checkout',
    uses: 'actions/checkout@v6',
    with: {
      // Fall back to the workflow ref/repo on push / workflow_dispatch
      // events where `github.event.pull_request` is undefined.
      ref: '${{ github.event.pull_request.head.ref || github.ref }}',
      repository: '${{ github.event.pull_request.head.repo.full_name || github.repository }}',
      ...extraWith,
    },
  };
}

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
          'steps': [
            checkoutStep(),
            ...bootstrapSteps(),
            {
              name: 'Set CDK App File',
              shell: 'bash',
              run: cdkAppFileScript(),
            },
            {
              name: 'Set AWS AccountId and Region',
              shell: 'bash',
              run: accountAndRegionScript(),
            },
            configureAwsStep(),
            { run: 'yarn install' },
            { run: 'yarn build' },
            {
              name: 'Deploy',
              run: 'yarn run deploy:ci ${{env.cdk_app_file}}',
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
            checkoutStep(),
            ...bootstrapSteps(),
            {
              name: 'Set CDK App File',
              shell: 'bash',
              run: cdkAppFileScript(),
            },
            {
              name: 'Set AWS AccountId and Region',
              shell: 'bash',
              run: accountAndRegionScript(),
            },
            configureAwsStep(),
            { run: 'yarn install' },
            { run: 'yarn build' },
            {
              name: 'Synth',
              run: 'yarn synth:ci ${{env.cdk_app_file}}',
            },
            {
              name: 'Diff',
              uses: 'corymhall/cdk-diff-action@v2',
              with: {
                githubToken: '${{ secrets.GITHUB_TOKEN }}',
                title: '${{ inputs.job-name }}',
                failOnDestructiveChanges: String(failOnDestructiveChanges),
              },
            },
          ],
        },
      },
    },
  });
}

export function addActionPromotePrWorkflow(project: Project): void {
  new YamlFile(project, '.github/workflows/action-promote-pr.yml', {
    obj: {
      name: 'Action: Create Promote PR',
      on: {
        workflow_call: {
          inputs: {
            'target-branch': {
              description: 'The target branch that should receive the new version.',
              required: true,
              type: 'string',
            },
            'source-branch': {
              description: 'The source branch that should be promoted.',
              required: true,
              type: 'string',
            },
          },
          outputs: {
            'pr-number': {
              description: 'The output of the Pull Request number created.',
              value: '${{jobs.pr.outputs.pr-number}}',
            },
          },
        },
      },
      env: {
        GITHUB_TOKEN: '${{ secrets.GITHUB_TOKEN }}',
      },
      permissions: {
        'pull-requests': 'write',
        'contents': 'write',
      },
      jobs: {
        pr: {
          'outputs': { 'pr-number': '${{steps.cpr.outputs.pull-request-number}}' },
          'runs-on': 'ubuntu-latest',
          'steps': [
            {
              uses: 'actions/checkout@v6',
              with: { ref: '${{inputs.target-branch}}' },
            },
            {
              name: 'Reset promotion branch',
              run: [
                'git fetch origin ${{inputs.source-branch}}:${{inputs.source-branch}}',
                'git reset --hard ${{inputs.source-branch}}',
              ].join('\n'),
            },
            {
              name: 'Create Pull Request',
              id: 'cpr',
              uses: 'peter-evans/create-pull-request@v8',
              with: {
                'title': 'Production Promotion',
                'branch': '${{inputs.target-branch}}-promotion',
                'branch-suffix': 'timestamp',
                'body': 'This PR is auto-generated to deploy to Production.',
                'labels': 'prod-promote-pr',
              },
            },
          ],
        },
      },
    },
  });
}

function matrixBlock(entries: PipelineMatrixEntry[]): Record<string, unknown> {
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

function diffJob(
  matrix: PipelineMatrixEntry[],
  needs?: string[],
  extraWith?: Record<string, unknown>,
): Record<string, unknown> {
  const isMatrix = matrix.length > 1 || (matrix[0] && matrix[0].workload !== undefined);
  const hasWorkload = matrix.some((e) => e.workload !== undefined);
  const matrixJobName = hasWorkload ? MATRIX_DIFF_JOB_NAME_WITH_WORKLOAD : MATRIX_DIFF_JOB_NAME_ENV_ONLY;
  const job: Record<string, unknown> = {
    name: isMatrix ? matrixJobName : 'Diff',
    ...(needs ? { needs } : {}),
    uses: './.github/workflows/action-diff.yml',
  };
  if (isMatrix) {
    job.strategy = matrixBlock(matrix);
    job.with = {
      'job-name': matrixJobName,
      'environment': '${{ matrix.workloads.environment }}',
      ...(hasWorkload ? { workload: '${{ matrix.workloads.name }}' } : {}),
      ...(extraWith ?? {}),
    };
  } else {
    job.with = {
      'job-name': 'Diff',
      'environment': matrix[0].environment,
      ...(extraWith ?? {}),
    };
  }
  return job;
}

function deployJob(name: string, matrix: PipelineMatrixEntry[], needs?: string[]): Record<string, unknown> {
  const isMatrix = matrix.length > 1 || (matrix[0] && matrix[0].workload !== undefined);
  const hasWorkload = matrix.some((e) => e.workload !== undefined);
  const job: Record<string, unknown> = {
    name,
    ...(needs ? { needs } : {}),
    uses: './.github/workflows/action-deploy.yml',
  };
  if (isMatrix) {
    job.strategy = {
      'fail-fast': false,
      'matrix': {
        workloads: matrix.map((e) =>
          e.workload ? { environment: e.environment, name: e.workload } : { environment: e.environment },
        ),
      },
    };
    job.with = {
      environment: '${{ matrix.workloads.environment }}',
      ...(hasWorkload ? { workload: '${{ matrix.workloads.name }}' } : {}),
    };
  } else {
    job.with = { environment: matrix[0].environment };
  }
  return job;
}

export function addPrMainWorkflow(project: Project, matrix: PipelineMatrixEntry[]): void {
  if (!matrix || matrix.length === 0) {
    throw new Error('addPrMainWorkflow: matrix must contain at least one entry');
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
        diff: diffJob(matrix, ['build']),
      },
    },
  });
}

export function addPushMainWorkflow(
  project: Project,
  deployMatrix: PipelineMatrixEntry[],
  includePromote: boolean = false,
): void {
  if (!deployMatrix || deployMatrix.length === 0) {
    throw new Error('addPushMainWorkflow: deployMatrix must contain at least one entry');
  }
  const jobs: Record<string, unknown> = {
    build: { name: 'Build', uses: './.github/workflows/action-build.yml' },
    deploy: deployJob('Deploy', deployMatrix, ['build']),
  };

  if (includePromote) {
    jobs.promote = {
      name: 'Create Promote PR',
      needs: ['deploy'],
      uses: './.github/workflows/action-promote-pr.yml',
      with: {
        'target-branch': 'production',
        'source-branch': '${{ github.ref_name }}',
      },
    };
  }

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

export function addPrProductionWorkflow(project: Project, matrix: PipelineMatrixEntry[]): void {
  if (!matrix || matrix.length === 0) {
    throw new Error('addPrProductionWorkflow: matrix must contain at least one entry');
  }
  new YamlFile(project, '.github/workflows/pr-production.yml', {
    obj: {
      name: 'PR: Production Branch',
      on: {
        pull_request: { branches: ['production'] },
      },
      permissions: PERMISSIONS_PR,
      jobs: {
        build: { name: 'Build', uses: './.github/workflows/action-build.yml' },
        diff: diffJob(matrix, ['build']),
      },
    },
  });
}

export function addPushProductionWorkflow(project: Project, matrix: PipelineMatrixEntry[]): void {
  if (!matrix || matrix.length === 0) {
    throw new Error('addPushProductionWorkflow: matrix must contain at least one entry');
  }
  new YamlFile(project, '.github/workflows/push-production.yml', {
    obj: {
      name: 'Push: Production Branch',
      on: {
        push: { branches: ['production'] },
        workflow_dispatch: {},
      },
      permissions: PERMISSIONS_PUSH,
      concurrency: 'production',
      jobs: {
        deploy: deployJob('Deploy', matrix),
      },
    },
  });
}

/**
 * Adds the standard Rocketleap CDK pipeline GitHub Actions workflows to the
 * project:
 *
 *   - `action-build.yml`, `action-deploy.yml`, `action-diff.yml` — reusable
 *     building blocks (always emitted, identical across projects)
 *   - `pr-main.yml` — runs build + diff on PRs against `main` / `dev`
 *     using `diffMain` (or `deployMain` as fallback)
 *   - `push-main.yml` — runs build + deploy on pushes to `main` / `dev`
 *     using `deployMain`, plus the `promote` job when `deployProduction`
 *     is set
 *   - `action-promote-pr.yml`, `push-production.yml`, `pr-production.yml` —
 *     only when `deployProduction` is set. `pr-production.yml` runs build +
 *     diff against the auto-opened promote PR so cdk-diff-action can post
 *     rich diff comments on it.
 */
export function addCdkPipelineWorkflows(project: Project, options: PipelineOptions): void {
  const hasStages = options.stages !== undefined;
  const hasLegacy = options.deployMain !== undefined;

  if (hasStages && hasLegacy) {
    throw new Error('pipeline: pass either `stages` (new shape) or `deployMain` (legacy shape), not both');
  }
  if (!hasStages && !hasLegacy) {
    throw new Error('pipeline: one of `stages` or `deployMain` is required');
  }

  if (hasStages) {
    addStagesPipelineWorkflows(project, options.stages!, options.cdkDiff);
    return;
  }

  // Legacy shape below.
  if (!options.deployMain || options.deployMain.length === 0) {
    throw new Error('pipeline.deployMain must contain at least one entry');
  }
  if (options.diffMain && options.diffMain.length === 0) {
    throw new Error('pipeline.diffMain must contain at least one entry when provided');
  }
  if (options.deployProduction && options.deployProduction.length === 0) {
    throw new Error('pipeline.deployProduction must contain at least one entry when provided');
  }
  if (options.diffProduction && options.diffProduction.length === 0) {
    throw new Error('pipeline.diffProduction must contain at least one entry when provided');
  }

  addActionBuildWorkflow(project);
  addActionDeployWorkflow(project);
  addActionDiffWorkflow(project, options.cdkDiff);
  addPrMainWorkflow(project, options.diffMain ?? options.deployMain);
  addPushMainWorkflow(project, options.deployMain, options.deployProduction !== undefined);

  if (options.deployProduction) {
    addActionPromotePrWorkflow(project);
    addPushProductionWorkflow(project, options.deployProduction);
    addPrProductionWorkflow(project, options.diffProduction ?? options.deployProduction);
  }
}

// -----------------------------------------------------------------------------
// Stages shape (new pipeline). Coexists with the legacy shape above; consumers
// opt in by setting `pipeline.stages`. The action-*.yml files below overwrite
// their legacy-shape equivalents when this shape is selected.
// -----------------------------------------------------------------------------

const STAGES_WORKSPACE_ARTIFACT = 'build-workspace';

function stagesPathsScript(): string {
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

function stagesAccountRegionScript(): string {
  return [
    'env_uri=$(jq -r \'.artifacts | to_entries | map(select(.value.type == "aws:cloudformation:stack")) | .[0].value.environment\' "${{env.cdk_out_dir}}/manifest.json")',
    'echo "account_id=$(echo "$env_uri" | awk -F\'/\' \'{print $3}\')" >> "$GITHUB_ENV"',
    'echo "region=$(echo "$env_uri" | awk -F\'/\' \'{print $4}\')" >> "$GITHUB_ENV"',
  ].join('\n');
}

function stagesAwsStep(): Record<string, unknown> {
  return {
    name: 'Configure AWS credentials',
    uses: 'aws-actions/configure-aws-credentials@v4',
    with: {
      'role-to-assume': 'arn:aws:iam::${{env.account_id}}:role/CdkDeployRole',
      'aws-region': '${{ env.region }}',
    },
  };
}

function stageSlug(stage: PipelineStage): string {
  const base = stage.workload ? `${stage.environment}-${stage.workload}` : stage.environment;
  return base.replace(/[^a-zA-Z0-9_-]/g, '-');
}

/** Emits `action-build.yml` for the stages pipeline: install/lint/build/test + upload build-workspace. */
export function addStagesActionBuildWorkflow(project: Project): void {
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
              name: 'Upload build workspace',
              uses: 'actions/upload-artifact@v4',
              with: {
                'name': STAGES_WORKSPACE_ARTIFACT,
                'path': ['.', '!.git', '!cdk.out'].join('\n'),
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

/** Emits `action-synth.yml` — single-stage reusable, mirrors action-diff.yml's shape. */
export function addStagesActionSynthWorkflow(project: Project): void {
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
              with: { name: STAGES_WORKSPACE_ARTIFACT, path: '.' },
            },
            ...bootstrapSteps(),
            { name: 'Set paths', shell: 'bash', run: stagesPathsScript() },
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

/** Emits `action-deploy.yml` for the stages pipeline. Downloads the stage's cdk.out artifact and runs `yarn run deploy:artifact`. */
export function addStagesActionDeployWorkflow(project: Project): void {
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
          'environment': '${{ inputs.environment }}',
          'steps': [
            {
              name: 'Checkout',
              uses: 'actions/checkout@v6',
              with: {
                ref: '${{ github.event.pull_request.head.ref || github.ref }}',
                repository: '${{ github.event.pull_request.head.repo.full_name || github.repository }}',
              },
            },
            ...bootstrapSteps(),
            { run: 'yarn' },
            { name: 'Set paths', shell: 'bash', run: stagesPathsScript() },
            {
              name: 'Download cdk.out',
              uses: 'actions/download-artifact@v4',
              with: { name: '${{ env.artifact_name }}', path: '${{ env.cdk_out_dir }}' },
            },
            { name: 'Set AWS AccountId and Region', shell: 'bash', run: stagesAccountRegionScript() },
            stagesAwsStep(),
            {
              name: 'Deploy',
              run: 'yarn run deploy:artifact "${{env.cdk_out_dir}}"',
            },
          ],
        },
      },
    },
  });
}

/** Emits `action-diff.yml` for the stages pipeline. */
export function addStagesActionDiffWorkflow(project: Project, options?: CdkDiffOptions): void {
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
            { name: 'Set paths', shell: 'bash', run: stagesPathsScript() },
            {
              name: 'Download cdk.out',
              uses: 'actions/download-artifact@v4',
              with: { name: '${{ env.artifact_name }}', path: '${{ env.cdk_out_dir }}' },
            },
            { name: 'Set AWS AccountId and Region', shell: 'bash', run: stagesAccountRegionScript() },
            stagesAwsStep(),
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

function stagesSynthMatrixJob(stages: PipelineStage[]): Record<string, unknown> {
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

function stagesDeployJobFor(stage: PipelineStage, needs: string[]): Record<string, unknown> {
  const withInputs: Record<string, unknown> = { environment: stage.environment };
  if (stage.workload) withInputs.workload = stage.workload;
  return {
    name: stage.workload ? `Deploy ${stage.environment} (${stage.workload})` : `Deploy ${stage.environment}`,
    needs,
    uses: './.github/workflows/action-deploy.yml',
    with: withInputs,
  };
}

function stagesDiffJobFor(stage: PipelineStage, needs: string[]): Record<string, unknown> {
  const jobName = stage.workload ? `Diff ${stage.environment} (${stage.workload})` : `Diff ${stage.environment}`;
  const withInputs: Record<string, unknown> = { 'job-name': jobName, 'environment': stage.environment };
  if (stage.workload) withInputs.workload = stage.workload;
  return { name: jobName, needs, uses: './.github/workflows/action-diff.yml', with: withInputs };
}

/** Emits `pr-main.yml` for the stages pipeline. */
export function addStagesPrMainWorkflow(project: Project, stages: PipelineStage[]): void {
  const jobs: Record<string, unknown> = {
    build: { name: 'Build', uses: './.github/workflows/action-build.yml' },
    synth: stagesSynthMatrixJob(stages),
  };
  stages.forEach((stage, index) => {
    jobs[`diff-${stageSlug(stage)}-${index}`] = stagesDiffJobFor(stage, ['synth']);
  });
  new YamlFile(project, '.github/workflows/pr-main.yml', {
    obj: {
      name: 'PR: Main Branch',
      on: { pull_request: { branches: ['main', 'dev'] } },
      permissions: PERMISSIONS_PR,
      jobs,
    },
  });
}

/** Emits `push-main.yml` for the stages pipeline with same-env grouping. */
export function addStagesPushMainWorkflow(project: Project, stages: PipelineStage[]): void {
  const jobs: Record<string, unknown> = {
    build: { name: 'Build', uses: './.github/workflows/action-build.yml' },
    synth: stagesSynthMatrixJob(stages),
  };

  let previousGroup: string[] = ['synth'];
  let currentGroup: string[] = [];
  let currentEnv: string | null = null;
  stages.forEach((stage, index) => {
    if (currentEnv !== null && stage.environment !== currentEnv) {
      previousGroup = currentGroup;
      currentGroup = [];
    }
    currentEnv = stage.environment;
    const deployId = `deploy-${stageSlug(stage)}-${index}`;
    jobs[deployId] = stagesDeployJobFor(stage, previousGroup);
    currentGroup.push(deployId);
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
 * Emits the full stages-pipeline workflow set. Called by
 * `addCdkPipelineWorkflows` when `options.stages` is provided.
 */
export function addStagesPipelineWorkflows(project: Project, stages: PipelineStage[], cdkDiff?: CdkDiffOptions): void {
  if (!stages || stages.length === 0) {
    throw new Error('pipeline.stages must contain at least one entry');
  }
  addStagesActionBuildWorkflow(project);
  addStagesActionSynthWorkflow(project);
  addStagesActionDeployWorkflow(project);
  addStagesActionDiffWorkflow(project, cdkDiff);
  addStagesPrMainWorkflow(project, stages);
  addStagesPushMainWorkflow(project, stages);
}
