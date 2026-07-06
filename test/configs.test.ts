import { cdkConfig } from '../src/common/cdk';
import { compileConfig, libraryCompileConfig, swcConfig } from '../src/common/compile';
import { eslintConfig } from '../src/common/eslint';
import { gitIgnore } from '../src/common/git';
import { prettierConfig } from '../src/common/prettier';
import { yarnConfig } from '../src/common/yarn';

describe('gitIgnore', () => {
  test('returns the Rocketleap defaults when no user patterns are supplied', () => {
    const result = gitIgnore();
    expect(result).toContain('cdk.out');
    expect(result).toContain('.claude/');
  });

  test('user patterns come first and are deduped', () => {
    const result = gitIgnore(['.venv/', 'cdk.out']);
    expect(result[0]).toBe('.venv/');
    expect(result.filter((p) => p === 'cdk.out')).toHaveLength(1);
  });
});

describe('eslintConfig', () => {
  test('defaults enable eslint + prettier', () => {
    const { eslint, eslintOptions } = eslintConfig();
    expect(eslint).toBe(true);
    expect(eslintOptions.prettier).toBe(true);
    expect(eslintOptions.dirs).toEqual(['src']);
    expect(eslintOptions.ignorePatterns).toContain('*.generated.ts');
  });

  test('user ignorePatterns extend defaults, user dirs extend defaults', () => {
    const { eslintOptions } = eslintConfig({ ignorePatterns: ['python/'], dirs: ['bin'] });
    expect(eslintOptions.ignorePatterns).toEqual(expect.arrayContaining(['python/', '*.generated.ts']));
    expect(eslintOptions.dirs).toEqual(['bin', 'src']);
  });

  test('user can disable prettier', () => {
    const { eslintOptions } = eslintConfig({ prettier: false });
    expect(eslintOptions.prettier).toBe(false);
  });
});

describe('prettierConfig', () => {
  test('caller printWidth wins over default', () => {
    const { prettierOptions } = prettierConfig({ settings: { printWidth: 100 } as never });
    expect(prettierOptions.settings!.printWidth).toBe(100);
    expect(prettierOptions.settings!.singleQuote).toBe(true);
  });

  test('caller ignorePatterns extend defaults', () => {
    const { prettierOptions } = prettierConfig({
      ignoreFileOptions: { ignorePatterns: ['python/'] },
    });
    expect(prettierOptions.ignoreFileOptions!.ignorePatterns).toEqual(expect.arrayContaining(['python/', 'cdk.json']));
  });
});

describe('compileConfig', () => {
  test('caller compilerOptions win on scalar collision, defaults survive', () => {
    const { tsconfig } = compileConfig({ compilerOptions: { strict: false, target: 'ES2020' } });
    expect(tsconfig.compilerOptions!.strict).toBe(false);
    expect(tsconfig.compilerOptions!.target).toBe('ES2020');
    expect(tsconfig.compilerOptions!.alwaysStrict).toBe(true);
  });

  test('caller include is prepended and deduped', () => {
    const { tsconfig } = compileConfig({ include: ['generated/**/*.ts', 'src/**/*.ts'] });
    expect(tsconfig.include).toEqual(['generated/**/*.ts', 'src/**/*.ts', 'bin/**/*ts']);
  });
});

describe('libraryCompileConfig', () => {
  test('library rootDir/outDir defaults survive when user omits them', () => {
    const { tsconfig } = libraryCompileConfig();
    expect(tsconfig.compilerOptions!.rootDir).toBe('src');
    expect(tsconfig.compilerOptions!.outDir).toBe('dist');
  });
});

describe('swcConfig', () => {
  test('user jestConfig fields survive alongside swc transform', () => {
    const { jestOptions } = swcConfig({ jestConfig: { setupFiles: ['./setup.ts'] } });
    expect(jestOptions.jestConfig!.setupFiles).toEqual(['./setup.ts']);
    expect(Object.keys(jestOptions.jestConfig!.transform as object)).toContain('^.+\\.[t]sx?$');
  });

  test('user can override the swc transform pattern', () => {
    const { jestOptions } = swcConfig({ jestConfig: { transform: { '^.+\\.[t]sx?$': 'my-transform' } as never } });
    expect((jestOptions.jestConfig!.transform as Record<string, unknown>)['^.+\\.[t]sx?$']).toBe('my-transform');
  });
});

describe('cdkConfig', () => {
  test('defaults produce feature flags and empty context', () => {
    const config = cdkConfig();
    expect(config.featureFlags).toBeDefined();
    expect(config.context).toEqual({});
  });

  test('user context is included', () => {
    const config = cdkConfig(undefined, { 'my:flag': true });
    expect(config.context).toEqual({ 'my:flag': true });
  });
});

describe('yarnConfig', () => {
  test('company scope is added to npmScopes', () => {
    const { yarnBerryOptions } = yarnConfig('acme');
    expect(yarnBerryOptions.yarnRcOptions!.npmScopes).toHaveProperty('acme');
  });

  test('user npmScopes are preserved alongside company scope', () => {
    const { yarnBerryOptions } = yarnConfig('acme', {
      yarnRcOptions: {
        npmScopes: { partner: { npmRegistryServer: 'https://partner.example/' } },
      } as never,
    });
    const scopes = yarnBerryOptions.yarnRcOptions!.npmScopes!;
    expect(scopes).toHaveProperty('acme');
    expect(scopes).toHaveProperty('partner');
  });
});
