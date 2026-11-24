# Changelog

## 1.21.0:

### Mark production stages with promotion: true

The promotion pull request is now the default pipeline. Pushes to the source branch (`dev` by default) deploy the stages without `promotion`, then a promotion pull request onto the target branch (`main` by default) carries the production `cdk diff`, and merging it deploys the stages marked `promotion: true` in their listed order. A pipeline without any `promotion: true` stage fails `npx projen` with a migration message. Repos that want to keep the single-branch pipeline set `promotionStrategy: PromotionStrategy.DIRECT`.

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

Repos whose branches are `main` and `production` instead of `dev` and `main` add `promotion` with the branch names. `pipeline.promotion` is optional and only holds `sourceBranch` (default `dev`) and `targetBranch` (default `main`).

```ts
pipeline: {
  stages: [
    { environment: 'dev' },
    { environment: 'prod', promotion: true },
  ],
  promotion: { sourceBranch: 'main', targetBranch: 'production' },
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

- Create the source branch (`dev` by default) from the target branch if it does not exist and make it the default branch of the repository.
- Require a review on the target branch (`main` by default) so the promotion pull request is a real gate.
- Run `npx projen` and commit the new `pr-<source>.yml`, `push-<source>.yml`, `pr-<target>.yml`, `push-<target>.yml` and `action-promote-pr.yml` workflows.

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
