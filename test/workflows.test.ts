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
  test('emits the standard build steps', () => {
    const project = newProject();
    addActionBuildWorkflow(project, [{ environment: 'iam' }]);
    const build = synthSnapshot(project)['.github/workflows/action-build.yml'];
    expect(build).toBeDefined();
    expect(build).toContain('workflow_call:');
    expect(build).toContain('yarn test:ci');
    expect(build).toContain('actions/checkout@v6');
    expect(build).toContain('actions/setup-node@v6');
    // Node 24 is the current active LTS; Node 18 is EOL (April 2025).
    expect(build).toMatch(/node-version:\s*['"]?24['"]?/);
    expect(build).not.toMatch(/node-version:\s*['"]?18['"]?/);
  });

  test('verifies projen synth is a no-op before build', () => {
    const project = newProject();
    addActionBuildWorkflow(project, [{ environment: 'iam' }]);
    const build = synthSnapshot(project)['.github/workflows/action-build.yml'];
    expect(build).toContain('name: projen');
    expect(build).toContain('npx projen');
    expect(build).toContain('git diff --exit-code');
    const verifyIdx = build.indexOf('name: projen');
    const yarnBuildIdx = build.indexOf('yarn build');
    const yarnInstallIdx = build.indexOf('- run: yarn\n');
    expect(yarnInstallIdx).toBeGreaterThan(-1);
    expect(verifyIdx).toBeGreaterThan(yarnInstallIdx);
    expect(verifyIdx).toBeLessThan(yarnBuildIdx);
  });

  test('synths every stage in parallel and uploads cdk.out as an artifact', () => {
    const project = newProject();
    addActionBuildWorkflow(project, [
      { environment: 'dev' },
      { environment: 'prodeu', gated: true },
      { environment: 'produs', gated: true },
    ]);
    const build = synthSnapshot(project)['.github/workflows/action-build.yml'];
    expect(build).toContain('yarn synth dev & pids+=($!)');
    expect(build).toContain('yarn synth prodeu & pids+=($!)');
    expect(build).toContain('yarn synth produs & pids+=($!)');
    // Failure propagation — a failing background synth must fail the step.
    expect(build).toContain('wait "$pid" || fail=1');
    expect(build).toContain('exit "$fail"');
    expect(build).toContain('actions/upload-artifact@v4');
    expect(build).toContain('name: cdk-out');
    expect(build).toContain('path: cdk.out/');
    // Synth must happen after build/test so a failing test blocks synth+upload.
    const testIdx = build.indexOf('yarn test:ci');
    const synthIdx = build.indexOf('Synth all stages in parallel');
    const uploadIdx = build.indexOf('Upload cdk.out');
    expect(testIdx).toBeGreaterThan(-1);
    expect(synthIdx).toBeGreaterThan(testIdx);
    expect(uploadIdx).toBeGreaterThan(synthIdx);
  });

  test('workload stages synth into the env/workload subdirectory', () => {
    const project = newProject();
    addActionBuildWorkflow(project, [{ environment: 'dev', workload: 'example-ecs' }]);
    const build = synthSnapshot(project)['.github/workflows/action-build.yml'];
    expect(build).toContain('yarn synth dev/example-ecs & pids+=($!)');
  });

  test('empty stages throws', () => {
    const project = newProject();
    expect(() => addActionBuildWorkflow(project, [])).toThrow('at least one entry');
  });
});

describe('action-deploy.yml', () => {
  test('downloads cdk.out, skips install/build, and deploys against the pre-synthed assembly', () => {
    const project = newProject();
    addActionDeployWorkflow(project);
    const deploy = synthSnapshot(project)['.github/workflows/action-deploy.yml'];
    expect(deploy).toContain('actions/download-artifact@v4');
    expect(deploy).toContain('name: cdk-out');
    expect(deploy).toContain('role/CdkDeployRole');
    expect(deploy).toContain('npx cdk deploy');
    expect(deploy).toContain('--app "${{env.cdk_out_dir}}"');
    // No re-install or re-build in the deploy path — that's the whole point.
    expect(deploy).not.toContain('yarn install');
    expect(deploy).not.toContain('yarn build');
    expect(deploy).not.toContain('yarn run deploy:ci');
  });

  test('exposes gh-environment input and binds the job environment to it', () => {
    const project = newProject();
    addActionDeployWorkflow(project);
    const deploy = synthSnapshot(project)['.github/workflows/action-deploy.yml'];
    expect(deploy).toContain('gh-environment:');
    expect(deploy).toContain('environment: ${{ inputs.gh-environment }}');
  });
});

describe('action-diff.yml', () => {
  test('downloads cdk.out and runs cdk-diff-action against the pre-synthed assembly', () => {
    const project = newProject();
    addActionDiffWorkflow(project);
    const diff = synthSnapshot(project)['.github/workflows/action-diff.yml'];
    expect(diff).toContain('actions/download-artifact@v4');
    expect(diff).toContain('name: cdk-out');
    expect(diff).toContain('corymhall/cdk-diff-action@v2');
    expect(diff).toContain('title: ${{ inputs.job-name }}');
    expect(diff).toContain('failOnDestructiveChanges: "false"');
    expect(diff).toContain('cdkOutDir: ${{ env.cdk_out_dir }}');
    expect(diff).toContain('noSynth: "true"');
    expect(diff).not.toContain('yarn install');
    expect(diff).not.toContain('yarn build');
    expect(diff).not.toContain('yarn synth:ci');
  });

  test('accepts failOnDestructiveChanges: true opt-in', () => {
    const project = newProject();
    addActionDiffWorkflow(project, { failOnDestructiveChanges: true });
    const diff = synthSnapshot(project)['.github/workflows/action-diff.yml'];
    expect(diff).toContain('failOnDestructiveChanges: "true"');
  });
});

describe('pr-main.yml', () => {
  test('single-stage collapses to a non-matrix diff job', () => {
    const project = newProject();
    addPrMainWorkflow(project, [{ environment: 'iam' }]);
    const pr = synthSnapshot(project)['.github/workflows/pr-main.yml'];
    expect(pr).toContain('environment: iam');
    expect(pr).not.toContain('strategy:');
  });

  test('multi-stage uses strategy.matrix', () => {
    const project = newProject();
    addPrMainWorkflow(project, [
      { environment: 'dev', workload: 'example-ecs' },
      { environment: 'prodeu', workload: 'example-ecs' },
    ]);
    const pr = synthSnapshot(project)['.github/workflows/pr-main.yml'];
    expect(pr).toContain('strategy:');
    expect(pr).toContain('workloads:');
    expect(pr).toContain('example-ecs');
  });

  test('empty stages throws', () => {
    const project = newProject();
    expect(() => addPrMainWorkflow(project, [])).toThrow('at least one entry');
  });
});

describe('push-main.yml', () => {
  test('build → sequential deploy chain', () => {
    const project = newProject();
    addPushMainWorkflow(project, [
      { environment: 'dev' },
      { environment: 'staging' },
      { environment: 'prodeu', gated: true },
      { environment: 'produs', gated: true },
    ]);
    const push = synthSnapshot(project)['.github/workflows/push-main.yml'];
    // First deploy depends on build; each subsequent deploy depends on the previous one.
    expect(push).toMatch(/deploy-dev-0:[\s\S]*?needs:\s*\n\s*- build/);
    expect(push).toMatch(/deploy-staging-1:[\s\S]*?needs:\s*\n\s*- deploy-dev-0/);
    expect(push).toMatch(/deploy-prodeu-2:[\s\S]*?needs:\s*\n\s*- deploy-staging-1/);
    expect(push).toMatch(/deploy-produs-3:[\s\S]*?needs:\s*\n\s*- deploy-prodeu-2/);
  });

  test('gated stages carry gh-environment; ungated stages do not', () => {
    const project = newProject();
    addPushMainWorkflow(project, [{ environment: 'dev' }, { environment: 'prodeu', gated: true }]);
    const push = synthSnapshot(project)['.github/workflows/push-main.yml'];
    // dev block: no gh-environment
    const devBlock = push.slice(push.indexOf('deploy-dev-0:'), push.indexOf('deploy-prodeu-1:'));
    expect(devBlock).not.toContain('gh-environment');
    // prodeu block: gh-environment set to the env name
    const prodBlock = push.slice(push.indexOf('deploy-prodeu-1:'));
    expect(prodBlock).toContain('gh-environment: prodeu');
  });

  test('workload stages thread the workload input through', () => {
    const project = newProject();
    addPushMainWorkflow(project, [{ environment: 'dev', workload: 'example-ecs' }]);
    const push = synthSnapshot(project)['.github/workflows/push-main.yml'];
    expect(push).toContain('workload: example-ecs');
  });

  test('empty stages throws', () => {
    const project = newProject();
    expect(() => addPushMainWorkflow(project, [])).toThrow('at least one entry');
  });
});

describe('addCdkPipelineWorkflows', () => {
  test('emits exactly the five files that make up the pipeline', () => {
    const project = newProject();
    addCdkPipelineWorkflows(project, { stages: [{ environment: 'iam' }] });
    const snapshot = synthSnapshot(project);
    expect(snapshot['.github/workflows/action-build.yml']).toBeDefined();
    expect(snapshot['.github/workflows/action-deploy.yml']).toBeDefined();
    expect(snapshot['.github/workflows/action-diff.yml']).toBeDefined();
    expect(snapshot['.github/workflows/pr-main.yml']).toBeDefined();
    expect(snapshot['.github/workflows/push-main.yml']).toBeDefined();
    // The retired GitOps-production workflow set must not leak back in.
    expect(snapshot['.github/workflows/action-promote-pr.yml']).toBeUndefined();
    expect(snapshot['.github/workflows/push-production.yml']).toBeUndefined();
    expect(snapshot['.github/workflows/pr-production.yml']).toBeUndefined();
  });

  test('promotes through the ordered stages with gates on prod', () => {
    const project = newProject();
    addCdkPipelineWorkflows(project, {
      stages: [
        { environment: 'dev' },
        { environment: 'staging' },
        { environment: 'prodeu', gated: true },
        { environment: 'produs', gated: true },
      ],
    });
    const push = synthSnapshot(project)['.github/workflows/push-main.yml'];
    expect(push).toContain('gh-environment: prodeu');
    expect(push).toContain('gh-environment: produs');
    // The chain is sequential — produs (last) depends on prodeu.
    expect(push).toMatch(/deploy-produs-3:[\s\S]*?needs:\s*\n\s*- deploy-prodeu-2/);
  });

  test('empty stages throws', () => {
    const project = newProject();
    expect(() => addCdkPipelineWorkflows(project, { stages: [] })).toThrow('pipeline.stages');
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

  test('same-environment workload stages get distinct job ids', () => {
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
