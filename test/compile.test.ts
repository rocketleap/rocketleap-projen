import { synthSnapshot } from 'projen/lib/util/synth';
import {
  RocketleapLibraryCdkProject,
  RocketleapPlatformCdkProject,
  RocketleapWorkloadCdkProject,
} from '../src/cdk-project';

const minimalPipeline = {
  stages: [{ environment: 'dev' }, { environment: 'prod', promotion: true }],
};

type PackageJson = { jest: Record<string, unknown> };

describe.each([
  [
    'RocketleapPlatformCdkProject',
    () => new RocketleapPlatformCdkProject({ company: 'acme', project: 'x-cdk', pipeline: minimalPipeline }),
  ],
  [
    'RocketleapWorkloadCdkProject',
    () => new RocketleapWorkloadCdkProject({ company: 'acme', project: 'x-cdk', pipeline: minimalPipeline }),
  ],
  ['RocketleapLibraryCdkProject', () => new RocketleapLibraryCdkProject({ company: 'acme', project: 'blocks' })],
])('%s Jest configuration', (_name, create) => {
  const pkg = synthSnapshot(create())['package.json'] as PackageJson;

  test('resolves .ts before .js and ignores compiled output directories', () => {
    expect(pkg.jest.moduleFileExtensions).toEqual(['ts', 'tsx', 'js', 'mjs', 'cjs', 'json', 'node']);
    expect(pkg.jest.modulePathIgnorePatterns).toEqual(['<rootDir>/dist/', '<rootDir>/lib/']);
  });
});
