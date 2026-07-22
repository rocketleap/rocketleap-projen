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

const ACC = '111111111111';
const REG = 'eu-west-1';

function newProject(): Project {
  return new Project({ name: 'test' });
}

describe('action-build.yml', () => {
  test('install → drift check → format/lint/tsc/test → tar+upload build-workspace', () => {
    const project = newProject();
    addActionBuildWorkflow(project);
    const build = synthSnapshot(project)['.github/workflows/action-build.yml'];
    expect(build).toContain('workflow_call:');
    expect(build).toContain('yarn test:ci');
    expect(build).toMatch(/node-version:\s*['"]?24['"]?/);
    expect(build).toContain('name: build-workspace');
    // node_modules is now INCLUDED (tar preserves execute bits) so downstream
    // jobs can skip `yarn install`. Only .git and cdk.out are excluded from the tar.
    expect(build).toContain('build-workspace.tar.gz');
    expect(build).toContain('--exclude=./.git');
    expect(build).toContain('--exclude=./cdk.out');
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
  test('unpacks workspace, assumes CdkDeployRole (account+region inputs), synths, deploys', () => {
    const project = newProject();
    addActionDeployWorkflow(project);
    const deploy = synthSnapshot(project)['.github/workflows/action-deploy.yml'];
    expect(deploy).toContain('name: build-workspace');
    expect(deploy).toContain('tar -xzf build-workspace.tar.gz');
    expect(deploy).toContain('role-to-assume: arn:aws:iam::${{ inputs.account }}:role/CdkDeployRole');
    expect(deploy).toContain('aws-region: ${{ inputs.region }}');
    // Synth runs AFTER credentials are configured.
    const credsIdx = deploy.indexOf('Configure AWS credentials');
    const synthIdx = deploy.indexOf('yarn synth');
    const deployIdx = deploy.indexOf('yarn run deploy:ci');
    expect(credsIdx).toBeGreaterThan(-1);
    expect(synthIdx).toBeGreaterThan(credsIdx);
    expect(deployIdx).toBeGreaterThan(synthIdx);
    // No reinstall — workspace already ships node_modules.
    expect(deploy).not.toContain('- run: yarn\n');
  });

  test('accepts account + region inputs', () => {
    const project = newProject();
    addActionDeployWorkflow(project);
    const deploy = synthSnapshot(project)['.github/workflows/action-deploy.yml'];
    expect(deploy).toMatch(/account:\s*\n\s*type: string\s*\n\s*required: true/);
    expect(deploy).toMatch(/region:\s*\n\s*type: string\s*\n\s*required: true/);
  });

  test("deploy job does NOT bind a GitHub Environment — the caller's gate job owns it", () => {
    const project = newProject();
    addActionDeployWorkflow(project);
    const deploy = synthSnapshot(project)['.github/workflows/action-deploy.yml'];
    expect(deploy).not.toMatch(/^\s+environment: \$\{\{ inputs\.environment \}\}/m);
  });
});

describe('action-diff.yml', () => {
  test('unpacks workspace, assumes CdkDeployRole, synths, diffs with noSynth: true', () => {
    const project = newProject();
    addActionDiffWorkflow(project);
    const diff = synthSnapshot(project)['.github/workflows/action-diff.yml'];
    expect(diff).toContain('name: build-workspace');
    expect(diff).toContain('tar -xzf build-workspace.tar.gz');
    expect(diff).toContain('role-to-assume: arn:aws:iam::${{ inputs.account }}:role/CdkDeployRole');
    expect(diff).toContain('corymhall/cdk-diff-action@v2');
    expect(diff).toContain('failOnDestructiveChanges: "false"');
    expect(diff).toContain('noSynth: "true"');
    // Synth runs AFTER credentials are configured, before cdk-diff-action.
    const credsIdx = diff.indexOf('Configure AWS credentials');
    const synthIdx = diff.indexOf('yarn synth');
    const diffIdx = diff.indexOf('corymhall/cdk-diff-action@v2');
    expect(synthIdx).toBeGreaterThan(credsIdx);
    expect(diffIdx).toBeGreaterThan(synthIdx);
  });

  test('accepts failOnDestructiveChanges: true opt-in', () => {
    const project = newProject();
    addActionDiffWorkflow(project, { failOnDestructiveChanges: true });
    const diff = synthSnapshot(project)['.github/workflows/action-diff.yml'];
    expect(diff).toContain('failOnDestructiveChanges: "true"');
  });
});

describe('pr-main.yml', () => {
  test('build → per-stage diff (each diff needs build directly; no synth matrix)', () => {
    const project = newProject();
    addPrMainWorkflow(project, [
      { environment: 'dev', account: ACC, region: REG },
      { environment: 'prodeu', workload: 'example-ecs', account: ACC, region: REG },
    ]);
    const pr = synthSnapshot(project)['.github/workflows/pr-main.yml'];
    // No shared synth job any more.
    expect(pr).not.toMatch(/^\s*synth:\s*$/m);
    expect(pr).not.toContain('action-synth.yml');
    // Diffs depend directly on build.
    expect(pr).toMatch(/diff-dev-0:[\s\S]*?needs:\s*\n\s*- build\n/);
    expect(pr).toMatch(/diff-prodeu-example-ecs-1:[\s\S]*?needs:\s*\n\s*- build\n/);
    // Diff jobs pass account + region through.
    expect(pr).toContain(`account: "${ACC}"`);
    expect(pr).toContain(`region: ${REG}`);
  });

  test('empty stages throws', () => {
    const project = newProject();
    expect(() => addPrMainWorkflow(project, [])).toThrow('at least one entry');
  });

  test('cancels superseded runs via a per-ref concurrency group', () => {
    const project = newProject();
    addPrMainWorkflow(project, [{ environment: 'dev', account: ACC, region: REG }]);
    const pr = synthSnapshot(project)['.github/workflows/pr-main.yml'];
    expect(pr).toMatch(/concurrency:[\s\S]*?group: pr-main-\$\{\{ github\.ref \}\}/);
    expect(pr).toMatch(/concurrency:[\s\S]*?cancel-in-progress: true/);
  });
});

describe('push-main.yml', () => {
  test('deploy chain of distinct environments — one gate per group; deploys sit behind their gate', () => {
    const project = newProject();
    addPushMainWorkflow(project, [
      { environment: 'dev', account: ACC, region: REG },
      { environment: 'staging', account: ACC, region: REG },
      { environment: 'prodeu', account: ACC, region: REG },
      { environment: 'produs', account: ACC, region: REG },
    ]);
    const push = synthSnapshot(project)['.github/workflows/push-main.yml'];
    // No shared synth job.
    expect(push).not.toMatch(/^\s*synth:\s*$/m);

    // Each env gets one gate job with `environment: <env>` — the single approval point.
    expect(push).toMatch(/gate-dev-0:[\s\S]*?environment: dev/);
    expect(push).toMatch(/gate-staging-1:[\s\S]*?environment: staging/);
    expect(push).toMatch(/gate-prodeu-2:[\s\S]*?environment: prodeu/);
    expect(push).toMatch(/gate-produs-3:[\s\S]*?environment: produs/);

    // First gate needs build directly; each subsequent gate needs the previous group's deploys.
    expect(push).toMatch(/gate-dev-0:[\s\S]*?needs:\s*\n\s*- build\n/);
    expect(push).toMatch(/gate-staging-1:[\s\S]*?needs:\s*\n\s*- deploy-dev-0/);
    expect(push).toMatch(/gate-prodeu-2:[\s\S]*?needs:\s*\n\s*- deploy-staging-1/);
    expect(push).toMatch(/gate-produs-3:[\s\S]*?needs:\s*\n\s*- deploy-prodeu-2/);

    // Deploy jobs need ONLY their gate (no environment on the deploy itself).
    expect(push).toMatch(/deploy-dev-0:[\s\S]*?needs:\s*\n\s*- gate-dev-0/);
    expect(push).toMatch(/deploy-staging-1:[\s\S]*?needs:\s*\n\s*- gate-staging-1/);
    expect(push).toMatch(/deploy-prodeu-2:[\s\S]*?needs:\s*\n\s*- gate-prodeu-2/);
    expect(push).toMatch(/deploy-produs-3:[\s\S]*?needs:\s*\n\s*- gate-produs-3/);
  });

  test('consecutive same-environment stages deploy in parallel under one gate', () => {
    const project = newProject();
    addPushMainWorkflow(project, [
      { environment: 'dev', workload: 'example-ecs', account: ACC, region: REG },
      { environment: 'platform', workload: 'management', account: ACC, region: REG },
      { environment: 'platform', workload: 'security', account: ACC, region: REG },
      { environment: 'platform', workload: 'backup', account: ACC, region: REG },
      { environment: 'platform', workload: 'observability', account: ACC, region: REG },
      { environment: 'platform', workload: 'log-archive', account: ACC, region: REG },
      { environment: 'prodeu', workload: 'example-ecs', account: ACC, region: REG },
      { environment: 'produs', workload: 'example-ecs', account: ACC, region: REG },
    ]);
    const push = synthSnapshot(project)['.github/workflows/push-main.yml'];

    expect(push).toMatch(/gate-dev-0:[\s\S]*?environment: dev/);
    expect(push).toMatch(/gate-platform-1:[\s\S]*?environment: platform/);
    expect(push).toMatch(/gate-prodeu-6:[\s\S]*?environment: prodeu/);
    expect(push).toMatch(/gate-produs-7:[\s\S]*?environment: produs/);
    expect(push).not.toMatch(/gate-platform-[2-9]/);

    // First gate needs build directly; platform gate waits on dev's deploy.
    expect(push).toMatch(/gate-dev-0:[\s\S]*?needs:\s*\n\s*- build\n/);
    expect(push).toMatch(/gate-platform-1:[\s\S]*?needs:\s*\n\s*- deploy-dev-example-ecs-0/);
    expect(push).toMatch(
      /gate-prodeu-6:[\s\S]*?needs:\s*\n\s*- deploy-platform-management-1\s*\n\s*- deploy-platform-security-2\s*\n\s*- deploy-platform-backup-3\s*\n\s*- deploy-platform-observability-4\s*\n\s*- deploy-platform-log-archive-5/,
    );
    expect(push).toMatch(/gate-produs-7:[\s\S]*?needs:\s*\n\s*- deploy-prodeu-example-ecs-6/);

    expect(push).toMatch(/deploy-platform-management-1:[\s\S]*?needs:\s*\n\s*- gate-platform-1/);
    expect(push).toMatch(/deploy-platform-security-2:[\s\S]*?needs:\s*\n\s*- gate-platform-1/);
    expect(push).toMatch(/deploy-platform-log-archive-5:[\s\S]*?needs:\s*\n\s*- gate-platform-1/);
  });

  test('empty stages throws', () => {
    const project = newProject();
    expect(() => addPushMainWorkflow(project, [])).toThrow('at least one entry');
  });
});

describe('addCdkPipelineWorkflows', () => {
  test('emits exactly five workflow files (no more action-synth.yml)', () => {
    const project = newProject();
    addCdkPipelineWorkflows(project, { stages: [{ environment: 'iam', account: ACC, region: REG }] });
    const snapshot = synthSnapshot(project);
    expect(snapshot['.github/workflows/action-build.yml']).toBeDefined();
    expect(snapshot['.github/workflows/action-synth.yml']).toBeUndefined();
    expect(snapshot['.github/workflows/action-deploy.yml']).toBeDefined();
    expect(snapshot['.github/workflows/action-diff.yml']).toBeDefined();
    expect(snapshot['.github/workflows/pr-main.yml']).toBeDefined();
    expect(snapshot['.github/workflows/push-main.yml']).toBeDefined();
    // No legacy production-branch workflows.
    expect(snapshot['.github/workflows/action-promote-pr.yml']).toBeUndefined();
    expect(snapshot['.github/workflows/push-production.yml']).toBeUndefined();
    expect(snapshot['.github/workflows/pr-production.yml']).toBeUndefined();
  });

  test('cdkDiff.failOnDestructiveChanges: true flows through', () => {
    const project = newProject();
    addCdkPipelineWorkflows(project, {
      stages: [{ environment: 'iam', account: ACC, region: REG }],
      cdkDiff: { failOnDestructiveChanges: true },
    });
    const diff = synthSnapshot(project)['.github/workflows/action-diff.yml'];
    expect(diff).toContain('failOnDestructiveChanges: "true"');
  });

  test('empty stages throws', () => {
    const project = newProject();
    expect(() => addCdkPipelineWorkflows(project, { stages: [] })).toThrow('pipeline.stages');
  });
});
