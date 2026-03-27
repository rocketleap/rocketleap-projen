import { javascript } from 'projen';

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
