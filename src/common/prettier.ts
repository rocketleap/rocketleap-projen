import { javascript } from 'projen';
import { PrettierOptions } from 'projen/lib/javascript';

const DEFAULT_SETTINGS = {
  printWidth: 120,
  singleQuote: true,
  trailingComma: javascript.TrailingComma.ALL,
  semi: true,
  quoteProps: javascript.QuoteProps.CONSISTENT,
};

const DEFAULT_IGNORE_PATTERNS: string[] = [
  // Build artifacts
  '**/*.js',
  '**/*.d.ts',
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
  'LICENSE.md',
];

/**
 * Rocketleap Prettier configuration merged with any caller-supplied options.
 *
 * Merge rules:
 * - `settings` merges: caller wins on scalar collisions (e.g. `printWidth`).
 * - `ignoreFileOptions.ignorePatterns` concatenates (caller first, deduped).
 */
export function prettierConfig(userOptions?: PrettierOptions): { prettier: true; prettierOptions: PrettierOptions } {
  return {
    prettier: true,
    prettierOptions: {
      settings: {
        ...DEFAULT_SETTINGS,
        ...(userOptions?.settings ?? {}),
      },
      ignoreFileOptions: {
        ...(userOptions?.ignoreFileOptions ?? {}),
        ignorePatterns: dedupe([...(userOptions?.ignoreFileOptions?.ignorePatterns ?? []), ...DEFAULT_IGNORE_PATTERNS]),
      },
    },
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
