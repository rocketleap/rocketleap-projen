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
    matrix: [{ environment: 'iam' }],
  },
});
```

After (multi-workload project with GitOps production promotion — e.g.
`platform-cdk`):

```ts
const project = new PlatformCdkProject({
  company: 'rocketleap',
  project: 'platform-cdk',
  pipeline: {
    matrix: [
      { environment: 'dev', workload: 'example-ecs' },
      { environment: 'dev', workload: 'example-lambda' },
    ],
    productionPromotionFlow: {
      matrix: [
        { environment: 'prodeu', workload: 'example-ecs' },
        { environment: 'produs', workload: 'example-ecs' },
      ],
    },
  },
});
```

After running `yarn projen` the hand-maintained workflow files under
`.github/workflows/` are overwritten by projen-generated equivalents. Delete
the now-redundant copies (`action-*.yml`, `pr-main.yml`, `push-main.yml`,
and the production variants when applicable) so projen owns them going
forward.
