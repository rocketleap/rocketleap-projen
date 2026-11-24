# Changelog

## 1.21.0:

### Move production stages into pipeline.promotion.productionStages

The promotion pull request is now the default pipeline. Pushes to `dev` deploy `pipeline.stages`, then a promotion pull request onto `main` carries the production `cdk diff`, and merging it deploys `pipeline.promotion.productionStages`. A `pipeline: { stages: [...] }` without `promotion` fails `npx projen` with a migration message. Repos that want to keep the single-branch pipeline set `promotionStrategy: PromotionStrategy.DIRECT`.

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
  stages: [{ environment: 'dev' }, { environment: 'staging' }],
  promotion: {
    productionStages: [{ environment: 'prodeu' }, { environment: 'produs' }],
  },
},
```

A stage must never appear in both `stages` and `productionStages`.

Single-stage repos, or repos that keep the single-branch pipeline, add `promotionStrategy` instead of `promotion`. Import `PromotionStrategy` from `@rocketleap/rocketleap-projen`. Its GitHub Environment gates only block on GitHub Enterprise; on Free and Team plans production deploys unreviewed.

```ts
pipeline: {
  stages: [{ environment: 'iam' }],
  promotionStrategy: PromotionStrategy.DIRECT,
},
```

**Customer action:**

- Create `dev` from `main` if it does not exist and make it the default branch of the repository.
- Require a review on `main` so the promotion pull request is a real gate.
- Run `npx projen` and commit the new `pr-dev.yml`, `push-dev.yml` and `action-promote-pr.yml` workflows.

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
