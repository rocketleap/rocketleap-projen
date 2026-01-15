import { cdk, javascript } from 'projen';

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

project.synth();
