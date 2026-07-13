# Changelog

## Unreleased

### Breaking changes

#### `PipelineOptions` collapses to a single ordered `stages` list

The GitOps promote-PR flow (separate `main` and `production` branches, an
auto-opened promote PR, `push-production.yml`, `pr-production.yml`,
`action-promote-pr.yml`) is retired in favour of a single `main` → prod
pipeline where prod-tier deploys are gated by GitHub Environment
protection rules. Along with that, the pipeline now builds and synths
once and downstream deploy/diff jobs reuse the resulting `cdk.out`
artifact instead of re-installing and re-synthesising per stage.

`PipelineOptions` reshapes from four arrays (`deployMain`, `diffMain`,
`deployProduction`, `diffProduction`) into a single ordered `stages`
list. Prod-tier stages carry `gated: true` — those deploy jobs will set
`environment: <name>` in the workflow, so GitHub Actions honours the
required-reviewer rules configured on that environment in the repo
settings.

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
    { environment: 'platform', gated: true },
    { environment: 'prodeu', gated: true },
    { environment: 'produs', gated: true },
  ],
}
```

Migration steps for each consumer repo:

1. Rewrite the `pipeline:` block in `.projenrc.ts` per the shape above.
   Order stages from earliest to latest; mark prod-tier stages with
   `gated: true`.
2. Run `npx projen`. `.github/workflows/push-production.yml`,
   `pr-production.yml`, and `action-promote-pr.yml` will be removed;
   `pr-main.yml` and `push-main.yml` will be regenerated.
3. In GitHub repo settings → Environments, create an environment for
   each gated stage name (e.g. `prodeu`, `produs`) and configure
   required reviewers on it.
4. Retire the `production` branch and any branch protection rule bound
   to it. `main` is now the single deploy branch.

The exported names `PipelineMatrixEntry`, `addActionPromotePrWorkflow`,
`addPrProductionWorkflow`, and `addPushProductionWorkflow` are removed.
Use `PipelineStage` in place of `PipelineMatrixEntry`.

### Behaviour changes

#### Build once and reuse `cdk.out` across deploy and diff

`action-build.yml` now synths every configured stage into
`cdk.out/<environment>[/<workload>]` and uploads the whole `cdk.out/`
tree as a workflow artifact. `action-deploy.yml` and `action-diff.yml`
download that artifact and run `cdk deploy --app cdk.out/<...>` /
`cdk-diff-action` with `noSynth: true` — no re-install, no re-build, no
re-synth in the downstream jobs. Deploys promote the same bits through
every stage.

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

After (multi-workload project with a gated production tier — e.g.
`platform-cdk`):

```ts
const project = new PlatformCdkProject({
  company: 'rocketleap',
  project: 'platform-cdk',
  pipeline: {
    stages: [
      { environment: 'dev', workload: 'example-ecs' },
      { environment: 'dev', workload: 'example-lambda' },
      { environment: 'staging', workload: 'example-ecs' },
      { environment: 'platform', workload: 'management', gated: true },
      { environment: 'prodeu', workload: 'example-ecs', gated: true },
      { environment: 'produs', workload: 'example-ecs', gated: true },
    ],
  },
});
```

After running `yarn projen` the hand-maintained workflow files under
`.github/workflows/` are overwritten by projen-generated equivalents.
Delete the now-redundant copies (`action-*.yml`, `pr-main.yml`,
`push-main.yml`) so projen owns them going forward.
