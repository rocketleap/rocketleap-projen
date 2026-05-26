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
 * Configuration for the GitOps-style production promotion flow.
 *
 * When set on `PipelineOptions`:
 *   - emits `.github/workflows/action-promote-pr.yml`
 *   - extends `push-main.yml` with a `promote` job that opens a PR from
 *     `main` → `production` (the GitOps promotion gate)
 *   - emits `.github/workflows/push-production.yml` that deploys
 *     `matrix` on commits to the `production` branch.
 *
 * The model: `main` is the desired-state branch for non-prod, `production`
 * is the desired-state branch for prod, and the auto-opened promotion PR is
 * the human approval point between them.
 */
export interface ProductionPromotionFlowOptions {
  /**
   * Matrix of (environment, workload) pairs deployed by `push-production.yml`.
   */
  readonly matrix: PipelineMatrixEntry[];
}

/**
 * Pipeline workflow configuration for a Rocketleap CDK project.
 */
export interface PipelineOptions {
  /**
   * Matrix of (environment, workload) pairs deployed by `push-main.yml`
   * on pushes to `main` / `dev`.
   *
   * A single entry collapses to a non-matrix job; multiple entries fan out
   * via a GitHub Actions `strategy.matrix` block.
   */
  readonly deployMatrix: PipelineMatrixEntry[];
  /**
   * Matrix of (environment, workload) pairs diffed by `pr-main.yml` on PRs
   * to `main` / `dev`. Defaults to `deployMatrix` when omitted.
   *
   * Typically set to staging / production-like environments so a PR previews
   * the change that will eventually reach prod (rather than the dev deploy
   * the push-main job runs).
   *
   * @default - falls back to `deployMatrix`
   */
  readonly diffMatrix?: PipelineMatrixEntry[];
  /**
   * Enable the GitOps-style production promotion flow. Omit to skip the
   * production flow entirely (e.g. iam-cdk, root-cdk).
   *
   * @default - production flow disabled
   */
  readonly productionPromotionFlow?: ProductionPromotionFlowOptions;
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
      uses: 'actions/setup-node@v4',
      with: {
        'node-version': '18',
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
    uses: 'actions/checkout@v5',
    with: {
      ref: '${{ github.event.pull_request.head.ref }}',
      repository: '${{ github.event.pull_request.head.repo.full_name }}',
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
              uses: 'actions/checkout@v5',
              with: {
                ref: '${{ inputs.ref || github.event.pull_request.head.ref }}',
                repository: '${{ github.event.pull_request.head.repo.full_name }}',
              },
            },
            ...bootstrapSteps(),
            { run: 'yarn' },
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

export function addActionDiffWorkflow(project: Project): void {
  new YamlFile(project, '.github/workflows/action-diff.yml', {
    obj: {
      name: 'Action: Diff environment',
      on: {
        workflow_call: {
          inputs: {
            'job-name': {
              type: 'string',
              required: true,
              description: 'The name of the job given to calling this action. It is required to retrieve the job id.',
            },
            'environment': { type: 'string', required: true },
            'workload': { type: 'string', required: false },
            'pr-number': {
              type: 'string',
              description:
                'The PR number to post the link to for the diff. If not supplied, the pr-number is looked up.',
              required: false,
            },
          },
          outputs: {
            'cache-key': {
              description: 'The output of the CDK diff command in the cache.',
              value: '${{jobs.diff.outputs.cache-key}}',
            },
          },
        },
      },
      env: {
        PR_NUMBER: '${{ github.event.number }}',
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
              name: 'Diff',
              run: 'yarn diff:ci ${{env.cdk_app_file}}',
            },
            {
              name: 'Get Current Job Log URL',
              uses: 'Tiryoh/gha-jobid-action@v1',
              id: 'jobs',
              with: {
                github_token: '${{ secrets.GITHUB_TOKEN }}',
                job_name: '${{ inputs.job-name }} / diff',
                per_page: 100,
              },
            },
            {
              name: 'Set PR Comment',
              shell: 'bash',
              run: [
                'if [ "${{inputs.workload}}" == "" ]; then',
                '  echo \'pr_comment="Link to diff for ${{inputs.environment}} ${{steps.jobs.outputs.html_url}}#step:9:1"\' >> "$GITHUB_ENV"',
                'else',
                '  echo \'pr_comment="Link to diff for ${{inputs.environment}} ${{inputs.workload}} ${{steps.jobs.outputs.html_url}}#step:9:1"\' >> "$GITHUB_ENV"',
                'fi',
              ].join('\n'),
            },
            {
              name: 'Comment to PR',
              shell: 'bash',
              run: [
                'if [ "${{inputs.pr-number}}" == "" ]; then',
                '  gh pr comment $PR_NUMBER -b ${{env.pr_comment}}',
                'else',
                '  gh pr comment ${{ inputs.pr-number }} -b ${{env.pr_comment}}',
                'fi',
              ].join('\n'),
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
              uses: 'actions/checkout@v5',
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
              uses: 'peter-evans/create-pull-request@v5',
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

function callActionWith(extra: Record<string, unknown>): Record<string, unknown> {
  return {
    'job-name': 'Diff (${{matrix.workloads.environment}}, ${{matrix.workloads.name}})',
    'environment': '${{ matrix.workloads.environment }}',
    'workload': '${{ matrix.workloads.name }}',
    ...extra,
  };
}

function diffJob(
  matrix: PipelineMatrixEntry[],
  needs?: string[],
  extraWith?: Record<string, unknown>,
): Record<string, unknown> {
  const isMatrix = matrix.length > 1 || (matrix[0] && matrix[0].workload !== undefined);
  const job: Record<string, unknown> = {
    name: 'Diff',
    ...(needs ? { needs } : {}),
    uses: './.github/workflows/action-diff.yml',
  };
  if (isMatrix) {
    job.strategy = matrixBlock(matrix);
    job.with = callActionWith(extraWith ?? {});
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
      workload: '${{ matrix.workloads.name }}',
    };
  } else {
    job.with = { environment: matrix[0].environment };
  }
  return job;
}

export function addPrMainWorkflow(project: Project, matrix: PipelineMatrixEntry[]): void {
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
  matrix: PipelineMatrixEntry[],
  productionPromotionFlow?: ProductionPromotionFlowOptions,
): void {
  const jobs: Record<string, unknown> = {
    build: { name: 'Build', uses: './.github/workflows/action-build.yml' },
    deploy: deployJob('Deploy', matrix, ['build']),
  };

  if (productionPromotionFlow) {
    jobs.promote = {
      name: 'Create Promote PR',
      needs: ['deploy'],
      uses: './.github/workflows/action-promote-pr.yml',
      with: {
        'target-branch': 'production',
        'source-branch': 'main',
      },
    };
    jobs['production-diff'] = diffJob(productionPromotionFlow.matrix, ['promote'], {
      'pr-number': '${{ needs.promote.outputs.pr-number }}',
    });
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

export function addPushProductionWorkflow(project: Project, matrix: PipelineMatrixEntry[]): void {
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
 *   - `push-main.yml` — runs build + deploy on pushes to `main` / `dev`,
 *     plus the promote job when `productionPromotionFlow` is set
 *   - `action-promote-pr.yml` + `push-production.yml` — only when
 *     `productionPromotionFlow` is set
 */
export function addCdkPipelineWorkflows(project: Project, options: PipelineOptions): void {
  if (!options.deployMatrix || options.deployMatrix.length === 0) {
    throw new Error('pipeline.deployMatrix must contain at least one entry');
  }
  if (options.diffMatrix && options.diffMatrix.length === 0) {
    throw new Error('pipeline.diffMatrix must contain at least one entry when provided');
  }
  if (options.productionPromotionFlow && options.productionPromotionFlow.matrix.length === 0) {
    throw new Error('pipeline.productionPromotionFlow.matrix must contain at least one entry');
  }

  addActionBuildWorkflow(project);
  addActionDeployWorkflow(project);
  addActionDiffWorkflow(project);
  addPrMainWorkflow(project, options.diffMatrix ?? options.deployMatrix);
  addPushMainWorkflow(project, options.deployMatrix, options.productionPromotionFlow);

  if (options.productionPromotionFlow) {
    addActionPromotePrWorkflow(project);
    addPushProductionWorkflow(project, options.productionPromotionFlow.matrix);
  }
}
