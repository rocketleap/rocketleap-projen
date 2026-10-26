import { Testing } from 'projen';
import { RocketleapLibraryCdkProject, RocketleapPlatformCdkProject, RocketleapWorkloadCdkProject } from '../src';

const EXPECTED_GENERATED_PATHS = [
  '/.github/dependabot.yml',
  '/.github/workflows/action-build.yml',
  '/.github/workflows/action-synth.yml',
  '/.github/workflows/action-deploy.yml',
  '/.github/workflows/action-diff.yml',
  '/.github/workflows/pr-main.yml',
  '/.github/workflows/push-main.yml',
  '/LICENSE.md',
];

describe.each([
  [
    'Platform',
    () =>
      new RocketleapPlatformCdkProject({
        company: 'test',
        project: 'test-cdk',
        pipeline: { stages: [{ environment: 'test' }] },
      }),
  ],
  [
    'Workload',
    () =>
      new RocketleapWorkloadCdkProject({
        company: 'test',
        project: 'test-cdk',
        pipeline: { stages: [{ environment: 'test' }] },
      }),
  ],
  [
    'Library',
    () =>
      new RocketleapLibraryCdkProject({
        company: 'test',
        project: 'test-cdk',
      }),
  ],
] as const)('%s project marks template-emitted files as linguist-generated', (_name, factory) => {
  const snapshot = Testing.synth(factory());
  const gitattributes = snapshot['.gitattributes'];

  it('emits .gitattributes', () => {
    expect(gitattributes).toBeDefined();
  });

  it.each(EXPECTED_GENERATED_PATHS)('marks %s as linguist-generated', (path) => {
    expect(gitattributes).toMatch(new RegExp(`^${path.replace(/[.*/]/g, '\\$&')}.*linguist-generated`, 'm'));
  });
});
