import { synthSnapshot } from 'projen/lib/util/synth';
import {
  RocketleapLibraryCdkProject,
  RocketleapPlatformCdkProject,
  RocketleapWorkloadCdkProject,
} from '../src/cdk-project';

const minimalPipeline = {
  deployMain: [{ environment: 'dev' }],
};

describe('RocketleapWorkloadCdkProject .gitignore emission', () => {
  test('user-supplied patterns appear alongside Rocketleap defaults', () => {
    const project = new RocketleapWorkloadCdkProject({
      company: 'acme',
      project: 'my-app',
      gitignore: ['.venv/', 'pyproject.toml.bak'],
      pipeline: minimalPipeline,
    });

    const snap = synthSnapshot(project);
    const gitignore = snap['.gitignore'];

    expect(gitignore).toContain('.venv/');
    expect(gitignore).toContain('pyproject.toml.bak');
    expect(gitignore).toContain('cdk.out');
    expect(gitignore).toContain('.claude/');
  });

  test('omitting gitignore still emits Rocketleap defaults', () => {
    const project = new RocketleapWorkloadCdkProject({
      company: 'acme',
      project: 'my-app',
      pipeline: minimalPipeline,
    });

    const gitignore = synthSnapshot(project)['.gitignore'];
    expect(gitignore).toContain('cdk.out');
    expect(gitignore).toContain('.claude/');
  });
});

describe('RocketleapPlatformCdkProject .gitignore emission', () => {
  test('user-supplied patterns appear alongside Rocketleap defaults', () => {
    const project = new RocketleapPlatformCdkProject({
      company: 'rocketleap',
      project: 'root-cdk',
      gitignore: ['custom-platform-artifact/'],
      pipeline: minimalPipeline,
    });

    const gitignore = synthSnapshot(project)['.gitignore'];
    expect(gitignore).toContain('custom-platform-artifact/');
    expect(gitignore).toContain('cdk.out');
  });
});

describe('RocketleapLibraryCdkProject .gitignore emission', () => {
  test('user-supplied patterns appear alongside Rocketleap defaults', () => {
    const project = new RocketleapLibraryCdkProject({
      company: 'rocketleap',
      project: 'building-blocks-cdk',
      gitignore: ['generated-docs/'],
    });

    const gitignore = synthSnapshot(project)['.gitignore'];
    expect(gitignore).toContain('generated-docs/');
    expect(gitignore).toContain('cdk.out');
  });
});
