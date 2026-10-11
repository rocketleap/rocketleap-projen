import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { Testing } from 'projen';
import { RocketleapLibraryCdkProject } from '../src';

type PackageJson = {
  exports: Record<string, unknown>;
  typesVersions: Record<string, Record<string, string[]>>;
  main: string;
  types: string;
  files: string[];
};

function createLibraryProject(outdir: string): RocketleapLibraryCdkProject {
  return new RocketleapLibraryCdkProject({ company: 'test', project: 'test-lib', outdir });
}

describe('RocketleapLibraryCdkProject package.json exports', () => {
  test('emits one entry point per src module with an index.ts', () => {
    const outdir = mkdtempSync(join(tmpdir(), 'rocketleap-projen-exports-'));
    mkdirSync(join(outdir, 'src', 'kms'), { recursive: true });
    mkdirSync(join(outdir, 'src', 'dsql'), { recursive: true });
    mkdirSync(join(outdir, 'src', 'helpers'), { recursive: true });
    writeFileSync(join(outdir, 'src', 'kms', 'index.ts'), '');
    writeFileSync(join(outdir, 'src', 'dsql', 'index.ts'), '');
    writeFileSync(join(outdir, 'src', 'helpers', 'names.ts'), '');

    const pkg = Testing.synth(createLibraryProject(outdir))['package.json'] as PackageJson;

    expect(pkg.exports).toEqual({
      '.': { types: './dist/index.d.ts', default: './dist/index.js' },
      './dsql': { types: './dist/dsql/index.d.ts', default: './dist/dsql/index.js' },
      './kms': { types: './dist/kms/index.d.ts', default: './dist/kms/index.js' },
      './dist/*': { types: './dist/*/index.d.ts', default: './dist/*/index.js' },
      './dist/*.js': './dist/*.js',
      './package.json': './package.json',
    });
    expect(pkg.exports['./helpers']).toBeUndefined();
    expect(pkg.typesVersions).toEqual({
      '*': {
        dsql: ['dist/dsql/index.d.ts'],
        kms: ['dist/kms/index.d.ts'],
      },
    });
    expect(pkg.main).toBe('dist/index.js');
    expect(pkg.types).toBe('dist/index.d.ts');
    expect(pkg.files).toEqual(['API.md', 'dist/']);
  });

  test('emits only the static entries when src does not exist', () => {
    const outdir = mkdtempSync(join(tmpdir(), 'rocketleap-projen-exports-'));

    const pkg = Testing.synth(createLibraryProject(outdir))['package.json'] as PackageJson;

    expect(Object.keys(pkg.exports)).toEqual(['.', './dist/*', './dist/*.js', './package.json']);
    expect(pkg.typesVersions).toEqual({ '*': {} });
  });
});
