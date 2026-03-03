import { Testing } from 'projen';
import { RocketleapPlatformCdkProject } from '../src';

test('cdk.json acknowledges S3 access logs policy warning', () => {
  const project = new RocketleapPlatformCdkProject({
    company: 'testcompany',
    project: 'test-cdk',
  });

  const snapshot = Testing.synth(project);
  const cdkJson = snapshot['cdk.json'];

  expect(cdkJson.context['@aws-cdk/aws-s3:accessLogsPolicyNotAdded']).toBe(true);
});

test('cdk.json disables version reporting', () => {
  const project = new RocketleapPlatformCdkProject({
    company: 'testcompany',
    project: 'test-cdk',
  });

  const snapshot = Testing.synth(project);
  const cdkJson = snapshot['cdk.json'];

  expect(cdkJson.versionReporting).toBe(false);
});
