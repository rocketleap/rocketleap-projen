# Changelog

## 1.21.0:

### Mark production stages with promotion: true

The promotion pull request is now the default pipeline. Pushes to the source branch (`main` by default) deploy the stages without `promotion`, then a promotion pull request onto the target branch (`production` by default) carries the production `cdk diff`, and merging it deploys the stages marked `promotion: true` in their listed order. A pipeline without any `promotion: true` stage fails `npx projen` with a migration message. Repos that want to keep the single-branch pipeline set `promotionStrategy: PromotionStrategy.DIRECT`.

Before:

```ts
pipeline: {
  stages: [
    { environment: 'dev' },
    { environment: 'staging' },
    { environment: 'prodeu' },
    { environment: 'produs' },
  ],
},
```

After:

```ts
pipeline: {
  stages: [
    { environment: 'dev' },
    { environment: 'staging' },
    { environment: 'prodeu', promotion: true },
    { environment: 'produs', promotion: true },
  ],
},
```

Repos whose branches are `dev` and `main` instead of `main` and `production` add `promotion` with the branch names. `pipeline.promotion` is optional and only holds `sourceBranch` (default `main`) and `targetBranch` (default `production`).

```ts
pipeline: {
  stages: [
    { environment: 'dev' },
    { environment: 'prod', promotion: true },
  ],
  promotion: { sourceBranch: 'dev', targetBranch: 'main' },
},
```

Single-stage repos, or repos that keep the single-branch pipeline, add `promotionStrategy` instead of marking a stage with `promotion: true`. Import `PromotionStrategy` from `@rocketleap/rocketleap-projen`. Its GitHub Environment gates only block on GitHub Enterprise; on Free and Team plans production deploys unreviewed.

```ts
pipeline: {
  stages: [{ environment: 'iam' }],
  promotionStrategy: PromotionStrategy.DIRECT,
},
```

**Customer action:**

- Create `production` from `main` if it does not exist. `main` stays the default branch of the repository.
- Require a review on `production` so the promotion pull request is a real gate.
- Run `npx projen` and commit the new `pr-main.yml`, `push-main.yml`, `pr-production.yml`, `push-production.yml` and `action-promote-pr.yml` workflows.

## 1.3.0:

### Require pipeline on PlatformCdkProject and WorkloadCdkProject

`rocketleap-projen` generates the CDK pipeline GitHub Actions workflows. The `pipeline` field is required so it knows which stages the pipeline targets.

Before:

```ts
const project = new PlatformCdkProject({
  company: 'rocketleap',
  project: 'iam-cdk',
});
```

After:

```ts
const project = new PlatformCdkProject({
  company: 'rocketleap',
  project: 'iam-cdk',
  pipeline: {
    stages: [{ environment: 'iam' }],
  },
});
```

**Customer action:**

- Run `npx projen`, then delete the hand-maintained copies of `action-*.yml`, `pr-main.yml` and `push-main.yml` under `.github/workflows/` so projen owns them going forward.
