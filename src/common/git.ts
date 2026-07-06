const DEFAULT_GITIGNORE: string[] = [
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
  // Negate src/logs/ so it is not caught by projen's default "logs" pattern
  '!/src/logs/',
];

/**
 * Rocketleap gitignore patterns, prefixed with any caller-supplied patterns.
 *
 * Caller patterns come first so a later negation (e.g. `!my-generated.js`) can
 * override a default (`*.js`) if the caller intends to.
 */
export function gitIgnore(userPatterns?: string[]): string[] {
  return dedupe([...(userPatterns ?? []), ...DEFAULT_GITIGNORE]);
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
