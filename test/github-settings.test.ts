import { Testing } from 'projen';
import { RocketleapLibraryCdkProject, RocketleapPlatformCdkProject, RocketleapWorkloadCdkProject } from '../src';

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
] as const)('%s project emits .github/settings.yml', (_name, factory) => {
  const snapshot = Testing.synth(factory());
  const raw = snapshot['.github/settings.yml'];

  it('emits the settings file', () => {
    expect(raw).toBeDefined();
  });

  it('mirrors the rocketleap -cdk repository defaults', () => {
    expect(raw).toContain('default_branch: dev');
    expect(raw).toContain('has_issues: false');
    expect(raw).toContain('has_projects: false');
    expect(raw).toContain('has_wiki: false');
    expect(raw).toContain('allow_squash_merge: true');
    expect(raw).toContain('allow_merge_commit: false');
    expect(raw).toContain('allow_rebase_merge: false');
    expect(raw).toContain('delete_branch_on_merge: true');
    expect(raw).toContain('allow_auto_merge: true');
    expect(raw).toContain('allow_update_branch: true');
    expect(raw).toContain('squash_merge_commit_title: COMMIT_OR_PR_TITLE');
    expect(raw).toContain('squash_merge_commit_message: COMMIT_MESSAGES');
  });

  it('emits the Development ruleset targeting the default branch', () => {
    expect(raw).toContain('name: Development');
    expect(raw).toContain('target: branch');
    expect(raw).toContain('enforcement: active');
    expect(raw).toContain('~DEFAULT_BRANCH');
    expect(raw).toContain('type: deletion');
    expect(raw).toContain('type: non_fast_forward');
    expect(raw).toContain('type: pull_request');
    expect(raw).toContain('type: required_status_checks');
    expect(raw).toContain('type: copilot_code_review');
    expect(raw).toContain('- squash');
    expect(raw).toContain('Build / build');
  });

  it('marks the emitted settings file as linguist-generated', () => {
    expect(snapshot['.gitattributes']).toMatch(/^\/\.github\/settings\.yml.*linguist-generated/m);
  });

  it('matches snapshot', () => {
    expect(raw).toMatchSnapshot();
  });
});
