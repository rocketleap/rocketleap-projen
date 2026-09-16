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

test('deploy/diff/destroy scripts accept multiple stack args after the stage', () => {
  const project = new RocketleapPlatformCdkProject({
    company: 'test',
    project: 'test-cdk',
    pipeline: { stages: [{ environment: 'test' }] },
  });

  const scripts = (Testing.synth(project)['package.json'] as unknown as { scripts: Record<string, string> }).scripts;

  // Each script consumes the first arg as the stage, then forwards
  // remaining args verbatim to cdk. The `shift; ... ${*:...}` pattern is
  // the portable-shell way to do that in yarn scripts.
  expect(scripts.deploy).toMatch(/STAGE="\$0"; shift; cdk deploy .*\$\{\*:---all\}/);
  expect(scripts.diff).toMatch(/STAGE="\$0"; shift; cdk diff .*\$\{\*:-\}/);
  expect(scripts.destroy).toMatch(/STAGE="\$0"; shift; cdk destroy --ci -f .*\$\{\*:---all\}/);
});

test('caller `context` is merged into cdk.json alongside crossStackReferences', () => {
  const project = new RocketleapPlatformCdkProject({
    company: 'test',
    project: 'test-cdk',
    pipeline: { stages: [{ environment: 'test' }] },
    context: {
      '@aws-cdk/aws-lambda:useCdkManagedLogGroup': false,
      'customKey': 'customValue',
    },
  });

  const cdkJson = Testing.synth(project)['cdk.json'] as Record<string, Record<string, unknown>>;
  expect(cdkJson.context['@aws-cdk/aws-lambda:useCdkManagedLogGroup']).toBe(false);
  expect(cdkJson.context.customKey).toBe('customValue');
  expect(cdkJson.context['@aws-cdk/core:defaultCrossStackReferences']).toBeDefined();
});
