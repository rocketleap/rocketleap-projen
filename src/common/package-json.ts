import { NodeProject } from 'projen/lib/javascript/node-project';

const DEFAULT_PACKAGE_COMMANDS = {
  'lint': 'eslint --fix .',
  'lint:ci': 'eslint --max-warnings=0 .',
  'clean': 'find bin src test -type f \\( -name "*.js" -o -name "*.d.ts" \\) -delete',
};

export function configurePackageJson(
  project: NodeProject,
  additionalScripts: {
    [name: string]: string;
  },
): void {
  project.addScripts({
    ...DEFAULT_PACKAGE_COMMANDS,
    ...additionalScripts,
  });
  project.package.addDevDeps(...['eslint@^8', 'eslint-plugin-jest@^28.x.x']);
}
