/**
 * Git configuration for Rocketleap projects
 */
export const GIT_CONFIGURATION = {
  gitignore: [
    // IDE files
    '.code',
    '.idea',
    '.vscode',
    // TypeScript build artifacts
    '*.d.ts',
    '*.js',
    '*.js.map',
    'dist/',
    // Yarn
    '.pnp.*',
    '.yarn/*',
    '!.yarn/patches',
    '!.yarn/plugins',
    '!.yarn/releases',
    '!.yarn/sdks',
    // Other
    '.claude/',
    'coverage/',
    // Python
    'venv',
    '__pycache__/',
    // CDK asset staging directory
    '.cdk.staging',
    'cdk.out',
    // Rocketleap release files
    'release.diff',
  ],
};
