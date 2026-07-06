import { javascript } from 'projen';
import { EslintOptions } from 'projen/lib/javascript';

const DEFAULT_IGNORE_PATTERNS: string[] = [
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
];

const DEFAULT_DIRS: string[] = ['src'];

/**
 * Rocketleap ESLint/Lint configuration, merged with any caller-supplied options.
 *
 * Merge rules:
 * - `dirs` and `ignorePatterns` are concatenated (caller entries first, deduped).
 * - Any other `EslintOptions` field the caller sets wins over the Rocketleap
 *   default (`prettier: true`).
 */
export function eslintConfig(userOptions?: Partial<EslintOptions>): { eslint: true; eslintOptions: EslintOptions } {
  return {
    eslint: true,
    eslintOptions: {
      dirs: dedupe([...(userOptions?.dirs ?? []), ...DEFAULT_DIRS]),
      ignorePatterns: dedupe([...(userOptions?.ignorePatterns ?? []), ...DEFAULT_IGNORE_PATTERNS]),
      prettier: userOptions?.prettier ?? true,
      ...omit(userOptions, ['dirs', 'ignorePatterns', 'prettier']),
    },
  };
}

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
    // Allow unused variables in destructuring when using rest elements (e.g. const { a, ...rest } = props)
    '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
    // Disable member ordering — CDK constructs commonly mix static methods and fields
    '@typescript-eslint/member-ordering': 'off',
    // Allow identical test titles across different describe blocks
    'jest/no-identical-title': 'off',
  });
  eslint.addOverride({
    files: ['*.test.ts'],
    rules: {
      'jest/expect-expect': 'off',
    },
  });
}

function dedupe<T>(items: T[]): T[] {
  const seen = new Set<T>();
  const out: T[] = [];
  for (const item of items) {
    if (seen.has(item)) continue;
    seen.add(item);
    out.push(item);
  }
  return out;
}

function omit<T extends object, K extends keyof T>(obj: T | undefined, keys: K[]): Omit<T, K> {
  if (!obj) return {} as Omit<T, K>;
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    if ((keys as string[]).includes(k)) continue;
    out[k] = v;
  }
  return out as Omit<T, K>;
}
