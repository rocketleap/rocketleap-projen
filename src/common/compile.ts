export const COMPILE_CONFIGURATION = {
  tsconfig: {
    compilerOptions: {
      rootDir: '.',
      outDir: 'dist',
      noUnusedLocals: true,
      noUnusedParameters: true,
      noFallthroughCasesInSwitch: true,
      strictPropertyInitialization: true,
    },
    include: ['bin/**/*ts', 'src/**/*.ts'],
    exclude: ['cdk.out', 'node_modules'],
  },
};
