import { javascript } from 'projen';
import { EslintOptions } from 'projen/lib/javascript';

interface EsLintConfiguration {
  eslint: boolean;
  eslintOptions: EslintOptions;
}

/**
 * ESLint/Lint configuration for Rocketleap projects
 */
export const ESLINT_CONFIGURATION: EsLintConfiguration = {
  eslint: true,
  eslintOptions: {
    dirs: ['src'],
    ignorePatterns: [
      // Build artifacts and generated files
      '*.js',
      '*.d.ts',
      'node_modules/',
      'dist/',
      'lib/',
      'coverage/',
      '*.generated.ts',
      // Projen-generated files
      'package.json',
      'tsconfig.json',
      'tsconfig.dev.json',
      '.eslintrc.json',
      'jest.config.json',
      // CDK-specific files
      'cdk.out/',
      'cdk.json',
      // Handler files
      'src/**/*-handler/index.ts',
    ],
    prettier: true,
  },
};

/**
 * Configures ESLint with Rocketleap's standard extends, plugins, and overrides
 */
export function configureEsLint(eslint: javascript.Eslint): void {
  eslint.addExtends(
    ...[
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:import/typescript',
      'plugin:jest/recommended',
      'prettier',
      'plugin:prettier/recommended',
    ],
  );
  eslint.addPlugins(...['@typescript-eslint', 'import', 'jest', 'prettier']);
  eslint.addRules({
    // Allow empty interfaces that extend other interfaces (common pattern for CDK props)
    '@typescript-eslint/no-empty-object-type': 'off',
  });
  eslint.addOverride({
    files: ['*.test.ts'],
    rules: {
      'jest/expect-expect': 'off',
    },
  });
}
