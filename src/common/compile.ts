import { javascript } from 'projen';
import { Jest, JestOptions, Transform, TypescriptConfigOptions } from 'projen/lib/javascript';
import { NodeProject } from 'projen/lib/javascript/node-project';

export const COMPILE_TARGET = 'ES2022';

/**
 * Common compiler options shared across all Rocketleap project types.
 */
const COMMON_COMPILE_CONFIGURATION: javascript.TypeScriptCompilerOptions = {
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
 * Compile configuration for CDK application projects, merged with caller-supplied overrides.
 *
 * Merge rules for `tsconfig` / `tsconfigDev`:
 * - `compilerOptions` merges: caller wins on scalar collisions.
 * - `include` / `exclude` concatenate (caller entries first, deduped).
 */
export function compileConfig(
  userTsconfig?: TypescriptConfigOptions,
  userTsconfigDev?: TypescriptConfigOptions,
): { tsconfig: TypescriptConfigOptions; tsconfigDev: TypescriptConfigOptions } {
  return {
    tsconfig: mergeTsconfig(userTsconfig, {
      compilerOptions: { rootDir: '.', outDir: '.', ...COMMON_COMPILE_CONFIGURATION },
      include: ['src/**/*.ts', 'bin/**/*ts'],
      exclude: ['cdk.out', 'node_modules'],
    }),
    tsconfigDev: mergeTsconfig(userTsconfigDev, {
      compilerOptions: { ...COMMON_COMPILE_CONFIGURATION, sourceMap: true },
      include: ['src/**/*.ts', 'bin/**/*ts', 'test/**/*.ts'],
    }),
  };
}

/**
 * Compile configuration for CDK library projects, merged with caller-supplied overrides.
 */
export function libraryCompileConfig(
  userTsconfig?: TypescriptConfigOptions,
  userTsconfigDev?: TypescriptConfigOptions,
): { tsconfig: TypescriptConfigOptions; tsconfigDev: TypescriptConfigOptions } {
  return {
    tsconfig: mergeTsconfig(userTsconfig, {
      compilerOptions: { rootDir: 'src', outDir: 'dist', ...COMMON_COMPILE_CONFIGURATION },
      include: ['src/**/*.ts'],
      exclude: ['cdk.out', 'node_modules'],
    }),
    tsconfigDev: mergeTsconfig(userTsconfigDev, {
      compilerOptions: { ...COMMON_COMPILE_CONFIGURATION, sourceMap: true },
      include: ['src/**/*.ts', 'test/**/*.ts'],
    }),
  };
}

/**
 * SWC configuration for fast transpilation in Jest tests and CDK commands.
 * SWC only transpiles — type checking remains via tsc in the build step.
 *
 * The caller's `jestOptions.jestConfig` is merged with the Rocketleap default
 * (caller wins on scalar collisions), so setups like `setupFiles` survive.
 */
export function swcConfig(userJestOptions?: JestOptions): {
  projenrcTs: true;
  projenrcTsOptions: { swc: true };
  jestOptions: JestOptions;
} {
  const defaultTransform: { [key: string]: Transform } = {
    '^.+\\.[t]sx?$': new Transform('@swc/jest', { jsc: { target: COMPILE_TARGET.toLowerCase() } }),
  };
  const userTransform = (userJestOptions?.jestConfig?.transform as { [key: string]: Transform } | undefined) ?? {};
  return {
    projenrcTs: true,
    projenrcTsOptions: { swc: true },
    jestOptions: {
      ...(userJestOptions ?? {}),
      jestConfig: {
        ...(userJestOptions?.jestConfig ?? {}),
        transform: { ...defaultTransform, ...userTransform },
      },
    },
  };
}

/**
 * Configures SWC-related settings that must be applied after project construction.
 */
export function configureSwc(project: NodeProject): void {
  Jest.of(project)!.config.workerIdleMemoryLimit = '512MB';
  project.addDevDeps('@swc/core', '@swc/jest');
}

function mergeTsconfig(
  user: TypescriptConfigOptions | undefined,
  defaults: TypescriptConfigOptions,
): TypescriptConfigOptions {
  return {
    ...defaults,
    ...(user ?? {}),
    compilerOptions: {
      ...(defaults.compilerOptions ?? {}),
      ...(user?.compilerOptions ?? {}),
    },
    include: dedupe([...(user?.include ?? []), ...(defaults.include ?? [])]),
    exclude: dedupe([...(user?.exclude ?? []), ...(defaults.exclude ?? [])]),
  };
}

function dedupe(items: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const item of items) {
    if (seen.has(item)) continue;
    seen.add(item);
    out.push(item);
  }
  return out;
}
