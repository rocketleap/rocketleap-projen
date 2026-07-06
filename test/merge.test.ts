import { LOCKED_KEYS, mergeProjectOptions } from '../src/common/merge';

/* eslint-disable @typescript-eslint/no-explicit-any */
type AnyOptions = Record<string, any>;
/* eslint-enable @typescript-eslint/no-explicit-any */

function merge(user: AnyOptions, defaults: AnyOptions): AnyOptions {
  return mergeProjectOptions<AnyOptions, AnyOptions>(user, defaults);
}

describe('mergeProjectOptions', () => {
  test('user gitignore is concatenated with defaults, deduped', () => {
    const merged = merge({ gitignore: ['*.pyc', 'venv'] }, { gitignore: ['dist/', 'venv'] });
    expect(merged.gitignore).toEqual(['*.pyc', 'venv', 'dist/']);
  });

  test('user eslintOptions.ignorePatterns extends defaults', () => {
    const merged = merge(
      { eslintOptions: { ignorePatterns: ['generated-python/'] } },
      { eslintOptions: { ignorePatterns: ['dist/', 'lib/'], prettier: true } },
    );
    expect(merged.eslintOptions.ignorePatterns).toEqual(['generated-python/', 'dist/', 'lib/']);
    expect(merged.eslintOptions.prettier).toBe(true);
  });

  test('user scalars win on collision in nested plain objects', () => {
    const merged = merge(
      { prettierOptions: { settings: { printWidth: 100 } } },
      { prettierOptions: { settings: { printWidth: 120, singleQuote: true } } },
    );
    expect(merged.prettierOptions.settings).toEqual({ printWidth: 100, singleQuote: true });
  });

  test('user tsconfig compilerOptions merge with defaults, user wins on scalar', () => {
    const merged = merge(
      { tsconfig: { compilerOptions: { strict: false, target: 'ES2020' } } },
      { tsconfig: { compilerOptions: { strict: true, target: 'ES2022', alwaysStrict: true } } },
    );
    expect(merged.tsconfig.compilerOptions).toEqual({
      strict: false,
      target: 'ES2020',
      alwaysStrict: true,
    });
  });

  test('user context is merged with default context', () => {
    const merged = merge({ context: { 'my:flag': 'a' } }, { context: { 'aws:enabled': true } });
    expect(merged.context).toEqual({ 'my:flag': 'a', 'aws:enabled': true });
  });

  test('user buildCommand is preserved', () => {
    const merged = merge({ buildCommand: 'poetry build' }, {});
    expect(merged.buildCommand).toBe('poetry build');
  });

  test('LOCKED_KEYS: user cannot override defaultReleaseBranch', () => {
    expect(LOCKED_KEYS.has('defaultReleaseBranch')).toBe(true);
    const merged = merge({ defaultReleaseBranch: 'trunk' }, { defaultReleaseBranch: 'main' });
    expect(merged.defaultReleaseBranch).toBe('main');
  });

  test('githubOptions merge but mergify/workflows stay locked', () => {
    const merged = merge(
      { githubOptions: { mergify: true, workflows: true, projenCredentials: 'x' } },
      { githubOptions: { mergify: false, workflows: false } },
    );
    expect(merged.githubOptions.mergify).toBe(false);
    expect(merged.githubOptions.workflows).toBe(false);
    expect(merged.githubOptions.projenCredentials).toBe('x');
  });

  test('scalar defaults survive when user omits the key', () => {
    const merged = merge({}, { cdkVersion: '2.248.0' });
    expect(merged.cdkVersion).toBe('2.248.0');
  });

  test('class instance is treated as scalar (user wins)', () => {
    class FeatureFlags {
      constructor(public readonly source: string) {}
    }
    const userFlags = new FeatureFlags('user');
    const defaultFlags = new FeatureFlags('default');
    const merged = merge({ featureFlags: userFlags }, { featureFlags: defaultFlags });
    expect(merged.featureFlags).toBe(userFlags);
  });

  test('user jestOptions.jestConfig fields survive alongside SWC transform default', () => {
    const merged = merge(
      { jestOptions: { jestConfig: { setupFiles: ['./setup.ts'] } } },
      { jestOptions: { jestConfig: { transform: { '^.+\\.tsx?$': 'swc' } } } },
    );
    expect(merged.jestOptions.jestConfig).toEqual({
      setupFiles: ['./setup.ts'],
      transform: { '^.+\\.tsx?$': 'swc' },
    });
  });
});
