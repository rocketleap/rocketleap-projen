import { NodeProject } from 'projen/lib/javascript/node-project';

/**
 * Common npm scripts shared across all Rocketleap project types.
 */
const COMMON_SCRIPTS = {
  'format': "prettier --write . '!**/*.{js,d.ts}'",
  'format:ci': "prettier -c . '!**/*.{js,d.ts}'",
  'lint': 'eslint --fix .',
  'lint:ci': 'eslint --max-warnings=0 .',
  'test': 'jest',
  'test:ci': 'jest --ci',
  'test:update-snapshots': 'jest --updateSnapshot',
};

/**
 * npm scripts for CDK application projects.
 */
export const CDK_SCRIPTS = {
  ...COMMON_SCRIPTS,
  'build': 'tsc',
  'clean': 'find bin src test -type f \\( -name "*.js" -o -name "*.d.ts" \\) -delete',
  'watch': 'tsc -w',
  'synth': 'cdk synth --output cdk.out/$0/ --app "yarn ts-node --swc --prefer-ts-exts bin/$0.ts";',
  'list': 'cdk list --output cdk.out/$0/ --app "yarn ts-node --swc --prefer-ts-exts bin/$0.ts";',
  'bootstrap': 'cdk bootstrap --output cdk.out/$0/ --app "yarn ts-node --swc --prefer-ts-exts bin/$0.ts";',
  'diff': 'cdk diff --output cdk.out/$0/ -e --app "yarn ts-node --swc --prefer-ts-exts bin/$0.ts" ${1:-};',
  'diff:ci': 'cdk diff --ci --app "yarn ts-node --swc --prefer-ts-exts $0";',
  'synth:ci': 'cdk synth --ci --app "yarn ts-node --swc --prefer-ts-exts $0" --quiet;',
  'deploy':
    'cdk deploy --concurrency 10 --require-approval never --output cdk.out/$0/ -e --app "yarn ts-node --swc --prefer-ts-exts bin/$0.ts" ${1:---all};',
  'deploy:ci': 'cdk deploy --concurrency 10 --ci --all --require-approval never --app "$0";',
  'destroy': 'cdk destroy --output cdk.out/$0/ -e --app "yarn ts-node --swc --prefer-ts-exts bin/$0.ts" ${1:---all};',
  'destroy:ci': 'cdk destroy --ci -f --all --output cdk.out/$0/ --app  "yarn  ts-node --swc --prefer-ts-exts $0";',
};

/**
 * npm scripts for CDK library projects.
 */
export const LIBRARY_SCRIPTS = {
  ...COMMON_SCRIPTS,
  'build': 'tsc -p tsconfig.json',
  'build:dev': 'tsc -p tsconfig.dev.json',
  'clean': 'find src test -type f \\( -name "*.js" -o -name "*.d.ts" \\) -delete',
};

export function configurePackageJson(
  project: NodeProject,
  scripts: {
    [name: string]: string;
  },
): void {
  project.addScripts(scripts);
  project.package.addDevDeps(...['eslint@^8', 'eslint-plugin-jest@^28.x.x']);
}
