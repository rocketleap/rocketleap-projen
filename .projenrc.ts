import { PrimitiveType } from '@jsii/spec';
import { ProjenStruct, Struct } from '@mrgrain/jsii-struct-builder';
import { cdk, javascript, JsonPatch } from 'projen';
import { ACTIONS_CONFIGURATION } from './src/common/actions';
import { configureEsLint, ESLINT_CONFIGURATION } from './src/common/eslint';
import { GIT_CONFIGURATION } from './src/common/git';
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
  ...GIT_CONFIGURATION,
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
      default: "'2.248.0'",
    },
  })
  .add({
    name: 'constructVersion',
    optional: true,
    type: { primitive: PrimitiveType.String },
    docs: {
      summary: 'The constructs library version to use.',
      default: "'10.5.0'",
    },
  })
  .add({
    name: 'buildingBlocksVersion',
    optional: true,
    type: { primitive: PrimitiveType.String },
    docs: {
      summary: 'The Rocketleap building blocks CDK version to use.',
      default: "'0.106.0'",
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
      default: "'2.248.0'",
    },
  })
  .add({
    name: 'constructVersion',
    optional: true,
    type: { primitive: PrimitiveType.String },
    docs: {
      summary: 'The constructs library version to use as peer dependency.',
      default: "'10.5.0'",
    },
  });

project.synth();
