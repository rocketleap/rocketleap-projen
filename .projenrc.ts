import { cdk, javascript } from 'projen';

const project = new cdk.JsiiProject({
  name: 'rocketleap-projen',
  repositoryUrl: 'https://github.com/rocketleap/rocketleap-projen',
  author: 'Rocketleap',
  authorAddress: 'info@rocketleap.com',
  defaultReleaseBranch: 'main',
  licensed: false,

  packageManager: javascript.NodePackageManager.YARN_BERRY,
  projenrcTs: true,

  peerDeps: ['projen', 'constructs'],
  bundledDeps: [],

  jsiiVersion: '~5.7.0',

  prettier: true,
  prettierOptions: {
    settings: {
      printWidth: 120,
      singleQuote: true,
      trailingComma: javascript.TrailingComma.ALL,
      semi: true,
    },
  },

  gitignore: [
    '.idea',
    '.vscode',
    '*.js',
    '*.d.ts',
    '!.projenrc.ts',
  ],
});

project.package.addField('version', '0.0.1');

project.synth();
