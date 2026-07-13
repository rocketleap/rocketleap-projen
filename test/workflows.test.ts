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

describe('pr-main.yml', () => {
  test('build → synth (matrix, needs build) → per-stage diff (each needs synth)', () => {
    const project = newProject();
    addPrMainWorkflow(project, [{ environment: 'dev' }, { environment: 'prodeu' }]);
    const pr = synthSnapshot(project)['.github/workflows/pr-main.yml'];
    expect(pr).toContain('build:');
    // synth is a single matrix job.
    expect(pr).toContain('synth:');
    expect(pr).toMatch(/synth:[\s\S]*?needs: build/);
    expect(pr).toMatch(/synth:[\s\S]*?matrix:\s*\n\s*stage:/);
    expect(pr).toContain('- environment: dev');
    expect(pr).toContain('- environment: prodeu');
    // Diff jobs need synth (all matrix entries done → every artifact ready).
    expect(pr).toContain('diff-dev-0:');
    expect(pr).toContain('diff-prodeu-1:');
    expect(pr).toMatch(/diff-dev-0:[\s\S]*?needs:\s*\n\s*- synth/);
    expect(pr).toMatch(/diff-prodeu-1:[\s\S]*?needs:\s*\n\s*- synth/);
  });

  test('synth job downloads build-workspace and uploads per-env cdk-out artifacts', () => {
    const project = newProject();
    addPrMainWorkflow(project, [{ environment: 'dev' }]);
    const pr = synthSnapshot(project)['.github/workflows/pr-main.yml'];
    expect(pr).toContain('name: build-workspace');
    expect(pr).toContain('yarn synth "${{ env.synth_arg }}"');
    expect(pr).toContain('artifact_name=cdk-out-$MATRIX_ENVIRONMENT');
    expect(pr).toContain('artifact_name=cdk-out-$MATRIX_ENVIRONMENT-$MATRIX_WORKLOAD');
  });

  test('empty stages throws', () => {
    const project = newProject();
    expect(() => addPrMainWorkflow(project, [])).toThrow('at least one entry');
  });
});

describe('push-main.yml', () => {
  test('build → synth → sequential deploy chain', () => {
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
    // First deploy waits on synth (all synths done → every artifact ready).
    expect(push).toMatch(/deploy-dev-0:[\s\S]*?needs:\s*\n\s*- synth/);
    // Chain — subsequent deploys wait on previous deploy, so a gated stage
    // pauses the whole promotion.
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
    // The matrix entry threads workload through too.
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
