import { Project } from 'projen';
import { synthSnapshot } from 'projen/lib/util/synth';
import {
  addActionBuildWorkflow,
  addActionDeployWorkflow,
  addActionDiffWorkflow,
  addCdkPipelineWorkflows,
  addPrMainWorkflow,
  addPushMainWorkflow,
} from '../src/common/workflows';

function newProject(): Project {
  return new Project({ name: 'test' });
}

describe('action-build.yml', () => {
  test('runs install/lint/build/test then uploads the build-workspace artifact', () => {
    const project = newProject();
    addActionBuildWorkflow(project, [{ environment: 'dev' }]);
    const build = synthSnapshot(project)['.github/workflows/action-build.yml'];
    expect(build).toBeDefined();
    expect(build).toContain('workflow_call:');
    expect(build).toContain('yarn test:ci');
    expect(build).toMatch(/node-version:\s*['"]?24['"]?/);
    // build job uploads the workspace (minus .git + cdk.out) so downstream
    // matrix synth entries skip the reinstall + rebuild.
    expect(build).toContain('name: build-workspace');
    expect(build).toContain('!.git');
    expect(build).toContain('!cdk.out');
  });

  test('projen drift check runs after install and before compile', () => {
    const project = newProject();
    addActionBuildWorkflow(project, [{ environment: 'dev' }]);
    const build = synthSnapshot(project)['.github/workflows/action-build.yml'];
    expect(build).toContain('git diff --exit-code');
    const verifyIdx = build.indexOf('name: projen');
    const yarnBuildIdx = build.indexOf('yarn build');
    const yarnInstallIdx = build.indexOf('- run: yarn\n');
    expect(yarnInstallIdx).toBeGreaterThan(-1);
    expect(verifyIdx).toBeGreaterThan(yarnInstallIdx);
    expect(verifyIdx).toBeLessThan(yarnBuildIdx);
  });

  test('synth job matrix has one entry per stage and needs build', () => {
    const project = newProject();
    addActionBuildWorkflow(project, [
      { environment: 'dev' },
      { environment: 'prodeu' },
      { environment: 'platform', workload: 'management' },
    ]);
    const build = synthSnapshot(project)['.github/workflows/action-build.yml'];
    // synth is the second job inside action-build.yml; it needs `build`.
    expect(build).toMatch(/synth:[\s\S]*?needs: build/);
    expect(build).toContain('matrix:');
    expect(build).toContain('- environment: dev');
    expect(build).toContain('- environment: prodeu');
    expect(build).toContain('environment: platform');
    expect(build).toContain('workload: management');
  });

  test('synth downloads build-workspace, synths its matrix env, uploads per-env cdk.out artifact', () => {
    const project = newProject();
    addActionBuildWorkflow(project, [{ environment: 'dev' }, { environment: 'prod' }]);
    const build = synthSnapshot(project)['.github/workflows/action-build.yml'];
    // Downloads the build workspace from the earlier job — no reinstall/tsc.
    expect(build).toContain('name: build-workspace');
    // Per-env artifact naming is derived from the matrix entry.
    expect(build).toContain('artifact_name=cdk-out-$MATRIX_ENVIRONMENT');
    expect(build).toContain('artifact_name=cdk-out-$MATRIX_ENVIRONMENT-$MATRIX_WORKLOAD');
    expect(build).toContain('yarn synth "${{ env.synth_arg }}"');
    expect(build).toContain('name: ${{ env.artifact_name }}');
    expect(build).toContain('path: ${{ env.cdk_out_dir }}');
  });

  test('empty stages throws', () => {
    const project = newProject();
    expect(() => addActionBuildWorkflow(project, [])).toThrow('at least one entry');
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

describe('pr-main.yml', () => {
  test('build → per-stage diff (each diff needs build)', () => {
    const project = newProject();
    addPrMainWorkflow(project, [{ environment: 'dev' }, { environment: 'prodeu' }]);
    const pr = synthSnapshot(project)['.github/workflows/pr-main.yml'];
    expect(pr).toContain('build:');
    // No separate synth jobs at this level — synth runs inside action-build.
    expect(pr).not.toMatch(/synth-\w+-\d+:/);
    expect(pr).toContain('diff-dev-0:');
    expect(pr).toContain('diff-prodeu-1:');
    expect(pr).toMatch(/diff-dev-0:[\s\S]*?needs:\s*\n\s*- build/);
    expect(pr).toMatch(/diff-prodeu-1:[\s\S]*?needs:\s*\n\s*- build/);
  });

  test('empty stages throws', () => {
    const project = newProject();
    expect(() => addPrMainWorkflow(project, [])).toThrow('at least one entry');
  });
});

describe('push-main.yml', () => {
  test('build → sequential deploy chain, first deploy waits on build only', () => {
    const project = newProject();
    addPushMainWorkflow(project, [
      { environment: 'dev' },
      { environment: 'staging' },
      { environment: 'prodeu' },
      { environment: 'produs' },
    ]);
    const push = synthSnapshot(project)['.github/workflows/push-main.yml'];
    // No separate synth jobs at this level — synth runs inside action-build.
    expect(push).not.toMatch(/synth-\w+-\d+:/);
    // First deploy waits on build; each subsequent deploy waits on the
    // previous deploy — this is what serialises gated stages.
    expect(push).toMatch(/deploy-dev-0:[\s\S]*?needs:\s*\n\s*- build/);
    expect(push).toMatch(/deploy-staging-1:[\s\S]*?needs:\s*\n\s*- deploy-dev-0/);
    expect(push).toMatch(/deploy-prodeu-2:[\s\S]*?needs:\s*\n\s*- deploy-staging-1/);
    expect(push).toMatch(/deploy-produs-3:[\s\S]*?needs:\s*\n\s*- deploy-prodeu-2/);
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
  test('emits exactly five workflow files (no action-synth.yml)', () => {
    const project = newProject();
    addCdkPipelineWorkflows(project, { stages: [{ environment: 'iam' }] });
    const snapshot = synthSnapshot(project);
    expect(snapshot['.github/workflows/action-build.yml']).toBeDefined();
    expect(snapshot['.github/workflows/action-deploy.yml']).toBeDefined();
    expect(snapshot['.github/workflows/action-diff.yml']).toBeDefined();
    expect(snapshot['.github/workflows/pr-main.yml']).toBeDefined();
    expect(snapshot['.github/workflows/push-main.yml']).toBeDefined();
    // Retired workflows must not leak back in.
    expect(snapshot['.github/workflows/action-synth.yml']).toBeUndefined();
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
