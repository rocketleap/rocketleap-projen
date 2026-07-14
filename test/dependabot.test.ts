import { Testing } from 'projen';
import { RocketleapLibraryCdkProject, RocketleapPlatformCdkProject, RocketleapWorkloadCdkProject } from '../src';

test('Workload project auto-generates .github/dependabot.yml', () => {
  const project = new RocketleapWorkloadCdkProject({
    company: 'test',
    project: 'test-cdk',
    pipeline: { stages: [{ environment: 'test' }] },
  });

  const snapshot = Testing.synth(project);
  const yaml = snapshot['.github/dependabot.yml'];
  expect(yaml).toBeDefined();
  expect(yaml).toMatchSnapshot();
});

test('Platform project does NOT auto-generate dependabot config', () => {
  const project = new RocketleapPlatformCdkProject({
    company: 'test',
    project: 'test-cdk',
    pipeline: { stages: [{ environment: 'test' }] },
  });

  const snapshot = Testing.synth(project);
  expect(snapshot['.github/dependabot.yml']).toBeUndefined();
});

test('Library project does NOT auto-generate dependabot config', () => {
  const project = new RocketleapLibraryCdkProject({
    company: 'test',
    project: 'test-cdk',
  });

  const snapshot = Testing.synth(project);
  expect(snapshot['.github/dependabot.yml']).toBeUndefined();
});
