import { PrimitiveType } from '@jsii/spec';
import { ProjenStruct, Struct } from '@mrgrain/jsii-struct-builder';
import { cdk, javascript, JsonPatch } from 'projen';
import { ACTIONS_CONFIGURATION } from './src/common/actions';
import { configureEsLint, ESLINT_CONFIGURATION } from './src/common/eslint';
import { gitIgnore } from './src/common/git';
import { configurePackageJson } from './src/common/package-json';
import { createPreCommitConfig, JSII_PRE_COMMIT_HOOKS } from './src/common/pre-commit';
import { PRETTIER_CONFIGURATION } from './src/common/prettier';
import { YARN_CONFIGURATION } from './src/common/yarn';

const project = new cdk.JsiiProject({
  name: '@rocketleap/rocketleap-projen',
  repositoryUrl: 'https://github.com/rocketleap/rocketleap-projen',
  author: 'Rocketleap',
  authorAddress: 'info@rocketleap.com',
  licensed: false,

  defaultReleaseBranch: 'main',
  majorVersion: 1,
  releaseToNpm: true,
  npmAccess: javascript.NpmAccess.PUBLIC,

  projenrcTs: true,

  workflowBootstrapSteps: ACTIONS_CONFIGURATION.workflowBootstrapSteps,

  peerDeps: ['projen', 'constructs'],
  devDeps: ['@mrgrain/jsii-struct-builder', 'aws-cdk-lib'],
  bundledDeps: [],

  ...YARN_CONFIGURATION,
  ...ESLINT_CONFIGURATION,
  ...PRETTIER_CONFIGURATION,
  gitignore: gitIgnore(),
});
configureEsLint(project.eslint!);
createPreCommitConfig(project, JSII_PRE_COMMIT_HOOKS);
configurePackageJson(project, {});

project.release?.publisher.publishToNpm({
  registry: 'registry.npmjs.org',
  distTag: 'latest',
  npmProvenance: true,
  prePublishSteps: ACTIONS_CONFIGURATION.npmPrePublishSteps,
  postPublishSteps: [
    {
      name: 'Release to GitHub',
      run: 'npx -p publib@latest publib-npm',
      env: {
        NPM_DIST_TAG: 'latest',
        NPM_REGISTRY: 'npm.pkg.github.com',
        NPM_TOKEN: '${{ secrets.GITHUB_TOKEN }}',
      },
    },
  ],
});

project.tryFindObjectFile('.github/workflows/release.yml')?.patch(
  JsonPatch.add('/jobs/release_npm/permissions', {
    'id-token': 'write',
    'contents': 'read',
    'packages': 'write',
  }),
);

new ProjenStruct(project, { name: 'RocketleapCdkProjectOptions', filePath: 'src/cdk-project-options.generated.ts' })
  .mixin(Struct.fromFqn('projen.awscdk.AwsCdkTypeScriptAppOptions'))
  .omit('cdkVersion')
  .omit('name')
  .omit('defaultReleaseBranch')
  .add({
    name: 'company',
    type: { primitive: PrimitiveType.String },
    docs: {
      summary: 'The company identifier used for package scoping.',
      example: "'rocketleap'",
    },
  })
  .add({
    name: 'project',
    type: { primitive: PrimitiveType.String },
    docs: {
      summary: 'The project name.',
      example: "'root-cdk'",
    },
  })
  .add({
    name: 'cdkVersion',
    optional: true,
    type: { primitive: PrimitiveType.String },
    docs: {
      summary: 'The AWS CDK version to use in the project.',
      default: "'LATEST'",
    },
  })
  .add({
    name: 'constructVersion',
    optional: true,
    type: { primitive: PrimitiveType.String },
    docs: {
      summary: 'The constructs library version to use.',
      default: "'LATEST'",
    },
  })
  .add({
    name: 'buildingBlocksVersion',
    optional: true,
    type: { primitive: PrimitiveType.String },
    docs: {
      summary: 'The Rocketleap building blocks CDK version to use.',
      default: "'LATEST'",
    },
  })
  .add({
    name: 'pipeline',
    type: { fqn: '@rocketleap/rocketleap-projen.PipelineOptions' },
    docs: {
      summary: 'Configuration for the generated CDK pipeline GitHub Actions workflows.',
      remarks:
        'Drives the matrix of (environment, workload) pairs used by pr-main.yml and push-main.yml, and optionally enables the GitOps production-promotion flow.',
    },
  });

new ProjenStruct(project, {
  name: 'RocketleapLibraryCdkProjectOptions',
  filePath: 'src/library-cdk-project-options.generated.ts',
})
  .mixin(Struct.fromFqn('projen.typescript.TypeScriptProjectOptions'))
  .omit('name')
  .omit('defaultReleaseBranch')
  .add({
    name: 'company',
    type: { primitive: PrimitiveType.String },
    docs: {
      summary: 'The company identifier used for package scoping.',
      example: "'rocketleap'",
    },
  })
  .add({
    name: 'project',
    type: { primitive: PrimitiveType.String },
    docs: {
      summary: 'The project name.',
      example: "'building-blocks-cdk'",
    },
  })
  .add({
    name: 'cdkVersion',
    optional: true,
    type: { primitive: PrimitiveType.String },
    docs: {
      summary: 'The AWS CDK version to use as peer dependency.',
      default: "'LATEST'",
    },
  })
  .add({
    name: 'constructVersion',
    optional: true,
    type: { primitive: PrimitiveType.String },
    docs: {
      summary: 'The constructs library version to use as peer dependency.',
      default: "'LATEST'",
    },
  });

project.synth();
