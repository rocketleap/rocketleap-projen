import { Project } from 'projen';
import { synthSnapshot } from 'projen/lib/util/synth';
import {
  addActionBuildWorkflow,
  addActionDeployWorkflow,
  addActionDiffWorkflow,
  addActionSynthWorkflow,
  addCdkPipelineWorkflows,
  addPrMainWorkflow,
  addPushMainWorkflow,
} from '../src/common/workflows';

function newProject(): Project {
  return new Project({ name: 'test' });
}

describe('action-build.yml', () => {
  test('single build job: install → drift → format/lint/tsc/test → upload build-workspace', () => {
    const project = newProject();
    addActionBuildWorkflow(project);
    const build = synthSnapshot(project)['.github/workflows/action-build.yml'];
    expect(build).toBeDefined();
    expect(build).toContain('workflow_call:');
    expect(build).toContain('yarn test:ci');
    expect(build).toMatch(/node-version:\s*['"]?24['"]?/);
    // Uploads the whole workspace minus VCS + prior cdk.out so downstream
    // synth entries skip the reinstall + rebuild.
    expect(build).toContain('name: build-workspace');
    expect(build).toContain('!.git');
    expect(build).toContain('!cdk.out');
    // No synth here — synth lives at the entry-workflow level.
    expect(build).not.toContain('yarn synth');
    expect(build).not.toContain('matrix:');
  });

  test('projen drift check runs after install and before compile', () => {
    const project = newProject();
    addActionBuildWorkflow(project);
    const build = synthSnapshot(project)['.github/workflows/action-build.yml'];
    expect(build).toContain('git diff --exit-code');
    const verifyIdx = build.indexOf('name: projen');
    const yarnBuildIdx = build.indexOf('yarn build');
    const yarnInstallIdx = build.indexOf('- run: yarn\n');
    expect(yarnInstallIdx).toBeGreaterThan(-1);
    expect(verifyIdx).toBeGreaterThan(yarnInstallIdx);
    expect(verifyIdx).toBeLessThan(yarnBuildIdx);
  });
});

describe('action-deploy.yml', () => {
  test('installs, downloads per-env artifact, deploys via yarn run deploy:ci', () => {
    const project = newProject();
    addActionDeployWorkflow(project);
    const deploy = synthSnapshot(project)['.github/workflows/action-deploy.yml'];
    expect(deploy).toContain('actions/download-artifact@v4');
    expect(deploy).toContain('name: ${{ env.artifact_name }}');
    expect(deploy).toContain('role/CdkDeployRole');
    expect(deploy).toContain('yarn run deploy:ci "${{env.cdk_out_dir}}"');
    expect(deploy).toContain('- run: yarn\n');
  });

  test('deploy job binds the GH Environment directly to the `environment` input', () => {
    const project = newProject();
    addActionDeployWorkflow(project);
    const deploy = synthSnapshot(project)['.github/workflows/action-deploy.yml'];
    expect(deploy).not.toContain('gh-environment');
    expect(deploy).toContain('environment: ${{ inputs.environment }}');
  });
});

describe('action-diff.yml', () => {
  test('downloads per-env cdk.out and diffs with noSynth: true', () => {
    const project = newProject();
    addActionDiffWorkflow(project);
    const diff = synthSnapshot(project)['.github/workflows/action-diff.yml'];
    expect(diff).toContain('actions/download-artifact@v4');
    expect(diff).toContain('name: ${{ env.artifact_name }}');
    expect(diff).toContain('corymhall/cdk-diff-action@v2');
    expect(diff).toContain('failOnDestructiveChanges: "false"');
    expect(diff).toContain('cdkOutDir: ${{ env.cdk_out_dir }}');
    expect(diff).toContain('noSynth: "true"');
    expect(diff).not.toContain('yarn install');
    expect(diff).not.toContain('yarn build');
  });

  test('accepts failOnDestructiveChanges: true opt-in', () => {
    const project = newProject();
    addActionDiffWorkflow(project, { failOnDestructiveChanges: true });
    const diff = synthSnapshot(project)['.github/workflows/action-diff.yml'];
    expect(diff).toContain('failOnDestructiveChanges: "true"');
  });
});

describe('action-synth.yml', () => {
  test('reusable matrix workflow: fans out over stages, downloads build-workspace, uploads per-env cdk-out', () => {
    const project = newProject();
    addActionSynthWorkflow(project, [
      { environment: 'dev' },
      { environment: 'prodeu' },
      { environment: 'platform', workload: 'management' },
    ]);
    const synth = synthSnapshot(project)['.github/workflows/action-synth.yml'];
    expect(synth).toBeDefined();
    expect(synth).toContain('workflow_call:');
    expect(synth).toContain('matrix:');
    expect(synth).toContain('- environment: dev');
    expect(synth).toContain('- environment: prodeu');
    expect(synth).toContain('environment: platform');
    expect(synth).toContain('workload: management');
    expect(synth).toContain('name: build-workspace');
    expect(synth).toContain('yarn synth "${{ env.synth_arg }}"');
    expect(synth).toContain('artifact_name=cdk-out-$MATRIX_ENVIRONMENT');
    expect(synth).toContain('artifact_name=cdk-out-$MATRIX_ENVIRONMENT-$MATRIX_WORKLOAD');
  });

  test('empty stages throws', () => {
    const project = newProject();
    expect(() => addActionSynthWorkflow(project, [])).toThrow('at least one entry');
  });
});

describe('pr-main.yml', () => {
  test('build → synth (uses action-synth.yml, needs build) → per-stage diff (each needs synth)', () => {
    const project = newProject();
    addPrMainWorkflow(project, [{ environment: 'dev' }, { environment: 'prodeu' }]);
    const pr = synthSnapshot(project)['.github/workflows/pr-main.yml'];
    expect(pr).toContain('build:');
    expect(pr).toContain('synth:');
    expect(pr).toMatch(/synth:[\s\S]*?needs: build/);
    expect(pr).toMatch(/synth:[\s\S]*?uses: \.\/\.github\/workflows\/action-synth\.yml/);
    // synth's matrix is inside action-synth.yml, not inline in pr-main.
    expect(pr).not.toMatch(/synth:[\s\S]*?matrix:/);
    expect(pr).toContain('diff-dev-0:');
    expect(pr).toContain('diff-prodeu-1:');
    expect(pr).toMatch(/diff-dev-0:[\s\S]*?needs:\s*\n\s*- synth/);
    expect(pr).toMatch(/diff-prodeu-1:[\s\S]*?needs:\s*\n\s*- synth/);
  });

  test('empty stages throws', () => {
    const project = newProject();
    expect(() => addPrMainWorkflow(project, [])).toThrow('at least one entry');
  });
});

describe('push-main.yml', () => {
  test('deploy chain of distinct environments is fully sequential', () => {
    const project = newProject();
    addPushMainWorkflow(project, [
      { environment: 'dev' },
      { environment: 'staging' },
      { environment: 'prodeu' },
      { environment: 'produs' },
    ]);
    const push = synthSnapshot(project)['.github/workflows/push-main.yml'];
    expect(push).toContain('build:');
    expect(push).toContain('synth:');
    expect(push).toMatch(/synth:[\s\S]*?needs: build/);
    // Each single-stage group depends on the previous single-stage group.
    expect(push).toMatch(/deploy-dev-0:[\s\S]*?needs:\s*\n\s*- synth/);
    expect(push).toMatch(/deploy-staging-1:[\s\S]*?needs:\s*\n\s*- deploy-dev-0/);
    expect(push).toMatch(/deploy-prodeu-2:[\s\S]*?needs:\s*\n\s*- deploy-staging-1/);
    expect(push).toMatch(/deploy-produs-3:[\s\S]*?needs:\s*\n\s*- deploy-prodeu-2/);
  });

  test('consecutive same-environment stages deploy in parallel under one gate', () => {
    // dev → 5×platform (parallel) → prodeu → produs
    const project = newProject();
    addPushMainWorkflow(project, [
      { environment: 'dev', workload: 'example-ecs' },
      { environment: 'platform', workload: 'management' },
      { environment: 'platform', workload: 'security' },
      { environment: 'platform', workload: 'backup' },
      { environment: 'platform', workload: 'observability' },
      { environment: 'platform', workload: 'log-archive' },
      { environment: 'prodeu', workload: 'example-ecs' },
      { environment: 'produs', workload: 'example-ecs' },
    ]);
    const push = synthSnapshot(project)['.github/workflows/push-main.yml'];

    // dev is the first group → needs synth.
    expect(push).toMatch(/deploy-dev-example-ecs-0:[\s\S]*?needs:\s*\n\s*- synth/);

    // Every platform-* deploy has the SAME needs — the whole dev group
    // (which is just `deploy-dev-example-ecs-0`). No chaining between
    // the 5 platform deploys, so they run in parallel.
    const platformNeedsPattern = /deploy-platform-management-1:[\s\S]*?needs:\s*\n\s*- deploy-dev-example-ecs-0/;
    expect(push).toMatch(platformNeedsPattern);
    expect(push).toMatch(/deploy-platform-security-2:[\s\S]*?needs:\s*\n\s*- deploy-dev-example-ecs-0/);
    expect(push).toMatch(/deploy-platform-backup-3:[\s\S]*?needs:\s*\n\s*- deploy-dev-example-ecs-0/);
    expect(push).toMatch(/deploy-platform-observability-4:[\s\S]*?needs:\s*\n\s*- deploy-dev-example-ecs-0/);
    expect(push).toMatch(/deploy-platform-log-archive-5:[\s\S]*?needs:\s*\n\s*- deploy-dev-example-ecs-0/);

    // prodeu is the next group after platform → needs EVERY platform deploy.
    expect(push).toMatch(
      /deploy-prodeu-example-ecs-6:[\s\S]*?needs:\s*\n\s*- deploy-platform-management-1\s*\n\s*- deploy-platform-security-2\s*\n\s*- deploy-platform-backup-3\s*\n\s*- deploy-platform-observability-4\s*\n\s*- deploy-platform-log-archive-5/,
    );

    // produs is its own group after prodeu.
    expect(push).toMatch(/deploy-produs-example-ecs-7:[\s\S]*?needs:\s*\n\s*- deploy-prodeu-example-ecs-6/);
  });

  test('workload stages thread the workload input through', () => {
    const project = newProject();
    addPushMainWorkflow(project, [{ environment: 'dev', workload: 'example-ecs' }]);
    const push = synthSnapshot(project)['.github/workflows/push-main.yml'];
    expect(push).toContain('deploy-dev-example-ecs-0:');
    expect(push).toContain('workload: example-ecs');
  });

  test('empty stages throws', () => {
    const project = newProject();
    expect(() => addPushMainWorkflow(project, [])).toThrow('at least one entry');
  });
});

describe('addCdkPipelineWorkflows', () => {
  test('emits exactly six workflow files', () => {
    const project = newProject();
    addCdkPipelineWorkflows(project, { stages: [{ environment: 'iam' }] });
    const snapshot = synthSnapshot(project);
    expect(snapshot['.github/workflows/action-build.yml']).toBeDefined();
    expect(snapshot['.github/workflows/action-synth.yml']).toBeDefined();
    expect(snapshot['.github/workflows/action-deploy.yml']).toBeDefined();
    expect(snapshot['.github/workflows/action-diff.yml']).toBeDefined();
    expect(snapshot['.github/workflows/pr-main.yml']).toBeDefined();
    expect(snapshot['.github/workflows/push-main.yml']).toBeDefined();
    expect(snapshot['.github/workflows/action-promote-pr.yml']).toBeUndefined();
    expect(snapshot['.github/workflows/push-production.yml']).toBeUndefined();
    expect(snapshot['.github/workflows/pr-production.yml']).toBeUndefined();
  });

  test('cdkDiff.failOnDestructiveChanges: true flows through', () => {
    const project = newProject();
    addCdkPipelineWorkflows(project, {
      stages: [{ environment: 'iam' }],
      cdkDiff: { failOnDestructiveChanges: true },
    });
    const diff = synthSnapshot(project)['.github/workflows/action-diff.yml'];
    expect(diff).toContain('failOnDestructiveChanges: "true"');
  });

  test('empty stages throws', () => {
    const project = newProject();
    expect(() => addCdkPipelineWorkflows(project, { stages: [] })).toThrow('pipeline.stages');
  });

  test('same-environment workload stages get distinct deploy job ids', () => {
    const project = newProject();
    addCdkPipelineWorkflows(project, {
      stages: [
        { environment: 'dev', workload: 'example-ecs' },
        { environment: 'dev', workload: 'example-lambda' },
      ],
    });
    const push = synthSnapshot(project)['.github/workflows/push-main.yml'];
    expect(push).toContain('deploy-dev-example-ecs-0:');
    expect(push).toContain('deploy-dev-example-lambda-1:');
  });
});
