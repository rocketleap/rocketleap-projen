import { Project, YamlFile } from 'projen';

/**
 * A stage in the ordered pipeline.
 *
 * `environment` is used both as the CDK app file segment for
 * `yarn synth` (looks at `bin/<environment>.ts` or
 * `bin/<environment>/<workload>.ts`) and as the GitHub Environment
 * name applied to the deploy job. Gating for a stage is configured
 * entirely via required reviewers on the matching GitHub Environment
 * in the repo settings.
 *
 * `workload` is only used by multi-app projects. `promotion` places the
 * stage behind the promotion pull request under `PromotionStrategy.PR`.
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
   * Deploy this stage only after the promotion pull request onto
   * `production` is merged.
   *
   * Under `PromotionStrategy.PR`, the default, pull requests into `main` or
   * `dev` diff every stage. Stages without it deploy from `main` and `dev`
   * and stages with it deploy from `production`, each set in its listed
   * order. At least one stage must set it. Rejected under
   * `PromotionStrategy.DIRECT`.
   *
   * @default false
   */
  readonly promotion?: boolean;
}

/**
 * An extra GitHub Actions job run as a gate alongside `build` in both
 * `pr-main.yml` and `push-main.yml`.
 *
 * Nothing referenced here is generated. `uses` is passed through verbatim
 * and covers both of the things GitHub can run:
 *
 * - a **reusable workflow** — in this repo, in another repository, or
 *   internally published — called as a job-level `uses`. This is the
 *   default shape.
 * - a **GitHub Action**, marketplace or private, by also setting
 *   `runsOn`. GitHub only accepts an action at step level, so the
 *   check becomes a generated job that runs it as its step.
 *
 * Either way `with` is forwarded as given, so inputs reach the
 * called workflow or the action without this interface knowing them.
 *
 * This is the supported hook for checks the TypeScript `build` job cannot
 * run, such as the Python unit tests of governance-cdk's custom AWS Config
 * rules. `synth` depends on every check, so a failing check blocks the PR
 * diff and, on push, every deploy behind it.
 */
export interface PipelineCheck {
  /**
   * GitHub Actions job id.
   *
   * This is the name branch protection matches on, so changing it on an
   * existing repo means updating the required checks too.
   *
   * @example 'build-python'
   */
  readonly id: string;
  /**
   * Display name of the job.
   *
   * @example 'Build Python'
   */
  readonly name: string;
  /**
   * What to run, emitted as given.
   *
   * A reusable workflow in this repo is a `./.github/workflows/` path;
   * one published elsewhere is `owner/repo/.github/workflows/file.yml@ref`.
   * An action is `owner/repo@ref`, and needs `runsOn` set.
   *
   * @example './.github/workflows/action-build-python.yml'
   */
  readonly uses: string;
  /**
   * Runner labels for the generated job, which turns this check into a
   * GitHub Action run as a step rather than a reusable workflow call.
   *
   * Set it for any action — marketplace or private — because GitHub
   * accepts an action only at step level. A single label is emitted as a
   * scalar, several as the list form for self-hosted runner labels.
   *
   * @default - unset; `uses` is called as a reusable workflow
   * @example ['ubuntu-latest']
   */
  readonly runsOn?: string[];
  /**
   * Check the repository out before running the action.
   *
   * Most actions inspect the working tree and need this; set it to `false`
   * for one that does not. Ignored by a reusable workflow call, which
   * owns its own steps.
   *
   * @default true
   */
  readonly checkout?: boolean;
  /**
   * Inputs forwarded as the `with` block of the called workflow, or of
   * the action's step.
   *
   * @default - no inputs
   */
  readonly with?: { [input: string]: string };
}

/**
 * How a change reaches production.
 */
export enum PromotionStrategy {
  /**
   * One branch pair carries every stage. `pr-main.yml` diffs all stages and
   * `push-main.yml` deploys all of them, pre-prod through prod, behind the
   * required reviewers configured on each stage's GitHub Environment.
   *
   * Fewest moving parts and the fastest path to prod. Nothing durable holds
   * the production diff, so the only record of what was approved is the
   * Environment approval on the deploy job.
   *
   * GitHub enforces required reviewers on Environments only on private
   * repositories under GitHub Enterprise. On Free and Team plans the gate job
   * records no approval and production deploys unreviewed.
   */
  DIRECT = 'direct',
  /**
   * Two branch pairs with a promotion pull request between them.
   * Pull requests into `main` or `dev` diff every stage, promoted ones
   * included. Stages without `promotion` deploy from pushes to `main` or
   * `dev`, each of which opens a promotion PR onto `production`; merging it
   * deploys the stages marked `promotion: true`. The branches are fixed.
   *
   * The promotion PR is the audit artefact: the production `cdk diff` is
   * posted on it, and its review, description and merge are a durable record
   * of who approved which production change. Pick this when a compliance
   * narrative has to point at a reviewed diff.
   *
   * The default.
   */
  PR = 'pr',
}

/**
 * Pipeline workflow configuration for a Rocketleap CDK project.
 *
 * `build` uploads a workspace artifact once, `synth` is a matrix job that
 * fans out over every stage in parallel, and the push workflow deploys
 * stages sequentially with consecutive same-environment stages grouped into
 * a parallel fan-out under one GitHub Environment gate.
 *
 * `promotionStrategy` chooses how many branch pairs that shape is
 * generated for.
 */
export interface PipelineOptions {
  /**
   * Ordered list of stages the pipeline promotes through, pre-prod
   * through prod.
   *
   * Under `PromotionStrategy.PR`, the default, stages without `promotion`
   * deploy from `main` and `dev`, and stages marked `promotion: true` deploy
   * from `production` once the promotion PR is merged, each set in its
   * listed order. At least one stage must be marked. Under
   * `PromotionStrategy.DIRECT` every stage deploys from the single branch
   * pair and none may be marked. At least one entry in both cases.
   */
  readonly stages: PipelineStage[];
  /**
   * Customize the `corymhall/cdk-diff-action` step used in the PR diff
   * workflow.
   *
   * @default - failOnDestructiveChanges: false
   */
  readonly cdkDiff?: CdkDiffOptions;
  /**
   * Extra checks to run next to `build`, gating `synth` and everything
   * downstream of it. Each one is a reusable workflow — in this repo or
   * published elsewhere — or a GitHub Action, and takes inputs
   * generically.
   *
   * Opt-in: a project that declares none gets the unchanged five-job
   * pipeline.
   *
   * @default - none
   */
  readonly additionalChecks?: PipelineCheck[];
  /**
   * How a change reaches production.
   *
   * Leaving this unset selects `PromotionStrategy.PR`, which needs at least
   * one stage marked `promotion: true` and a protected `production` branch
   * to exist.
   * `PromotionStrategy.DIRECT` keeps the single-branch pipeline and is only
   * a real gate on GitHub Enterprise.
   *
   * @default PromotionStrategy.PR
   */
  readonly promotionStrategy?: PromotionStrategy;
}

/**
 * Configuration for the `corymhall/cdk-diff-action@v2` step run inside the
 * generated PR diff workflows.
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
      concurrency: 'deploy-${{inputs.environment}}${{inputs.workload}}',
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

function synthMatrixJob(
  stages: PipelineStage[],
  opts: { failFast: boolean; checks: PipelineCheck[] },
): Record<string, unknown> {
  const stageEntries = stages.map((stage) => {
    const entry: Record<string, string> = { environment: stage.environment };
    if (stage.workload) entry.workload = stage.workload;
    return entry;
  });
  return {
    name: "Synth ${{ matrix.stage.environment }}${{ matrix.stage.workload && format(' ({0})', matrix.stage.workload) || '' }}",
    // Stays a plain string when there are no extra checks, so adding the
    // option doesn't churn the generated YAML of every other repo.
    needs: opts.checks.length === 0 ? 'build' : ['build', ...opts.checks.map((check) => check.id)],
    strategy: { 'fail-fast': opts.failFast, 'matrix': { stage: stageEntries } },
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

/** Turns the opt-in checks into jobs keyed by job id. */
function checkJobs(checks: PipelineCheck[]): Record<string, unknown> {
  const jobs: Record<string, unknown> = {};
  for (const check of checks) {
    jobs[check.id] = check.runsOn ? actionCheckJob(check, check.runsOn) : workflowCheckJob(check);
  }
  return jobs;
}

/** A check calling a reusable workflow: job-level `uses`. */
function workflowCheckJob(check: PipelineCheck): Record<string, unknown> {
  const job: Record<string, unknown> = { name: check.name, uses: check.uses };
  if (check.with) job.with = check.with;
  return job;
}

/** A check running a GitHub Action: generated job body with the action as its step. */
function actionCheckJob(check: PipelineCheck, runsOn: string[]): Record<string, unknown> {
  const step: Record<string, unknown> = { name: check.name, uses: check.uses };
  if (check.with) step.with = check.with;
  return {
    'name': check.name,
    'runs-on': runsOn.length === 1 ? runsOn[0] : runsOn,
    'steps': check.checkout === false ? [step] : [checkoutStep(), step],
  };
}

/**
 * One (branch, file name, stages) triple. Both promotion strategies are the
 * same two generators below applied to one or two of these, so the PR shape
 * adds no second code path for anything downstream of `build`.
 */
interface PipelineEntryPoint {
  /** File name and workflow title segment: `pr-<slug>.yml`, `PR: <Slug> Branch`. */
  readonly slug: string;
  /** Branches the generated workflow triggers on. */
  readonly branches: string[];
  /** Stages this entry point synths, diffs and deploys. May be empty for the source branch. */
  readonly stages: PipelineStage[];
  /**
   * Stages the PR workflow synths and diffs.
   *
   * @default - `stages`
   */
  readonly diffStages?: PipelineStage[];
}

function titleCase(slug: string): string {
  return slug.charAt(0).toUpperCase() + slug.slice(1);
}

/**
 * Emits `pr-<slug>.yml`: `build` + checks → `synth` (matrix over every stage) → per-stage `diff`.
 * With no stages it is `build` + checks only.
 */
function addPrWorkflow(project: Project, entry: PipelineEntryPoint, checks: PipelineCheck[]): void {
  const stages = entry.diffStages ?? entry.stages ?? [];
  const jobs: Record<string, unknown> = {
    build: { name: 'Build', uses: './.github/workflows/action-build.yml' },
    ...checkJobs(checks),
  };
  if (stages.length > 0) {
    jobs.synth = synthMatrixJob(stages, { failFast: true, checks });
  }
  stages.forEach((stage, index) => {
    jobs[`diff-${stageSlug(stage)}-${index}`] = diffJobFor(stage, ['synth']);
  });
  new YamlFile(project, `.github/workflows/pr-${entry.slug}.yml`, {
    obj: {
      name: `PR: ${titleCase(entry.slug)} Branch`,
      on: { pull_request: { branches: entry.branches } },
      concurrency: {
        'group': `pr-${entry.slug}-\${{ github.ref }}`,
        'cancel-in-progress': true,
      },
      permissions: PERMISSIONS_PR,
      jobs,
    },
  });
}

/**
 * Emits `pr-main.yml` for the single-branch pipeline: `build` + checks →
 * `synth` (matrix over every stage) → per-stage `diff`. Triggers on pull
 * requests into `main` and `dev`.
 */
export function addPrMainWorkflow(project: Project, stages: PipelineStage[], checks: PipelineCheck[] = []): void {
  if (!stages || stages.length === 0) {
    throw new Error('pr-main.yml: stages must contain at least one entry');
  }
  addPrWorkflow(project, { slug: 'main', branches: ['main', 'dev'], stages }, checks);
}

/**
 * Emits `push-<slug>.yml`: `build` → `synth` (matrix over every stage) → for each
 * consecutive same-`environment` group, one `gate-<env>-<idx>` job that owns
 * the GitHub Environment approval, followed by every deploy in the group
 * running in parallel behind that single gate. Between-env promotion is
 * sequential: the next group's gate waits for the previous group's deploys.
 *
 * `promoteTo` appends a `promote` job that opens the promotion PR once every
 * deploy in the last group has succeeded. With no stages the workflow is
 * `build` + checks, and `promote` waits on those instead.
 */
function addPushWorkflow(
  project: Project,
  entry: PipelineEntryPoint,
  checks: PipelineCheck[],
  promoteTo?: string,
): void {
  const stages = entry.stages ?? [];
  const jobs: Record<string, unknown> = {
    build: { name: 'Build', uses: './.github/workflows/action-build.yml' },
    ...checkJobs(checks),
  };
  if (stages.length > 0) {
    jobs.synth = synthMatrixJob(stages, { failFast: false, checks });
  }

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

  if (promoteTo) {
    jobs.promote = {
      name: `Create ${promoteTo} promotion PR`,
      needs: stages.length > 0 ? currentGroupDeploys : ['build', ...checks.map((check) => check.id)],
      uses: './.github/workflows/action-promote-pr.yml',
      with: {
        'target-branch': promoteTo,
        'source-branch': '${{ github.ref_name }}',
      },
    };
  }

  new YamlFile(project, `.github/workflows/push-${entry.slug}.yml`, {
    obj: {
      name: `Push: ${titleCase(entry.slug)} Branch`,
      on: { push: { branches: entry.branches }, workflow_dispatch: {} },
      permissions: PERMISSIONS_PUSH,
      concurrency: entry.slug,
      jobs,
    },
  });
}

/**
 * Emits `push-main.yml` for the single-branch pipeline: `build` → `synth`
 * (matrix over every stage) → for each consecutive same-`environment` group,
 * one `gate-<env>-<idx>` job that owns the GitHub Environment approval,
 * followed by every deploy in the group running in parallel behind that
 * single gate. Between-env promotion is sequential: the next group's gate
 * waits for the previous group's deploys. Triggers on pushes to `main` and
 * `dev`.
 */
export function addPushMainWorkflow(project: Project, stages: PipelineStage[], checks: PipelineCheck[] = []): void {
  if (!stages || stages.length === 0) {
    throw new Error('push-main.yml: stages must contain at least one entry');
  }
  addPushWorkflow(project, { slug: 'main', branches: ['main', 'dev'], stages }, checks);
}

/**
 * Emits `action-promote-pr.yml`: a reusable workflow that opens a new,
 * timestamped pull request promoting `source-branch` onto `target-branch`.
 *
 * Only generated under `PromotionStrategy.PR`.
 */
export function addActionPromotePrWorkflow(project: Project): void {
  new YamlFile(project, '.github/workflows/action-promote-pr.yml', {
    obj: {
      name: 'Action: Create Promotion PR',
      on: {
        workflow_call: {
          inputs: {
            'target-branch': {
              description: 'Branch the promotion PR targets, and the base it is opened against.',
              required: true,
              type: 'string',
            },
            'source-branch': {
              description: 'Branch whose state is promoted.',
              required: true,
              type: 'string',
            },
          },
          outputs: {
            'pr-number': {
              description: 'Number of the promotion pull request that was opened.',
              value: '${{ jobs.pr.outputs.pr-number }}',
            },
          },
        },
      },
      env: { GITHUB_TOKEN: '${{ secrets.GITHUB_TOKEN }}' },
      permissions: {
        'pull-requests': 'write',
        'contents': 'write',
      },
      jobs: {
        pr: {
          'outputs': { 'pr-number': '${{ steps.cpr.outputs.pull-request-number }}' },
          'runs-on': 'ubuntu-latest',
          'steps': [
            {
              // fetch-depth: 0 — the promotion branch is reset onto another
              // branch's tip and then pushed. From a shallow clone that push
              // fails with "shallow update not allowed".
              name: 'Checkout',
              uses: 'actions/checkout@v6',
              with: {
                'ref': '${{ inputs.target-branch }}',
                'fetch-depth': 0,
              },
            },
            {
              name: 'Reset onto the promoted branch',
              run: [
                'git fetch origin ${{ inputs.source-branch }}',
                'git reset --hard origin/${{ inputs.source-branch }}',
              ].join('\n'),
            },
            {
              name: 'Describe promotion',
              id: 'describe',
              run: [
                'git fetch origin ${{ inputs.target-branch }}',
                'sha=$(git rev-parse origin/${{ inputs.source-branch }})',
                "log=$(git log --no-merges --format='- %h %s (%an)' origin/${{ inputs.target-branch }}..origin/${{ inputs.source-branch }})",
                'if [ -z "$log" ]; then log=\'- No new commits; the branches are identical.\'; fi',
                'echo "sha=$sha" >> "$GITHUB_OUTPUT"',
                'echo "short=${sha:0:7}" >> "$GITHUB_OUTPUT"',
                'delim=$(openssl rand -hex 8)',
                'echo "log<<$delim" >> "$GITHUB_OUTPUT"',
                'echo "$log" >> "$GITHUB_OUTPUT"',
                'echo "$delim" >> "$GITHUB_OUTPUT"',
              ].join('\n'),
            },
            {
              // Timestamped branch per promotion, so each promotion is its own PR and they are merged in order.
              name: 'Create promotion PR',
              id: 'cpr',
              uses: 'peter-evans/create-pull-request@v8',
              with: {
                'title':
                  'Promote ${{ inputs.source-branch }} to ${{ inputs.target-branch }} (${{ steps.describe.outputs.short }})',
                'base': '${{ inputs.target-branch }}',
                'branch': 'promote-${{ inputs.source-branch }}-to-${{ inputs.target-branch }}',
                'branch-suffix': 'timestamp',
                'body': [
                  'Promotes `${{ inputs.source-branch }}` at ${{ steps.describe.outputs.sha }} onto `${{ inputs.target-branch }}`.',
                  '',
                  '## Commits',
                  '',
                  '${{ steps.describe.outputs.log }}',
                  '',
                  'Merging this deploys the stages marked promotion: true from `${{ inputs.target-branch }}`. The production `cdk diff` is posted on this PR by `pr-${{ inputs.target-branch }}.yml`.',
                ].join('\n'),
                'labels': 'promotion-pr',
              },
            },
          ],
        },
      },
    },
  });
}

/**
 * Error raised when `PromotionStrategy.PR`, the default, is selected without
 * any stage marked `promotion: true`. Explains how to migrate a
 * single-branch pipeline.
 */
export const PROMOTION_REQUIRED_MESSAGE = [
  'At least one pipeline stage must set promotion: true.',
  'rocketleap-projen defaults to PromotionStrategy.PR: stages without promotion deploy from main (pushes to dev run the same workflows), then a promotion pull request onto production carries the production cdk diff, and merging it deploys the stages marked promotion: true.',
  "To migrate, add promotion: true to every production stage, for example { environment: 'prodeu', promotion: true }.",
  'Repos with a single stage, or that want the single-branch pipeline, set promotionStrategy: PromotionStrategy.DIRECT. Its GitHub Environment gates only block on GitHub Enterprise.',
].join('\n');

/**
 * Adds the Rocketleap CDK pipeline GitHub Actions workflows.
 *
 * Under `PromotionStrategy.PR`, the default, that is nine files: the four
 * reusable `action-build.yml`, `action-synth.yml`, `action-deploy.yml` and
 * `action-diff.yml` workflows, `action-promote-pr.yml`, `pr-main.yml` and
 * `push-main.yml` triggered by `main` and `dev`, and `pr-production.yml` and
 * `push-production.yml` triggered by `production`. Stages without
 * `promotion` deploy from `main` and `dev`, stages marked `promotion: true`
 * from `production`.
 *
 * Under `PromotionStrategy.DIRECT` it is six: the same four reusable
 * `action-*` workflows, `pr-main.yml` and `push-main.yml`, and no stage may
 * set `promotion`.
 *
 * `options.additionalChecks` wires extra reusable workflows, local or
 * published elsewhere, and GitHub Actions into every generated entry point
 * as gates on `synth`. Nothing they reference is generated here.
 */
export function addCdkPipelineWorkflows(project: Project, options: PipelineOptions): void {
  const strategy = options.promotionStrategy ?? PromotionStrategy.PR;
  if (strategy === PromotionStrategy.DIRECT) {
    addDirectPipelineWorkflows(project, options);
  } else {
    addPrPipelineWorkflows(project, options);
  }
}

/**
 * Emits the shared reusable `action-*.yml` workflows every strategy builds on.
 */
function addActionWorkflows(project: Project, options: PipelineOptions): void {
  addActionBuildWorkflow(project);
  addActionSynthWorkflow(project);
  addActionDeployWorkflow(project);
  addActionDiffWorkflow(project, options.cdkDiff);
}

/**
 * `PromotionStrategy.DIRECT`: one branch pair (`main` and `dev`) carries every stage.
 * Emits six files: the four actions plus `pr-main.yml` and `push-main.yml`.
 * Rejects stages marked `promotion: true`.
 */
function addDirectPipelineWorkflows(project: Project, options: PipelineOptions): void {
  if (!options.stages || options.stages.length === 0) {
    throw new Error('pipeline.stages must contain at least one entry');
  }
  if (options.stages.some((stage) => stage.promotion)) {
    throw new Error(
      'pipeline.stages[].promotion only applies to PromotionStrategy.PR; drop promotion: true or drop promotionStrategy: PromotionStrategy.DIRECT',
    );
  }
  const checks = options.additionalChecks ?? [];

  addActionWorkflows(project, options);
  addPrMainWorkflow(project, options.stages, checks);
  addPushMainWorkflow(project, options.stages, checks);
}

/**
 * `PromotionStrategy.PR`: pull requests into `main` or `dev` diff every stage.
 * Pushes to `main` or `dev` deploy only the stages without `promotion` and open
 * a promotion pull request onto `production`, which deploys the stages marked
 * `promotion: true`. Each set keeps its listed order.
 * Emits nine files: the four actions, `action-promote-pr.yml`, and a pr/push pair per entry point.
 */
function addPrPipelineWorkflows(project: Project, options: PipelineOptions): void {
  if (!options.stages || options.stages.length === 0) {
    throw new Error('pipeline.stages must contain at least one entry');
  }
  const promoted = options.stages.filter((stage) => stage.promotion);
  const unpromoted = options.stages.filter((stage) => !stage.promotion);
  if (promoted.length === 0) {
    throw new Error(PROMOTION_REQUIRED_MESSAGE);
  }
  const checks = options.additionalChecks ?? [];

  addActionWorkflows(project, options);
  addActionPromotePrWorkflow(project);

  const source: PipelineEntryPoint = {
    slug: 'main',
    branches: ['main', 'dev'],
    stages: unpromoted,
    diffStages: options.stages,
  };
  const target: PipelineEntryPoint = { slug: 'production', branches: ['production'], stages: promoted };
  addPrWorkflow(project, source, checks);
  addPushWorkflow(project, source, checks, 'production');
  addPrWorkflow(project, target, checks);
  addPushWorkflow(project, target, checks);
}
