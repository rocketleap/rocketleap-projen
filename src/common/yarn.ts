import { javascript } from 'projen';
import { NodeProject } from 'projen/lib/javascript/node-project';

/**
 * Package manager configuration for Rocketleap projects
 */
export const YARN_CONFIGURATION = {
  packageManager: javascript.NodePackageManager.YARN_BERRY,
  yarnBerryOptions: {
    version: '4.9.2',
    yarnRcOptions: {
      compressionLevel: 'mixed',
      enableGlobalCache: true,
      nodeLinker: javascript.YarnNodeLinker.NODE_MODULES,
    } as javascript.YarnrcOptions,
  },
};

/**
 * Creates package manager configuration with company-specific npm scopes
 */
/**
 * Overrides projen's default task PATH handling, which relies on package-manager
 * command resolution and can fail during `projen new` before the project has
 * been fully bootstrapped.
 * Since we use nodeLinker: node-modules, referencing node_modules/.bin directly works.
 */
export function configureTaskPath(project: NodeProject): void {
  project.tasks.addEnvironment(
    'PATH',
    "$(node --print \"require('path').resolve('node_modules/.bin') + require('path').delimiter + process.env.PATH\")",
  );
}

/**
 * Creates package manager configuration with company-specific npm scopes
 */
export function createYarnConfiguration(company: string) {
  return {
    packageManager: javascript.NodePackageManager.YARN_BERRY,
    yarnBerryOptions: {
      version: '4.9.2',
      yarnRcOptions: {
        compressionLevel: 'mixed',
        enableGlobalCache: true,
        nodeLinker: javascript.YarnNodeLinker.NODE_MODULES,
        npmRegistries: {
          'https://npm.pkg.github.com/': {
            npmAuthToken: '${GITHUB_TOKEN}',
          },
        },
        npmScopes: {
          [company]: {
            npmRegistryServer: 'https://npm.pkg.github.com/',
            npmPublishRegistry: 'https://npm.pkg.github.com/',
            npmAlwaysAuth: true,
          },
        },
      } as javascript.YarnrcOptions,
    },
  };
}
