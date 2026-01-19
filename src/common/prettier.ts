import { javascript } from 'projen';

/**
 * Prettier/Format configuration for Rocketleap projects
 */
export const PRETTIER_CONFIGURATION = {
  prettier: true,
  prettierOptions: {
    settings: {
      printWidth: 120,
      singleQuote: true,
      trailingComma: javascript.TrailingComma.ALL,
      semi: true,
      quoteProps: javascript.QuoteProps.CONSISTENT,
    },
    ignoreFileOptions: {
      ignorePatterns: [
        // Build artifacts
        'dist/',
        'lib/',
        'node_modules/',
        'coverage/',
        '.yarn/',
        // Projen-generated files
        'package.json',
        'tsconfig.json',
        'tsconfig.dev.json',
        '.eslintrc.json',
        '.prettierrc.json',
        'jest.config.json',
        '.gitignore',
        '.npmignore',
        '.yarnrc.yml',
        '.pre-commit-config.yaml',
        '.github/',
        '.mergify.yml',
        '*.generated.ts',
        // CDK-specific files
        'cdk.json',
        'cdk.out/',
        '.cdk.staging/',
        // Other
        '.claude/',
        '.pnp.cjs',
        'API.md',
      ],
    },
  },
};
