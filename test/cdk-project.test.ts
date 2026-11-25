import { Testing } from 'projen';
import { CrossStackReferences, RocketleapPlatformCdkProject, RocketleapWorkloadCdkProject } from '../src';
import { PROMOTION_REQUIRED_MESSAGE } from '../src/common/workflows';

test('Platform project does not generate src/main.ts or test/main.test.ts', () => {
  const project = new RocketleapPlatformCdkProject({
    company: 'test',
    project: 'test-cdk',
    pipeline: { stages: [{ environment: 'test' }, { environment: 'prod', promotion: true }] },
  });

  const snapshot = Testing.synth(project);
  expect(snapshot['src/main.ts']).toBeUndefined();
  expect(snapshot['test/main.test.ts']).toBeUndefined();
  expect(snapshot['.projenrc.ts']).toBeDefined();
});

test('Workload project does not generate src/main.ts or test/main.test.ts', () => {
  const project = new RocketleapWorkloadCdkProject({
    company: 'test',
    project: 'test-cdk',
    pipeline: { stages: [{ environment: 'test' }, { environment: 'prod', promotion: true }] },
  });

  const snapshot = Testing.synth(project);
  expect(snapshot['src/main.ts']).toBeUndefined();
  expect(snapshot['test/main.test.ts']).toBeUndefined();
  expect(snapshot['.projenrc.ts']).toBeDefined();
});

test('caller `context` is merged into cdk.json alongside crossStackReferences', () => {
  const project = new RocketleapPlatformCdkProject({
    company: 'test',
    project: 'test-cdk',
    pipeline: { stages: [{ environment: 'test' }, { environment: 'prod', promotion: true }] },
    context: {
      '@aws-cdk/aws-lambda:useCdkManagedLogGroup': false,
      'customKey': 'customValue',
    },
  });

  const cdkJson = Testing.synth(project)['cdk.json'] as Record<string, Record<string, unknown>>;
  expect(cdkJson.context['@aws-cdk/aws-lambda:useCdkManagedLogGroup']).toBe(false);
  expect(cdkJson.context.customKey).toBe('customValue');
  expect(cdkJson.context['@aws-cdk/core:defaultCrossStackReferences']).toBe('strong');
});

test.each([
  [undefined, 'strong'],
  [CrossStackReferences.STRONG, 'strong'],
  [CrossStackReferences.WEAK, 'weak'],
  [CrossStackReferences.BOTH, 'both'],
])('crossStackReferences %s writes %s into cdk.json', (crossStackReferences, expected) => {
  const project = new RocketleapPlatformCdkProject({
    company: 'test',
    project: 'test-cdk',
    pipeline: { stages: [{ environment: 'test' }, { environment: 'prod', promotion: true }] },
    crossStackReferences,
  });

  const cdkJson = Testing.synth(project)['cdk.json'] as Record<string, Record<string, unknown>>;
  expect(cdkJson.context['@aws-cdk/core:defaultCrossStackReferences']).toBe(expected);
});

test('a stages-only pipeline fails at construction with the migration message', () => {
  expect(
    () =>
      new RocketleapPlatformCdkProject({
        company: 'test',
        project: 'test-cdk',
        pipeline: { stages: [{ environment: 'test' }] },
      }),
  ).toThrow(PROMOTION_REQUIRED_MESSAGE);
});
