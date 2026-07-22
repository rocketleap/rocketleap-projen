# Changelog

## Unreleased

### Breaking changes

#### `PipelineStage.account` and `PipelineStage.region` are now required

Every stage passed to `pipeline.stages` must specify the AWS account and
region it deploys into. These values are used to assume `CdkDeployRole`
in the target account **before** `yarn synth` runs, so CDK context
providers (AMI lookup, hosted zone, availability zones) succeed in CI.

Before:

```ts
pipeline: {
  stages: [
    { environment: 'dev' },
    { environment: 'prodeu' },
  ],
},
```

After:

```ts
pipeline: {
  stages: [
    { environment: 'dev',    account: '111111111111', region: 'eu-west-1' },
    { environment: 'prodeu', account: '222222222222', region: 'eu-west-1' },
  ],
},
```

Values must match `stackProps.env.account` / `stackProps.env.region` in
`bin/<environment>[/<workload>].ts`.

#### Pipeline shape: synth folded into diff/deploy jobs

`action-synth.yml` and the shared `synth` matrix job in `pr-main.yml` /
`push-main.yml` are removed. Each `diff-<stage>` and `deploy-<stage>` job
now unpacks the build workspace, assumes `CdkDeployRole`, and runs
`yarn synth` itself. Consequences for consumers:

- CDK context lookups (`Vpc.fromLookup`, `LookupMachineImage`, etc.) that
  previously failed CI with "no credentials configured" now succeed —
  synth runs inside the target account.
- Diff / deploy job wall-time increases slightly (each job absorbs the
  synth step). The removed shared `synth` matrix job means one fewer
  runner per workflow, so total minutes go down for typical pipelines.
- Any `.projenrc.ts` / workflow file that referenced `action-synth.yml`
  directly must be updated.

#### Build workspace tarball includes `node_modules`

`action-build.yml` now packs the workspace with `tar -czf` before upload
(preserving native binary execute bits) and includes `node_modules`.
Downstream jobs untar and skip `yarn install` — ~15s saved per stage per
run. `!node_modules` is no longer in the workspace's exclude list.

### Behaviour changes

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
