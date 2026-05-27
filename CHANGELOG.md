# Changelog

## Unreleased

### Behaviour changes

#### Rich CDK diff comments via `corymhall/cdk-diff-action`

`action-diff.yml` no longer runs `yarn diff:ci` + `Tiryoh/gha-jobid-action`
+ a bash `gh pr comment` step that posted a link into the job log. It now
synthesizes the CDK app (`yarn synth:ci`) and hands the `cdk.out` directory
to [`corymhall/cdk-diff-action@v2`](https://github.com/marketplace/actions/cdk-diff-action),
which posts a rich inline diff as a PR comment per CDK Stage and updates
the same comment on each commit (no comment spam).

Visible consequences for consumers:

- **PRs will now fail when the diff contains destructive changes** (action
  default `failOnDestructiveChanges: "true"`). Reviewers can no longer ignore
  a yellow checkbox; the workflow goes red. To opt out, a follow-up will add
  a `cdkDiff.failOnDestructiveChanges?: false` field on `PipelineOptions`.
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
