# Changelog

## Unreleased

### New features

#### `pipeline.additionalChecks` — run repo-owned reusable workflows as pipeline gates

The generated `pr-main.yml` and `push-main.yml` only ever contained the jobs
this package emits, so a repo with a test suite the TypeScript `build` job
cannot run had nowhere to put it. governance-cdk hit this: its hand-maintained
workflows called `action-build-python.yml` to run the Python unit tests of the
custom AWS Config rules, and adopting the generated pipeline silently dropped
that call. The reusable workflow stayed in the repo, nothing invoked it, and
regressions in the Python rules reached deploys with no test gate — in our repo
and in every customer fork. See Roadmap#240.

`additionalChecks` is the supported hook. Each entry becomes a job next to
`build`, and `synth` gains a dependency on it, so a failure blocks the PR diff
and every deploy behind it:

```ts
pipeline: {
  stages: [{ environment: 'governance' }],
  additionalChecks: [
    { id: 'build-python', name: 'Build Python', workflow: 'action-build-python.yml' },
  ],
},
```

```yaml
jobs:
  build:
    name: Build
    uses: ./.github/workflows/action-build.yml
  build-python:
    name: Build Python
    uses: ./.github/workflows/action-build-python.yml
  synth:
    needs:
      - build
      - build-python
```

The referenced workflow file is **not** generated — it lives in the consuming
repository and must declare a `workflow_call` trigger with no required inputs.
That keeps repo-specific test tooling in the repo that owns it while the call
into the pipeline survives regeneration.

Opt-in and backwards compatible: a project that declares no checks gets the
byte-identical five-job pipeline it has today, including the plain
`needs: build` scalar. No consumer action needed unless you want the hook.

### Behaviour changes

#### `pass_filenames: false` on all pre-commit hooks

Every hook in the generated `.pre-commit-config.yaml` (CDK + JSII) now sets
`pass_filenames: false`. All hooks (`yarn-clean`, `yarn-package`, `projen`,
`yarn-format`, `yarn-lint`, `yarn-build`, `yarn-test`, `release`) operate on
the whole repo via their `yarn` script and ignore the filename arguments
pre-commit would otherwise pass in.

Without this flag, `pre-commit run --all-files` chunks the file list and
spawns the same whole-repo hook multiple times in parallel — wasted CPU and,
for write-hooks like `format:ci`, racing writers.

Before:

```yaml
- id: yarn-lint
  name: Lint
  entry: sh -c "CI=true yarn lint:ci"
  language: system
```

After:

```yaml
- id: yarn-lint
  name: Lint
  entry: sh -c "CI=true yarn lint:ci"
  language: system
  pass_filenames: false
```

No consumer action needed — `npx projen` regenerates `.pre-commit-config.yaml`.

#### Rich CDK diff comments via `corymhall/cdk-diff-action`

`action-diff.yml` no longer runs `yarn diff:ci` + `Tiryoh/gha-jobid-action`
+ a bash `gh pr comment` step that posted a link into the job log. It now
synthesizes the CDK app (`yarn synth:ci`) and hands the `cdk.out` directory
to [`corymhall/cdk-diff-action@v2`](https://github.com/marketplace/actions/cdk-diff-action),
which posts a rich inline diff as a PR comment per CDK Stage and updates
the same comment on each commit (no comment spam).

Visible consequences for consumers:

- **Destructive changes are surfaced in the PR comment but do not fail the
  diff workflow by default.** rocketleap-projen passes
  `failOnDestructiveChanges: "false"` to the action; reviewers see what
  would be destroyed/replaced in the rich comment and decide. To opt into
  the action's hard-fail behavior, set on `PipelineOptions`:

  ```ts
  pipeline: {
    deployMain: [{ environment: 'iam' }],
    cdkDiff: { failOnDestructiveChanges: true },
  }
  ```
- **`pr-number` input on `action-diff.yml` is removed.** Only consumers that
  call the reusable workflow directly should notice.
- **New `pr-production.yml` workflow** emitted when `pipeline.deployProduction`
  is set. It triggers on PRs to `production` (i.e. the auto-opened promote
  PR) and runs the same `build` + `diff` shape as `pr-main.yml`, using the
  `diffProduction` matrix (or `deployProduction` as fallback). Previously the
  prod diff was a `production-diff` job inside `push-main.yml` that posted
  via the bash flow.
- **`production-diff` job removed from `push-main.yml`.** The promote-PR
  diff comment is now posted by `pr-production.yml` instead.
- **New `synth:ci` script** added to `CDK_SCRIPTS`. Mirrors `diff:ci`; takes
  a positional bin file path and synthesizes into `cdk.out`.

No `PipelineOptions` API changes — same field names and shapes as 1.3.0.

### Breaking changes

#### `pipeline` is now required on `RocketleapPlatformCdkProject` / `RocketleapWorkloadCdkProject`

`rocketleap-projen` now generates the standard CDK pipeline GitHub Actions
workflows (`action-build.yml`, `action-deploy.yml`, `action-diff.yml`,
`pr-main.yml`, `push-main.yml`, and — when GitOps production promotion is
enabled — `action-promote-pr.yml` + `push-production.yml`). To do that it
needs to know which environments and workloads the pipeline targets, so the
new `pipeline` field on `RocketleapCdkProjectOptions` is **required**.

Before:

```ts
const project = new PlatformCdkProject({
  company: 'rocketleap',
  project: 'iam-cdk',
});
```

After (simple, single-environment project — e.g. `iam-cdk`, `root-cdk`):

```ts
const project = new PlatformCdkProject({
  company: 'rocketleap',
  project: 'iam-cdk',
  pipeline: {
    deployMain: [{ environment: 'iam' }],
  },
});
```

After (multi-workload project with separate PR diff target and GitOps
production promotion — e.g. `platform-cdk`):

```ts
const project = new PlatformCdkProject({
  company: 'rocketleap',
  project: 'platform-cdk',
  pipeline: {
    // Deployed by push-main.yml on main / dev.
    deployMain: [
      { environment: 'dev', workload: 'example-ecs' },
      { environment: 'dev', workload: 'example-lambda' },
    ],
    // Diffed by pr-main.yml. Optional — defaults to deployMain.
    diffMain: [
      { environment: 'staging', workload: 'example-ecs' },
      { environment: 'platform', workload: 'management' },
    ],
    // Presence enables the GitOps production flow:
    //   - emits action-promote-pr.yml + push-production.yml
    //   - injects promote + production-diff jobs into push-main.yml
    deployProduction: [
      { environment: 'prodeu', workload: 'example-ecs' },
      { environment: 'produs', workload: 'example-ecs' },
    ],
    // Diffed on the auto-opened main→production promote PR.
    // Optional — defaults to deployProduction.
    // diffProduction: [ ... ],
  },
});
```

After running `yarn projen` the hand-maintained workflow files under
`.github/workflows/` are overwritten by projen-generated equivalents. Delete
the now-redundant copies (`action-*.yml`, `pr-main.yml`, `push-main.yml`,
and the production variants when applicable) so projen owns them going
forward.
