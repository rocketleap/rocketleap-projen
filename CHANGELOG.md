# Changelog

## Unreleased

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
