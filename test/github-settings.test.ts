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

  it('configures rocketleap repository defaults', () => {
    expect(raw).toContain('default_branch: main');
    expect(raw).toContain('allow_squash_merge: true');
    expect(raw).toContain('allow_merge_commit: false');
    expect(raw).toContain('allow_rebase_merge: false');
    expect(raw).toContain('delete_branch_on_merge: true');
    expect(raw).toContain('allow_auto_merge: true');
  });

  it('protects the default branch', () => {
    expect(raw).toContain('name: main');
    expect(raw).toContain('required_approving_review_count: 1');
    expect(raw).toContain('dismiss_stale_reviews: true');
    expect(raw).toContain('required_conversation_resolution: true');
    expect(raw).toContain('required_linear_history: true');
    expect(raw).toContain('allow_force_pushes: false');
    expect(raw).toContain('allow_deletions: false');
  });

  it('marks the emitted settings file as linguist-generated', () => {
    expect(snapshot['.gitattributes']).toMatch(/^\/\.github\/settings\.yml.*linguist-generated/m);
  });

  it('matches snapshot', () => {
    expect(raw).toMatchSnapshot();
  });
});
