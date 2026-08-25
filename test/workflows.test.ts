import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
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
  validatePipelineStagesAgainstBin,
} from '../src/common/workflows';

function newProject(): Project {
  return new Project({ name: 'test' });
}

describe('action-build.yml', () => {
  test('install → drift check → format/lint/tsc/test → upload build-workspace (excluding node_modules)', () => {
    const project = newProject();
    addActionBuildWorkflow(project);
    const build = synthSnapshot(project)['.github/workflows/action-build.yml'];
    expect(build).toContain('workflow_call:');
    expect(build).toContain('yarn test:ci');
    expect(build).toMatch(/node-version:\s*['"]?24['"]?/);
    expect(build).toContain('name: build-workspace');
    // The node_modules exclusion is the whole reason synth reinstalls.
    expect(build).toContain('!node_modules');
    expect(build).toContain('!.git');
    expect(build).toContain('!cdk.out');
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

describe('action-synth.yml', () => {
  test('single-stage reusable: downloads build-workspace, reinstalls, synths, uploads per-env cdk-out', () => {
    const project = newProject();
    addActionSynthWorkflow(project);
    const synth = synthSnapshot(project)['.github/workflows/action-synth.yml'];
    expect(synth).toContain('workflow_call:');
    expect(synth).toMatch(/environment:\s*\n\s*type: string\s*\n\s*required: true/);
    expect(synth).toMatch(/workload:\s*\n\s*type: string\s*\n\s*required: false/);
    expect(synth).not.toContain('matrix:');
    expect(synth).toContain('name: build-workspace');
    // Reinstall preserves executable bits on native binaries that
    // upload-artifact drops.
    expect(synth).toContain('- run: yarn\n');
    expect(synth).toContain('cdk_out_dir=cdk.out/${{inputs.environment}}');
    expect(synth).toContain('artifact_name=cdk-out-${{inputs.environment}}');
    expect(synth).toContain('name: ${{ env.artifact_name }}');
    expect(synth).toContain('path: ${{ env.cdk_out_dir }}');
  });
});

describe('action-deploy.yml', () => {
  test('installs, downloads per-env cdk.out artifact, deploys via yarn run deploy:ci', () => {
    const project = newProject();
    addActionDeployWorkflow(project);
    const deploy = synthSnapshot(project)['.github/workflows/action-deploy.yml'];
    expect(deploy).toContain('actions/download-artifact@v4');
    expect(deploy).toContain('name: ${{ env.artifact_name }}');
    expect(deploy).toContain('role/CdkDeployRole');
    expect(deploy).toContain('yarn run deploy:ci "${{env.cdk_out_dir}}"');
    expect(deploy).toContain('- run: yarn\n');
  });

  test("deploy job does NOT bind a GitHub Environment — the caller's gate job owns it", () => {
    const project = newProject();
    addActionDeployWorkflow(project);
    const deploy = synthSnapshot(project)['.github/workflows/action-deploy.yml'];
    // The `environment` input is used only for CDK bin selection here.
    // The GH Environment approval sits on push-main.yml's `gate-<env>` job.
    expect(deploy).not.toMatch(/^\s+environment: \$\{\{ inputs\.environment \}\}/m);
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
    // Diff runs against the pre-synthed assembly; no install/build needed.
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
  test('build → synth (matrix) → per-stage diff (each needs synth)', () => {
    const project = newProject();
    addPrMainWorkflow(project, [{ environment: 'dev' }, { environment: 'prodeu', workload: 'example-ecs' }]);
    const pr = synthSnapshot(project)['.github/workflows/pr-main.yml'];
    expect(pr).toMatch(/^\s*synth:\s*$/m);
    expect(pr).toMatch(/synth:[\s\S]*?needs: build/);
    expect(pr).toMatch(/synth:[\s\S]*?uses: \.\/\.github\/workflows\/action-synth\.yml/);
    expect(pr).toMatch(/synth:[\s\S]*?matrix:\s*\n\s*stage:/);
    expect(pr).toContain('- environment: dev');
    expect(pr).toContain('environment: prodeu');
    expect(pr).toContain('workload: example-ecs');
    expect(pr).toMatch(/diff-dev-0:[\s\S]*?needs:\s*\n\s*- synth\n/);
    expect(pr).toMatch(/diff-prodeu-example-ecs-1:[\s\S]*?needs:\s*\n\s*- synth\n/);
  });

  test('empty stages throws', () => {
    const project = newProject();
    expect(() => addPrMainWorkflow(project, [])).toThrow('at least one entry');
  });

  test('cancels superseded runs via a per-ref concurrency group', () => {
    const project = newProject();
    addPrMainWorkflow(project, [{ environment: 'dev' }]);
    const pr = synthSnapshot(project)['.github/workflows/pr-main.yml'];
    expect(pr).toMatch(/concurrency:[\s\S]*?group: pr-main-\$\{\{ github\.ref \}\}/);
    expect(pr).toMatch(/concurrency:[\s\S]*?cancel-in-progress: true/);
  });

  test('synth matrix is fail-fast on PR builds to avoid wasting minutes on siblings once one stage breaks', () => {
    const project = newProject();
    addPrMainWorkflow(project, [{ environment: 'dev' }, { environment: 'prodeu' }]);
    const pr = synthSnapshot(project)['.github/workflows/pr-main.yml'];
    expect(pr).toMatch(/synth:[\s\S]*?strategy:[\s\S]*?fail-fast: true/);
  });
});

describe('push-main.yml', () => {
  test('deploy chain of distinct environments — one gate per group; deploys sit behind their gate', () => {
    const project = newProject();
    addPushMainWorkflow(project, [
      { environment: 'dev' },
      { environment: 'staging' },
      { environment: 'prodeu' },
      { environment: 'produs' },
    ]);
    const push = synthSnapshot(project)['.github/workflows/push-main.yml'];
    expect(push).toMatch(/^\s*synth:\s*$/m);
    expect(push).toMatch(/synth:[\s\S]*?needs: build/);

    // Each env gets one gate job with `environment: <env>` — the single approval point.
    expect(push).toMatch(/gate-dev-0:[\s\S]*?environment: dev/);
    expect(push).toMatch(/gate-staging-1:[\s\S]*?environment: staging/);
    expect(push).toMatch(/gate-prodeu-2:[\s\S]*?environment: prodeu/);
    expect(push).toMatch(/gate-produs-3:[\s\S]*?environment: produs/);

    // First gate needs synth; each subsequent gate needs the previous group's deploys.
    expect(push).toMatch(/gate-dev-0:[\s\S]*?needs:\s*\n\s*- synth\n/);
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

    // One gate job per env group. `platform` group has 5 deploys but only
    // ONE gate → approve once, all 5 unlock.
    expect(push).toMatch(/gate-dev-0:[\s\S]*?environment: dev/);
    expect(push).toMatch(/gate-platform-1:[\s\S]*?environment: platform/);
    expect(push).toMatch(/gate-prodeu-6:[\s\S]*?environment: prodeu/);
    expect(push).toMatch(/gate-produs-7:[\s\S]*?environment: produs/);
    // No second platform gate — the 5 platform stages share `gate-platform-1`.
    expect(push).not.toMatch(/gate-platform-[2-9]/);

    // Gate needs: first is synth; platform gate waits on dev's deploy;
    // prodeu gate waits on ALL platform deploys (fan-in); produs waits on prodeu.
    expect(push).toMatch(/gate-dev-0:[\s\S]*?needs:\s*\n\s*- synth\n/);
    expect(push).toMatch(/gate-platform-1:[\s\S]*?needs:\s*\n\s*- deploy-dev-example-ecs-0/);
    expect(push).toMatch(
      /gate-prodeu-6:[\s\S]*?needs:\s*\n\s*- deploy-platform-management-1\s*\n\s*- deploy-platform-security-2\s*\n\s*- deploy-platform-backup-3\s*\n\s*- deploy-platform-observability-4\s*\n\s*- deploy-platform-log-archive-5/,
    );
    expect(push).toMatch(/gate-produs-7:[\s\S]*?needs:\s*\n\s*- deploy-prodeu-example-ecs-6/);

    // All 5 platform deploys share the SAME needs — just `gate-platform-1`.
    // They start in parallel the moment the single platform approval lands.
    expect(push).toMatch(/deploy-platform-management-1:[\s\S]*?needs:\s*\n\s*- gate-platform-1/);
    expect(push).toMatch(/deploy-platform-security-2:[\s\S]*?needs:\s*\n\s*- gate-platform-1/);
    expect(push).toMatch(/deploy-platform-log-archive-5:[\s\S]*?needs:\s*\n\s*- gate-platform-1/);
  });

  test('empty stages throws', () => {
    const project = newProject();
    expect(() => addPushMainWorkflow(project, [])).toThrow('at least one entry');
  });

  test('synth matrix is fail-fast: false on push so a broken stage still surfaces sibling breakage on main', () => {
    const project = newProject();
    addPushMainWorkflow(project, [{ environment: 'dev' }, { environment: 'prodeu' }]);
    const push = synthSnapshot(project)['.github/workflows/push-main.yml'];
    expect(push).toMatch(/synth:[\s\S]*?strategy:[\s\S]*?fail-fast: false/);
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
    // No legacy production-branch workflows.
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
});

describe('validatePipelineStagesAgainstBin', () => {
  function scaffold(files: string[]): string {
    const dir = mkdtempSync(join(tmpdir(), 'rocketleap-projen-bin-'));
    const binDir = join(dir, 'bin');
    mkdirSync(binDir, { recursive: true });
    for (const rel of files) {
      const full = join(binDir, rel);
      mkdirSync(join(full, '..'), { recursive: true });
      writeFileSync(full, '// stub\n');
    }
    return binDir;
  }

  test('no bin dir is a no-op (fresh project pre-scaffold)', () => {
    const missing = join(tmpdir(), `rocketleap-projen-bin-missing-${process.pid}-${Date.now()}`);
    expect(() =>
      validatePipelineStagesAgainstBin(missing, [{ environment: 'iam' }, { environment: 'dev', workload: 'api' }]),
    ).not.toThrow();
  });

  test('all stages match all bin files: no throw', () => {
    const binDir = scaffold(['iam.ts', 'dev/api.ts', 'dev/worker.ts']);
    expect(() =>
      validatePipelineStagesAgainstBin(binDir, [
        { environment: 'iam' },
        { environment: 'dev', workload: 'api' },
        { environment: 'dev', workload: 'worker' },
      ]),
    ).not.toThrow();
  });

  test('bin file with no matching stage: reported as orphan', () => {
    const binDir = scaffold(['iam.ts', 'dev/api.ts', 'dev/renovation.ts']);
    expect(() =>
      validatePipelineStagesAgainstBin(binDir, [{ environment: 'iam' }, { environment: 'dev', workload: 'api' }]),
    ).toThrow(/bin\/dev\/renovation\.ts/);
  });

  test('stage with no matching bin file: reported as missing', () => {
    const binDir = scaffold(['iam.ts']);
    expect(() =>
      validatePipelineStagesAgainstBin(binDir, [{ environment: 'iam' }, { environment: 'dev', workload: 'api' }]),
    ).toThrow(/bin\/dev\/api\.ts/);
  });

  test('reports orphan bin files AND missing stage bin files together', () => {
    const binDir = scaffold(['iam.ts', 'dev/renovation.ts']);
    let err: Error | undefined;
    try {
      validatePipelineStagesAgainstBin(binDir, [{ environment: 'iam' }, { environment: 'dev', workload: 'api' }]);
    } catch (e) {
      err = e as Error;
    }
    expect(err).toBeDefined();
    expect(err!.message).toContain('bin/dev/renovation.ts');
    expect(err!.message).toContain('bin/dev/api.ts');
    expect(err!.message).toContain('no matching stage');
    expect(err!.message).toContain('no matching bin/ file');
  });

  test('non-.ts files and dotfiles under bin/ are ignored', () => {
    const binDir = scaffold(['iam.ts', 'dev/api.ts', 'README.md', '.gitkeep', 'dev/.keep', 'dev/notes.md']);
    expect(() =>
      validatePipelineStagesAgainstBin(binDir, [{ environment: 'iam' }, { environment: 'dev', workload: 'api' }]),
    ).not.toThrow();
  });

  test('addCdkPipelineWorkflows throws on drift when bin/ is present', () => {
    const project = newProject();
    const binDir = join(project.outdir, 'bin');
    mkdirSync(join(binDir, 'dev'), { recursive: true });
    writeFileSync(join(binDir, 'iam.ts'), '// stub\n');
    writeFileSync(join(binDir, 'dev', 'renovation.ts'), '// stub\n');

    expect(() =>
      addCdkPipelineWorkflows(project, {
        stages: [{ environment: 'iam' }],
      }),
    ).toThrow(/bin\/dev\/renovation\.ts/);
  });
});
