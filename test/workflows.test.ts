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
  PipelineCheck,
  PipelineOptions,
  PromotionStrategy,
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

  test('concurrency group is prefixed so stage=main does not collide with push-main workflow-level `main` group', () => {
    const project = newProject();
    addActionDeployWorkflow(project);
    const deploy = synthSnapshot(project)['.github/workflows/action-deploy.yml'];
    expect(deploy).toContain('concurrency: deploy-${{inputs.environment}}${{inputs.workload}}');
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

  test('no trigger type filter and no draft guard, so a push to an open PR re-runs CI', () => {
    const project = newProject();
    addPrMainWorkflow(project, [{ environment: 'dev' }]);
    const pr = synthSnapshot(project)['.github/workflows/pr-main.yml'];
    // Omitting `types` means GitHub's default set, which includes `synchronize`,
    // so a follow-up commit on a reviewed PR is covered by CI.
    expect(pr).not.toMatch(/types:/);
    expect(pr).not.toMatch(/pull_request\.draft/);
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

describe('pipeline.additionalChecks', () => {
  const pythonCheck: PipelineCheck = {
    id: 'build-python',
    name: 'Build Python',
    uses: './.github/workflows/action-build-python.yml',
  };

  function synthBoth(checks: PipelineCheck[] = [pythonCheck]) {
    const project = newProject();
    addCdkPipelineWorkflows(project, { stages: [{ environment: 'governance' }], additionalChecks: checks });
    const snapshot = synthSnapshot(project);
    return {
      pr: snapshot['.github/workflows/pr-main.yml'],
      push: snapshot['.github/workflows/push-main.yml'],
    };
  }

  test('emits the check as a sibling of build in both entry workflows', () => {
    const { pr, push } = synthBoth();
    for (const workflow of [pr, push]) {
      expect(workflow).toMatch(/^\s{2}build-python:\s*$/m);
      expect(workflow).toMatch(/build-python:[\s\S]*?name: Build Python/);
      expect(workflow).toMatch(/build-python:[\s\S]*?uses: \.\/\.github\/workflows\/action-build-python\.yml/);
    }
  });

  test('synth gates on the check, so a Python failure blocks diff and every deploy', () => {
    const { pr, push } = synthBoth();
    for (const workflow of [pr, push]) {
      expect(workflow).toMatch(/synth:[\s\S]*?needs:\s*\n\s*- build\s*\n\s*- build-python/);
    }
    // PR diff and push gate hang off synth, so the gate is transitive.
    expect(pr).toMatch(/diff-governance-0:[\s\S]*?needs:\s*\n\s*- synth/);
    expect(push).toMatch(/gate-governance-0:[\s\S]*?needs:\s*\n\s*- synth/);
  });

  test('the reusable workflow file itself is not generated — the repo owns it', () => {
    const project = newProject();
    addCdkPipelineWorkflows(project, {
      stages: [{ environment: 'governance' }],
      additionalChecks: [pythonCheck],
    });
    expect(synthSnapshot(project)['.github/workflows/action-build-python.yml']).toBeUndefined();
  });

  test('projects that declare no checks keep the plain `needs: build` string', () => {
    const project = newProject();
    addCdkPipelineWorkflows(project, { stages: [{ environment: 'iam' }] });
    const snapshot = synthSnapshot(project);
    expect(snapshot['.github/workflows/pr-main.yml']).toMatch(/synth:[\s\S]*?needs: build/);
    expect(snapshot['.github/workflows/push-main.yml']).toMatch(/synth:[\s\S]*?needs: build/);
    expect(snapshot['.github/workflows/pr-main.yml']).not.toContain('build-python');
  });

  test('multiple checks all gate synth', () => {
    const { pr } = synthBoth([
      pythonCheck,
      { id: 'contract', name: 'Contract', uses: './.github/workflows/action-contract.yml' },
    ]);
    expect(pr).toMatch(/synth:[\s\S]*?needs:\s*\n\s*- build\s*\n\s*- build-python\s*\n\s*- contract/);
  });

  test('a workflow published in another repo is emitted as given', () => {
    const { pr, push } = synthBoth([
      {
        id: 'scan',
        name: 'Scan',
        uses: 'rocketleap/rocketleap-projen-internal/.github/workflows/action-scan.yml@v1',
      },
    ]);
    for (const workflow of [pr, push]) {
      expect(workflow).toContain('uses: rocketleap/rocketleap-projen-internal/.github/workflows/action-scan.yml@v1');
      expect(workflow).toMatch(/synth:[\s\S]*?needs:\s*\n\s*- build\s*\n\s*- scan/);
    }
  });

  test('inputs are passed through to the called workflow', () => {
    const { pr } = synthBoth([{ ...pythonCheck, with: { 'python-version': '3.13' } }]);
    expect(pr).toMatch(/build-python:[\s\S]*?with:\s*\n\s*python-version: ['"]?3\.13['"]?/);
  });

  test('a check without inputs emits no with block', () => {
    const { pr } = synthBoth();
    expect(pr).toMatch(/build-python:\s*\n\s*name: Build Python\s*\n\s*uses: [^\n]+\n\s{2}synth:/);
  });
});

describe('pipeline.promotionStrategy', () => {
  const prStrategy: PipelineOptions = {
    stages: [{ environment: 'dev' }, { environment: 'staging' }],
    promotionStrategy: PromotionStrategy.PR,
    promotion: {
      productionStages: [{ environment: 'platform', workload: 'management' }, { environment: 'prodeu' }],
    },
  };

  function synthWith(options: PipelineOptions): Record<string, string> {
    const project = newProject();
    addCdkPipelineWorkflows(project, options);
    return synthSnapshot(project);
  }

  function workflowFiles(snapshot: Record<string, string>): string[] {
    return Object.keys(snapshot)
      .filter((key) => key.startsWith('.github/workflows/'))
      .sort();
  }

  describe('DIRECT (the default)', () => {
    // The whole point of the option: an existing project that never sets it
    // must keep the pipeline it already has, byte for byte, across an upgrade.
    test('omitting the option emits exactly the same files as spelling DIRECT out', () => {
      const stages = [
        { environment: 'dev' },
        { environment: 'platform', workload: 'security' },
        { environment: 'prodeu' },
      ];
      const implicit = synthWith({ stages });
      const explicit = synthWith({ stages, promotionStrategy: PromotionStrategy.DIRECT });
      expect(workflowFiles(explicit)).toEqual(workflowFiles(implicit));
      for (const file of workflowFiles(implicit)) {
        expect(explicit[file]).toStrictEqual(implicit[file]);
      }
    });

    test('still the six-file single-branch shape, with no promotion workflow', () => {
      const snapshot = synthWith({ stages: [{ environment: 'iam' }] });
      expect(workflowFiles(snapshot)).toEqual([
        '.github/workflows/action-build.yml',
        '.github/workflows/action-deploy.yml',
        '.github/workflows/action-diff.yml',
        '.github/workflows/action-synth.yml',
        '.github/workflows/pr-main.yml',
        '.github/workflows/push-main.yml',
      ]);
    });

    test('main and dev still both trigger the one pipeline', () => {
      const snapshot = synthWith({ stages: [{ environment: 'iam' }] });
      expect(snapshot['.github/workflows/pr-main.yml']).toMatch(/branches:\s*\n\s*- main\s*\n\s*- dev/);
      expect(snapshot['.github/workflows/push-main.yml']).toMatch(/branches:\s*\n\s*- main\s*\n\s*- dev/);
    });

    test('a promotion block without the PR strategy is a synth error, not a silent no-op', () => {
      expect(() =>
        synthWith({
          stages: [{ environment: 'iam' }],
          promotion: { productionStages: [{ environment: 'prodeu' }] },
        }),
      ).toThrow('pipeline.promotion only applies to');
    });
  });

  describe('PR', () => {
    test('emits a PR/push pair per branch plus the promotion workflow', () => {
      expect(workflowFiles(synthWith(prStrategy))).toEqual([
        '.github/workflows/action-build.yml',
        '.github/workflows/action-deploy.yml',
        '.github/workflows/action-diff.yml',
        '.github/workflows/action-promote-pr.yml',
        '.github/workflows/action-synth.yml',
        '.github/workflows/pr-dev.yml',
        '.github/workflows/pr-main.yml',
        '.github/workflows/push-dev.yml',
        '.github/workflows/push-main.yml',
      ]);
    });

    test('each branch triggers on itself alone, so a push to dev no longer deploys prod', () => {
      const snapshot = synthWith(prStrategy);
      expect(snapshot['.github/workflows/push-dev.yml']).toMatch(/branches:\s*\n\s*- dev\s*\n/);
      expect(snapshot['.github/workflows/push-dev.yml']).not.toMatch(/- main/);
      expect(snapshot['.github/workflows/push-main.yml']).toMatch(/branches:\s*\n\s*- main\s*\n/);
      expect(snapshot['.github/workflows/push-main.yml']).not.toMatch(/- dev/);
    });

    test('stages deploy from the source branch and productionStages from the target branch', () => {
      const snapshot = synthWith(prStrategy);
      const dev = snapshot['.github/workflows/push-dev.yml'];
      const main = snapshot['.github/workflows/push-main.yml'];
      expect(dev).toContain('deploy-dev-0:');
      expect(dev).toContain('deploy-staging-1:');
      expect(dev).not.toContain('deploy-prodeu');
      expect(main).toContain('deploy-platform-management-0:');
      expect(main).toContain('deploy-prodeu-1:');
      expect(main).not.toContain('deploy-staging');
    });

    test('the production diff lands on the promotion PR, which targets the target branch', () => {
      const snapshot = synthWith(prStrategy);
      const prMain = snapshot['.github/workflows/pr-main.yml'];
      expect(prMain).toMatch(/branches:\s*\n\s*- main\s*\n/);
      expect(prMain).toContain('diff-platform-management-0:');
      expect(prMain).toContain('diff-prodeu-1:');
      expect(snapshot['.github/workflows/pr-dev.yml']).not.toContain('diff-prodeu');
    });

    test('the promote job waits for every source-branch deploy before opening the PR', () => {
      const dev = synthWith(prStrategy)['.github/workflows/push-dev.yml'];
      expect(dev).toMatch(/promote:[\s\S]*?uses: \.\/\.github\/workflows\/action-promote-pr\.yml/);
      expect(dev).toMatch(/promote:[\s\S]*?needs:\s*\n\s*- deploy-staging-1/);
      expect(dev).toMatch(/promote:[\s\S]*?target-branch: main/);
      expect(dev).toMatch(/promote:[\s\S]*?source-branch: \$\{\{ github\.ref_name \}\}/);
    });

    test('the pipeline opens the promotion PR itself — nothing is left to a human to create', () => {
      const promote = synthWith(prStrategy)['.github/workflows/action-promote-pr.yml'];
      expect(promote).toContain('uses: peter-evans/create-pull-request@v8');
      expect(promote).toContain('base: ${{ inputs.target-branch }}');
      expect(promote).toContain('branch: promote-${{ inputs.source-branch }}-to-${{ inputs.target-branch }}');
      // Pushing a branch reset onto another branch's tip needs full history.
      expect(promote).toMatch(/fetch-depth: ['"]?0['"]?/);
    });

    test('the target branch gets no promote job, so merging the PR only deploys', () => {
      expect(synthWith(prStrategy)['.github/workflows/push-main.yml']).not.toContain('promote:');
    });

    test('checks gate synth on every one of the four entry points', () => {
      const snapshot = synthWith({
        ...prStrategy,
        additionalChecks: [
          { id: 'build-python', name: 'Build Python', uses: './.github/workflows/action-build-python.yml' },
        ],
      });
      for (const file of ['pr-dev.yml', 'push-dev.yml', 'pr-main.yml', 'push-main.yml']) {
        expect(snapshot[`.github/workflows/${file}`]).toMatch(
          /synth:[\s\S]*?needs:\s*\n\s*- build\s*\n\s*- build-python/,
        );
      }
    });

    test('custom branch names reach the file names, titles and concurrency groups', () => {
      const snapshot = synthWith({
        ...prStrategy,
        promotion: { ...prStrategy.promotion!, sourceBranch: 'acceptance', targetBranch: 'release' },
      });
      expect(snapshot['.github/workflows/push-acceptance.yml']).toMatch(/^name: ['"]Push: Acceptance Branch['"]$/m);
      expect(snapshot['.github/workflows/push-acceptance.yml']).toContain('concurrency: acceptance');
      expect(snapshot['.github/workflows/push-acceptance.yml']).toMatch(/promote:[\s\S]*?target-branch: release/);
      expect(snapshot['.github/workflows/pr-release.yml']).toMatch(/^name: ['"]PR: Release Branch['"]$/m);
      expect(snapshot['.github/workflows/pr-release.yml']).toContain('group: pr-release-${{ github.ref }}');
      expect(snapshot['.github/workflows/pr-main.yml']).toBeUndefined();
    });

    test('a branch name with a slash is slugified so the file name stays valid', () => {
      const snapshot = synthWith({
        ...prStrategy,
        promotion: { ...prStrategy.promotion!, targetBranch: 'release/prod' },
      });
      expect(snapshot['.github/workflows/push-release-prod.yml']).toBeDefined();
      // The trigger keeps the real branch name; only the file name is slugified.
      expect(snapshot['.github/workflows/push-release-prod.yml']).toMatch(/branches:\s*\n\s*- release\/prod/);
    });

    test('the PR strategy without a promotion block is a synth error', () => {
      expect(() => synthWith({ stages: [{ environment: 'dev' }], promotionStrategy: PromotionStrategy.PR })).toThrow(
        'requires pipeline.promotion',
      );
    });

    test('empty productionStages is a synth error', () => {
      expect(() =>
        synthWith({
          stages: [{ environment: 'dev' }],
          promotionStrategy: PromotionStrategy.PR,
          promotion: { productionStages: [] },
        }),
      ).toThrow('productionStages must contain at least one entry');
    });

    test('promoting a branch onto itself is a synth error', () => {
      expect(() =>
        synthWith({
          ...prStrategy,
          promotion: { ...prStrategy.promotion!, sourceBranch: 'main', targetBranch: 'main' },
        }),
      ).toThrow('must differ');
    });
  });
});
