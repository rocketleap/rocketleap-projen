import { cdk, javascript, JsonPatch } from 'projen';

const project = new cdk.JsiiProject({
  name: '@rocketleap/rocketleap-projen',
  repositoryUrl: 'https://github.com/rocketleap/rocketleap-projen',
  author: 'Rocketleap',
  authorAddress: 'info@rocketleap.com',
  licensed: false,

  defaultReleaseBranch: 'main',
  releaseToNpm: true,
  npmAccess: javascript.NpmAccess.PUBLIC,

  packageManager: javascript.NodePackageManager.YARN_BERRY,
  yarnBerryOptions: {
    version: '4.9.2',
    yarnRcOptions: {
      yarnPath: '.yarn/releases/yarn-4.9.2.cjs',
      compressionLevel: 'mixed',
      enableGlobalCache: true,
      nodeLinker: javascript.YarnNodeLinker.NODE_MODULES,
    },
  },
  projenrcTs: true,

  peerDeps: ['projen', 'constructs'],
  bundledDeps: [],

  prettier: true,
  prettierOptions: {
    settings: {
      printWidth: 120,
      singleQuote: true,
      trailingComma: javascript.TrailingComma.ALL,
      semi: true,
    },
  },

  gitignore: ['.idea', '.vscode', '*.js', '*.d.ts', '!.projenrc.ts'],
});
project.release?.publisher.publishToNpm({
  registry: 'registry.npmjs.org',
  distTag: 'latest',
  npmProvenance: true,
  prePublishSteps: [
    {
      name: 'Checkout',
      uses: 'actions/checkout@v5',
      with: {
        path: '.repo',
      },
    },
    {
      name: 'Install Dependencies',
      run: 'cd .repo && yarn install --immutable',
    },
    {
      name: 'Extract build artifact',
      run: 'tar --strip-components=1 -xzvf dist/js/*.tgz -C .repo',
    },
    {
      name: 'Move build artifact out of the way',
      run: 'mv dist dist.old',
    },
    {
      name: 'Create js artifact',
      run: 'cd .repo && npx projen package:js',
    },
    { name: 'Collect js artifact', run: 'mv .repo/dist dist' },
  ],
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
    contents: 'read',
    packages: 'write',
  }),
);

project.synth();
