import { javascript } from 'projen';
import { NodeProject } from 'projen/lib/javascript/node-project';

/**
 * Base Rocketleap Yarn Berry configuration used at the .projenrc level.
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
 * Rocketleap Yarn configuration for a scoped company, merged with caller overrides.
 *
 * Caller-supplied `yarnBerryOptions.yarnRcOptions` merges with the Rocketleap
 * default; `npmScopes` and `npmRegistries` are deep-merged so caller-defined
 * private registries survive.
 */
export function yarnConfig(
  company: string,
  userYarnBerryOptions?: javascript.YarnBerryOptions,
): { packageManager: javascript.NodePackageManager; yarnBerryOptions: javascript.YarnBerryOptions } {
  const defaultYarnRc: javascript.YarnrcOptions = {
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
  };
  const userYarnRc = userYarnBerryOptions?.yarnRcOptions ?? {};

  return {
    packageManager: javascript.NodePackageManager.YARN_BERRY,
    yarnBerryOptions: {
      version: userYarnBerryOptions?.version ?? '4.9.2',
      ...userYarnBerryOptions,
      yarnRcOptions: {
        ...defaultYarnRc,
        ...userYarnRc,
        npmRegistries: { ...(defaultYarnRc.npmRegistries ?? {}), ...(userYarnRc.npmRegistries ?? {}) },
        npmScopes: { ...(defaultYarnRc.npmScopes ?? {}), ...(userYarnRc.npmScopes ?? {}) },
      },
    },
  };
}
