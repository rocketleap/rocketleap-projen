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
  lib: ['es2020'],
  module: 'CommonJS',
  noEmitOnError: false,
  noFallthroughCasesInSwitch: true,
  noImplicitAny: true,
  noImplicitReturns: true,
  noImplicitThis: true,
  noUnusedLocals: true,
  noUnusedParameters: true,
  resolveJsonModule: true,
  strict: true,
  strictNullChecks: true,
  strictPropertyInitialization: true,
  stripInternal: true,
  target: 'ES2020',
};

/**
 * Compile configuration for CDK application projects.
 */
export const COMPILE_CONFIGURATION = {
  tsconfig: {
    compilerOptions: {
      rootDir: '',
      outDir: '',
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
