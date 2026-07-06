# rocketleap-projen

This project provides projen templates to quickly set up CDK projects in the Rocketleap platform.
It automatically tracks the `building-blocks-cdk` making it easy to stay up to date.

## Features

- Pre-configured AWS CDK TypeScript project setup
- Automatic dependency management for `building-blocks-cdk`
- Standardized ESLint, Prettier, and Git configuration
- Yarn Berry (v4) with private registry support
- Pre-commit hooks for code quality

## How to adopt

### New project

Run `projen new` to create a new project:

```shell
npx projen new --from @rocketleap/rocketleap-projen --company "<company>" --project "<project>"
```

### Existing project

Existing projects can adopt the projen templates and get managed by `projen`.

1. Install the `rocketleap-projen` library and peer dependencies:

   ```shell
   yarn add -D @rocketleap/rocketleap-projen projen
   ```

2. Create or replace the `.projenrc.ts` file using the appropriate project type:

   ```typescript
   import { PlatformCdkProject } from '@rocketleap/rocketleap-projen';

   const project = new PlatformCdkProject({
     company: '<company>',
     project: '<project>',
   });

   project.synth();
   ```

3. Run projen to generate the project configuration:

   ```shell
   npx ts-node .projenrc.ts
   ```

## Project Types

### PlatformCdkProject

Use for **platform infrastructure** code (e.g., root-cdk, vpc-cdk, iam-cdk, security-cdk).

- Includes the Norberhuis Onderneming B.V. IaC License
- For code that is part of the licensed platform

```typescript
import { PlatformCdkProject } from '@rocketleap/rocketleap-projen';

const project = new PlatformCdkProject({
  company: 'rocketleap',
  project: 'root-cdk',
});

project.synth();
```

### WorkloadCdkProject

Use for **customer workload** code that runs on the platform.

- Does NOT include the platform license
- For customer-specific application infrastructure

```typescript
import { WorkloadCdkProject } from '@rocketleap/rocketleap-projen';

const project = new WorkloadCdkProject({
  company: 'acme',
  project: 'my-app-cdk',
});

project.synth();
```

### RocketleapCdkProject (Base)

The base class used by both project types. Can be used directly if you need custom license handling.

## Options

| Option                  | Required | Default     | Description                                     |
| ----------------------- | -------- | ----------- | ----------------------------------------------- |
| `company`               | Yes      | -           | The company identifier used for package scoping |
| `project`               | Yes      | -           | The project name                                |
| `cdkVersion`            | No       | `'2.232.1'` | The AWS CDK version to use                      |
| `constructVersion`      | No       | `'10.4.4'`  | The constructs library version                  |
| `buildingBlocksVersion` | No       | `'0.104.1'` | The Rocketleap building blocks CDK version      |

## Extending the template

The project options interface passes through the full projen `AwsCdkTypeScriptAppOptions` (or `TypeScriptProjectOptions` for the library variant). Anything you set is deep-merged with the Rocketleap defaults, so you don't have to fight the generated files.

**Merge rules**

- Arrays (e.g. `gitignore`, `eslintOptions.ignorePatterns`, `devDeps`) are concatenated and deduped — user entries first.
- Plain objects (e.g. `tsconfig`, `prettierOptions`, `context`, `jestOptions.jestConfig`) are merged recursively; on scalar collisions the user wins.
- A handful of keys are **locked** to the Rocketleap default and any user override is ignored: `name`, `packageName`, `defaultReleaseBranch`, `licensed`, `autoDetectBin`, `pullRequestTemplate`, `cdkVersionPinning`, `packageManager`, and `githubOptions.mergify` / `githubOptions.workflows`.

**Common extensions**

```typescript
const project = new WorkloadCdkProject({
  company: 'acme',
  project: 'my-app-cdk',

  // Extra gitignore patterns (merged with the Rocketleap defaults)
  gitignore: ['.venv/', 'pyproject.toml.bak'],

  // Extra CDK context (merged)
  context: { 'my-team:feature-x': true },

  // Single build command that runs before `cdk synth`
  buildCommand: 'poetry build',
});

// Arbitrary build steps that run as part of `yarn build` (and in CI)
project.preCompileTask.exec('poetry build', { name: 'build-python' });
project.preCompileTask.exec('./scripts/generate-schema.sh', { name: 'generate-schema' });

project.synth();
```
