import { Jest, Transform } from 'projen/lib/javascript';
import { NodeProject } from 'projen/lib/javascript/node-project';

export const COMPILE_TARGET = 'ES2022';

/**
 * Common compiler options shared across all Rocketleap project types.
 */
export const COMMON_COMPILE_CONFIGURATION = {
  alwaysStrict: true,
  declaration: true,
  esModuleInterop: true,
  experimentalDecorators: true,
  inlineSourceMap: true,
  inlineSources: true,
  lib: ['es2022'],
  module: 'NodeNext',
  noEmitOnError: false,
  noFallthroughCasesInSwitch: true,
  noImplicitAny: true,
  noImplicitReturns: true,
  noImplicitThis: true,
  noUnusedLocals: true,
  noUnusedParameters: true,
  resolveJsonModule: true,
  skipLibCheck: true,
  strict: true,
  strictNullChecks: true,
  strictPropertyInitialization: true,
  stripInternal: true,
  target: COMPILE_TARGET,
};

/**
 * Compile configuration for CDK application projects.
 */
export const COMPILE_CONFIGURATION = {
  tsconfig: {
    compilerOptions: {
      rootDir: '.',
      outDir: '.',
      ...COMMON_COMPILE_CONFIGURATION,
    },
    include: ['src/**/*.ts', 'bin/**/*ts'],
    exclude: ['cdk.out', 'node_modules'],
  },
  tsconfigDev: {
    compilerOptions: {
      ...COMMON_COMPILE_CONFIGURATION,
      sourceMap: true,
    },
    include: ['src/**/*.ts', 'bin/**/*ts', 'test/**/*.ts'],
  },
};

/**
 * Compile configuration for CDK library projects.
 */
export const LIBRARY_COMPILE_CONFIGURATION = {
  tsconfig: {
    compilerOptions: {
      rootDir: 'src',
      outDir: 'dist',
      ...COMMON_COMPILE_CONFIGURATION,
    },
    include: ['src/**/*.ts'],
    exclude: ['cdk.out', 'node_modules'],
  },
  tsconfigDev: {
    compilerOptions: {
      ...COMMON_COMPILE_CONFIGURATION,
      sourceMap: true,
    },
    include: ['src/**/*.ts', 'test/**/*.ts'],
  },
};

/**
 * SWC configuration for fast transpilation in Jest tests and CDK commands.
 * SWC only transpiles — type checking remains via tsc in the build step.
 */
export const SWC_CONFIGURATION = {
  projenrcTs: true,
  projenrcTsOptions: { swc: true },
  jestOptions: {
    jestConfig: {
      transform: {
        '^.+\\.[t]sx?$': new Transform('@swc/jest', {
          jsc: { target: COMPILE_TARGET.toLowerCase() },
        }),
      },
    },
  },
};

/**
 * Configures SWC-related settings that must be applied after project construction.
 *
 * Clears the .swc cache directory before running projen to prevent stale transpile
 * cache from using outdated dependency versions (e.g. after updating rocketleap-projen).
 */
export function configureSwc(project: NodeProject): void {
  Jest.of(project)!.config.workerIdleMemoryLimit = '512MB';
  project.addDevDeps('@swc/core', '@swc/jest');

  project.defaultTask!.prependExec('rm -rf .swc');
}
