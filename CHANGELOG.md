# Changelog

## Unreleased

### Breaking changes

#### `PipelineOptions` collapses to a single ordered `stages` list

The GitOps promote-PR flow (separate `main` and `production` branches, an
auto-opened promote PR, `push-production.yml`, `pr-production.yml`,
`action-promote-pr.yml`) is retired in favour of a single `main` → prod
pipeline where every deploy job sets its GitHub Environment; prod-tier
stages are gated purely by configuring required reviewers on those
Environments in the repo settings. Along with that, the pipeline now
synths each stage in parallel and downstream deploy/diff jobs reuse the
per-stage `cdk.out` artifact instead of re-installing and re-synthesising
in every job.

`PipelineOptions` reshapes from four arrays (`deployMain`, `diffMain`,
`deployProduction`, `diffProduction`) into a single ordered `stages`
list. Every stage's deploy job carries `environment: <environment>` in
the emitted workflow. Whether a stage pauses for approval depends
entirely on the GitHub Environment protection rules configured on that
name — no separate `gated` flag on the stage.

Before:

```ts
pipeline: {
  deployMain: [{ environment: 'dev' }, { environment: 'staging' }],
  diffMain: [{ environment: 'staging' }, { environment: 'platform' }],
  deployProduction: [
    { environment: 'platform' },
    { environment: 'prodeu' },
    { environment: 'produs' },
  ],
}
```

After:

```ts
pipeline: {
  stages: [
    { environment: 'dev' },
    { environment: 'staging' },
    { environment: 'platform' },
    { environment: 'prodeu' },
    { environment: 'produs' },
  ],
}
```

Migration steps for each consumer repo:

1. Rewrite the `pipeline:` block in `.projenrc.ts` per the shape above.
   Order stages from earliest to latest.
2. Run `npx projen`. `.github/workflows/push-production.yml`,
   `pr-production.yml`, and `action-promote-pr.yml` will be removed;
   `action-build.yml`, `action-deploy.yml`, `action-diff.yml`,
   `pr-main.yml`, and `push-main.yml` will be regenerated.
3. In GitHub repo settings → Environments, create an Environment for
   every stage name (`dev`, `staging`, `prodeu`, …). For the ones you
   want to gate, configure required reviewers; leave the pre-prod ones
   without reviewers so they run freely.
4. Retire the `production` branch and any branch protection rule bound
   to it. `main` is now the single deploy branch.

The exported names `PipelineMatrixEntry`, `addActionPromotePrWorkflow`,
`addPrProductionWorkflow`, and `addPushProductionWorkflow` are removed.
Use `PipelineStage` in place of `PipelineMatrixEntry`. The
`PipelineStage.gated` field is also removed — every deploy job now
carries `environment: <environment>` unconditionally.

### Behaviour changes

#### Build once, synth many, diff/deploy many

The entry workflows (`pr-main.yml` / `push-main.yml`) now show the
pipeline shape as three explicit stages:

1. `build` — reusable `action-build.yml` runs install + projen drift +
   format/lint/tsc/test once, then uploads the workspace (minus
   `.git` and `cdk.out`) as a `build-workspace` artifact.
2. `synth` — an inline matrix job in the entry workflow, `needs: build`.
   One matrix entry per configured stage. Each downloads
   `build-workspace` (skipping reinstall + rebuild), runs
   `yarn synth <env>[/<workload>]`, and uploads its cloud assembly as
   `cdk-out-<env>[-<workload>]`.
3. `diff` / `deploy` — reusable per-stage jobs, all downstream of
   `synth`. In `pr-main.yml` every diff fans out from synth in parallel.
   In `push-main.yml` the first deploy waits on synth and each
   subsequent deploy waits on the previous deploy (so GH-Environment
   gating serialises the promotion).

Deploy and diff jobs download only their own stage's
`cdk-out-<env>[-<workload>]` artifact and run
`yarn run deploy:ci "<cdk_out_dir>"` / `cdk-diff-action` with
`noSynth: true` — no re-synth in the downstream jobs.

The `deploy:ci` npm script in `CDK_SCRIPTS` now takes a pre-synthed
`cdk.out/<env>[/<workload>]` path instead of a `bin/<env>.ts` app file;
`cdk deploy --app "$0"` operates on the pre-synthed cloud assembly.

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
    stages: [{ environment: 'iam' }],
    cdkDiff: { failOnDestructiveChanges: true },
  }
  ```
- **`pr-number` input on `action-diff.yml` is removed.** Only consumers that
  call the reusable workflow directly should notice.
- **New `synth:ci` script** added to `CDK_SCRIPTS`. Mirrors `diff:ci`; takes
  a positional bin file path and synthesizes into `cdk.out`.

### Breaking changes

#### `pipeline` is now required on `RocketleapPlatformCdkProject` / `RocketleapWorkloadCdkProject`

`rocketleap-projen` now generates the standard CDK pipeline GitHub Actions
workflows (`action-build.yml`, `action-deploy.yml`, `action-diff.yml`,
`pr-main.yml`, `push-main.yml`). To do that it needs to know which
environments and workloads the pipeline promotes through, so the new
`pipeline` field on `RocketleapCdkProjectOptions` is **required**.

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
    stages: [{ environment: 'iam' }],
  },
});
```

After (multi-workload project — e.g. `platform-cdk` — with prod-tier
gating handled via required reviewers on the `platform` / `prodeu` /
`produs` GitHub Environments):

```ts
const project = new PlatformCdkProject({
  company: 'rocketleap',
  project: 'platform-cdk',
  pipeline: {
    stages: [
      { environment: 'dev', workload: 'example-ecs' },
      { environment: 'dev', workload: 'example-lambda' },
      { environment: 'staging', workload: 'example-ecs' },
      { environment: 'platform', workload: 'management' },
      { environment: 'prodeu', workload: 'example-ecs' },
      { environment: 'produs', workload: 'example-ecs' },
    ],
  },
});
```

After running `yarn projen` the hand-maintained workflow files under
`.github/workflows/` are overwritten by projen-generated equivalents.
Delete the now-redundant copies (`action-*.yml`, `pr-main.yml`,
`push-main.yml`) so projen owns them going forward.
