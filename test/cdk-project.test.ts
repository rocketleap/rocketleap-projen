import { Testing } from 'projen';
import { RocketleapPlatformCdkProject, RocketleapWorkloadCdkProject } from '../src';

test('Platform project does not generate src/main.ts or test/main.test.ts', () => {
  const project = new RocketleapPlatformCdkProject({
    company: 'test',
    project: 'test-cdk',
    pipeline: { stages: [{ environment: 'test' }] },
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
    pipeline: { stages: [{ environment: 'test' }] },
  });

  const snapshot = Testing.synth(project);
  expect(snapshot['src/main.ts']).toBeUndefined();
  expect(snapshot['test/main.test.ts']).toBeUndefined();
  expect(snapshot['.projenrc.ts']).toBeDefined();
});
