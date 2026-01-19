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
  releaseToNpm: true,
  npmAccess: javascript.NpmAccess.PUBLIC,

  projenrcTs: true,

  workflowBootstrapSteps: ACTIONS_CONFIGURATION.workflowBootstrapSteps,

  peerDeps: ['projen', 'constructs'],
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

project.synth();
