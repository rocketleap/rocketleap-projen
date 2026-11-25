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
  PROMOTION_REQUIRED_MESSAGE,
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
  test('DIRECT emits exactly six workflow files', () => {
    const project = newProject();
    addCdkPipelineWorkflows(project, { stages: [{ environment: 'iam' }], promotionStrategy: PromotionStrategy.DIRECT });
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
      promotionStrategy: PromotionStrategy.DIRECT,
      cdkDiff: { failOnDestructiveChanges: true },
    });
    const diff = synthSnapshot(project)['.github/workflows/action-diff.yml'];
    expect(diff).toContain('failOnDestructiveChanges: "true"');
  });

  test('empty stages throws', () => {
    const project = newProject();
    expect(() => addCdkPipelineWorkflows(project, { stages: [], promotionStrategy: PromotionStrategy.DIRECT })).toThrow(
      'pipeline.stages must contain at least one entry',
    );
  });

  test('empty stages throws under PR too', () => {
    const project = newProject();
    expect(() => addCdkPipelineWorkflows(project, { stages: [] })).toThrow(
      'pipeline.stages must contain at least one entry',
    );
  });

  test('a stages-only config without promotion throws the migration message', () => {
    const project = newProject();
    const attempt = () => addCdkPipelineWorkflows(project, { stages: [{ environment: 'iam' }] });
    expect(attempt).toThrow(PROMOTION_REQUIRED_MESSAGE);
    expect(PROMOTION_REQUIRED_MESSAGE).toContain('At least one pipeline stage must set promotion: true');
    expect(PROMOTION_REQUIRED_MESSAGE).toContain('promotion: true');
    expect(PROMOTION_REQUIRED_MESSAGE).toContain('PromotionStrategy.DIRECT');
    expect(attempt).toThrowErrorMatchingSnapshot();
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
    addCdkPipelineWorkflows(project, {
      stages: [{ environment: 'governance' }],
      promotionStrategy: PromotionStrategy.DIRECT,
      additionalChecks: checks,
    });
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
      promotionStrategy: PromotionStrategy.DIRECT,
      additionalChecks: [pythonCheck],
    });
    expect(synthSnapshot(project)['.github/workflows/action-build-python.yml']).toBeUndefined();
  });

  test('projects that declare no checks keep the plain `needs: build` string', () => {
    const project = newProject();
    addCdkPipelineWorkflows(project, { stages: [{ environment: 'iam' }], promotionStrategy: PromotionStrategy.DIRECT });
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

  const actionCheck: PipelineCheck = {
    id: 'dependency-review',
    name: 'Dependency Review',
    uses: 'actions/dependency-review-action@v4',
    runsOn: ['ubuntu-latest'],
  };

  test('runsOn turns the check into a job that runs the action as a step', () => {
    const { pr, push } = synthBoth([actionCheck]);
    for (const workflow of [pr, push]) {
      expect(workflow).toMatch(/dependency-review:[\s\S]*?runs-on: ubuntu-latest/);
      expect(workflow).toMatch(/dependency-review:[\s\S]*?steps:[\s\S]*?uses: actions\/dependency-review-action@v4/);
      // Never a job-level `uses`: GitHub would read the action as a reusable workflow.
      expect(workflow).not.toMatch(/dependency-review:\s*\n\s*name: [^\n]+\n\s*uses:/);
      expect(workflow).toMatch(/synth:[\s\S]*?needs:\s*\n\s*- build\s*\n\s*- dependency-review/);
    }
  });

  test('an action check checks the repository out first', () => {
    const { pr } = synthBoth([actionCheck]);
    expect(pr).toMatch(/dependency-review:[\s\S]*?steps:\s*\n\s*- name: Checkout\s*\n\s*uses: actions\/checkout@v6/);
  });

  test('checkout: false drops the checkout step', () => {
    const { pr } = synthBoth([{ ...actionCheck, checkout: false }]);
    expect(pr).toMatch(/dependency-review:[\s\S]*?steps:\s*\n\s*- name: Dependency Review/);
    expect(pr).not.toMatch(/dependency-review:[\s\S]*?Checkout/);
  });

  test('inputs are forwarded to the action step', () => {
    const { pr } = synthBoth([{ ...actionCheck, with: { 'fail-on-severity': 'high' } }]);
    expect(pr).toMatch(
      /dependency-review:[\s\S]*?uses: actions\/dependency-review-action@v4\s*\n\s*with:\s*\n\s*fail-on-severity: high/,
    );
  });

  test('several runner labels are emitted as a list for self-hosted runners', () => {
    const { pr } = synthBoth([{ ...actionCheck, runsOn: ['self-hosted', 'linux', 'x64'] }]);
    expect(pr).toMatch(/dependency-review:[\s\S]*?runs-on:\s*\n\s*- self-hosted\s*\n\s*- linux\s*\n\s*- x64/);
  });

  test('a reusable workflow and an action can gate synth side by side', () => {
    const { pr, push } = synthBoth([pythonCheck, actionCheck]);
    for (const workflow of [pr, push]) {
      expect(workflow).toMatch(/build-python:[\s\S]*?uses: \.\/\.github\/workflows\/action-build-python\.yml/);
      expect(workflow).toMatch(/dependency-review:[\s\S]*?runs-on: ubuntu-latest/);
      expect(workflow).toMatch(/synth:[\s\S]*?needs:\s*\n\s*- build\s*\n\s*- build-python\s*\n\s*- dependency-review/);
    }
  });
});

describe('pipeline.promotionStrategy', () => {
  const prStrategy: PipelineOptions = {
    stages: [
      { environment: 'dev' },
      { environment: 'staging' },
      { environment: 'platform', workload: 'management', promotion: true },
      { environment: 'prodeu', promotion: true },
    ],
    promotionStrategy: PromotionStrategy.PR,
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

  const defaultStrategy: PipelineOptions = { stages: prStrategy.stages };

  const direct: PipelineOptions = {
    stages: [{ environment: 'iam' }],
    promotionStrategy: PromotionStrategy.DIRECT,
  };

  describe('default', () => {
    test('omitting the option emits exactly the same files as spelling PR out', () => {
      const implicit = synthWith(defaultStrategy);
      const explicit = synthWith(prStrategy);
      expect(workflowFiles(implicit)).toEqual(workflowFiles(explicit));
      for (const file of workflowFiles(explicit)) {
        expect(implicit[file]).toStrictEqual(explicit[file]);
      }
    });

    test('the source push workflow keeps the Push: Main Branch name', () => {
      const push = synthWith(defaultStrategy)['.github/workflows/push-main.yml'];
      expect(push).toMatch(/^name: ['"]?Push: Main Branch['"]?$/m);
    });

    test('the target workflows are named after the production branch', () => {
      const snapshot = synthWith(defaultStrategy);
      expect(snapshot['.github/workflows/push-production.yml']).toMatch(/^name: ['"]?Push: Production Branch['"]?$/m);
      expect(snapshot['.github/workflows/pr-production.yml']).toMatch(/^name: ['"]?PR: Production Branch['"]?$/m);
    });
  });

  describe('DIRECT', () => {
    test('the six-file single-branch shape, with no promotion workflow', () => {
      const snapshot = synthWith(direct);
      expect(workflowFiles(snapshot)).toEqual([
        '.github/workflows/action-build.yml',
        '.github/workflows/action-deploy.yml',
        '.github/workflows/action-diff.yml',
        '.github/workflows/action-synth.yml',
        '.github/workflows/pr-main.yml',
        '.github/workflows/push-main.yml',
      ]);
    });

    test('main and dev both trigger the one pipeline', () => {
      const snapshot = synthWith(direct);
      expect(snapshot['.github/workflows/pr-main.yml']).toMatch(/branches:\s*\n\s*- main\s*\n\s*- dev/);
      expect(snapshot['.github/workflows/push-main.yml']).toMatch(/branches:\s*\n\s*- main\s*\n\s*- dev/);
    });

    test('promotion: true under DIRECT throws', () => {
      expect(() =>
        synthWith({
          ...direct,
          stages: [{ environment: 'dev' }, { environment: 'prodeu', promotion: true }],
        }),
      ).toThrow(
        'pipeline.stages[].promotion only applies to PromotionStrategy.PR; drop promotion: true or drop promotionStrategy: PromotionStrategy.DIRECT',
      );
    });

    test('empty stages is a synth error', () => {
      expect(() => synthWith({ ...direct, stages: [] })).toThrow('pipeline.stages must contain at least one entry');
    });

    test('diff: false skips a stage on pull requests but not on pushes', () => {
      const snapshot = synthWith({
        ...direct,
        stages: [{ environment: 'dev' }, { environment: 'prodeu' }, { environment: 'produs', diff: false }],
      });
      const pr = snapshot['.github/workflows/pr-main.yml'];
      expect(pr).toContain('diff-prodeu-1:');
      expect(pr).not.toContain('- environment: produs');
      expect(pr).not.toContain('diff-produs');
      expect(snapshot['.github/workflows/push-main.yml']).toContain('deploy-produs-2:');
    });

    test('all stages with diff false throws', () => {
      expect(() => synthWith({ ...direct, stages: [{ environment: 'iam', diff: false }] })).toThrow(
        'pipeline.stages must contain at least one stage with diff enabled',
      );
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
        '.github/workflows/pr-main.yml',
        '.github/workflows/pr-production.yml',
        '.github/workflows/push-main.yml',
        '.github/workflows/push-production.yml',
      ]);
    });

    test('main and dev trigger the source workflows and production alone triggers the target workflows', () => {
      const snapshot = synthWith(prStrategy);
      const prSource = snapshot['.github/workflows/pr-main.yml'];
      const pushSource = snapshot['.github/workflows/push-main.yml'];
      expect(prSource).toMatch(/pull_request:\s*\n\s*branches:\s*\n\s*- main\s*\n\s*- dev\s*\n/);
      expect(prSource).toMatch(/^name: ['"]?PR: Main Branch['"]?$/m);
      expect(pushSource).toMatch(/push:\s*\n\s*branches:\s*\n\s*- main\s*\n\s*- dev\s*\n/);
      expect(pushSource).toMatch(/^name: ['"]?Push: Main Branch['"]?$/m);
      expect(pushSource).not.toMatch(/- production/);
      for (const file of ['pr-production.yml', 'push-production.yml']) {
        const target = snapshot[`.github/workflows/${file}`];
        expect(target).toMatch(/branches:\s*\n\s*- production\s*\n/);
        expect(target).not.toMatch(/- main/);
        expect(target).not.toMatch(/- dev/);
      }
    });

    test('a push to main or dev promotes the pushed branch onto production', () => {
      const pushSource = synthWith(prStrategy)['.github/workflows/push-main.yml'];
      expect(pushSource).toMatch(/promote:[\s\S]*?source-branch: \$\{\{ github\.ref_name \}\}/);
      expect(pushSource).toMatch(/promote:[\s\S]*?target-branch: production/);
    });

    test('unpromoted stages deploy from the source branch and promoted stages from the target branch', () => {
      const snapshot = synthWith(prStrategy);
      const source = snapshot['.github/workflows/push-main.yml'];
      const target = snapshot['.github/workflows/push-production.yml'];
      expect(source).toContain('deploy-dev-0:');
      expect(source).toContain('deploy-staging-1:');
      expect(source).not.toContain('deploy-prodeu');
      expect(target).toContain('deploy-platform-management-0:');
      expect(target).toContain('deploy-prodeu-1:');
      expect(target).not.toContain('deploy-staging');
    });

    test('the production diff lands on the promotion PR, which targets the target branch', () => {
      const snapshot = synthWith(prStrategy);
      const prProduction = snapshot['.github/workflows/pr-production.yml'];
      expect(prProduction).toMatch(/branches:\s*\n\s*- production\s*\n/);
      expect(prProduction).toContain('diff-platform-management-0:');
      expect(prProduction).toContain('diff-prodeu-1:');
      expect(prProduction).not.toContain('diff-dev');
      expect(prProduction).not.toContain('diff-staging');
    });

    test('pull requests into main or dev diff every stage', () => {
      const snapshot = synthWith({
        stages: [
          { environment: 'dev' },
          { environment: 'staging' },
          { environment: 'prodeu', promotion: true },
          { environment: 'produs', promotion: true },
        ],
      });
      const prSource = snapshot['.github/workflows/pr-main.yml'];
      expect(prSource).toMatch(
        /matrix:\s*\n\s*stage:\s*\n\s*- environment: dev\s*\n\s*- environment: staging\s*\n\s*- environment: prodeu\s*\n\s*- environment: produs\s*\n/,
      );
      expect(prSource).toContain('diff-dev-0:');
      expect(prSource).toContain('diff-staging-1:');
      expect(prSource).toContain('diff-prodeu-2:');
      expect(prSource).toContain('diff-produs-3:');

      const prTarget = snapshot['.github/workflows/pr-production.yml'];
      expect(prTarget).toMatch(/matrix:\s*\n\s*stage:\s*\n\s*- environment: prodeu\s*\n\s*- environment: produs\s*\n/);
      expect(prTarget).toContain('diff-prodeu-0:');
      expect(prTarget).toContain('diff-produs-1:');
      expect(prTarget).not.toContain('diff-dev');
      expect(prTarget).not.toContain('diff-staging');

      const pushSource = snapshot['.github/workflows/push-main.yml'];
      expect(pushSource).toContain('deploy-dev-0:');
      expect(pushSource).toContain('deploy-staging-1:');
      expect(pushSource).not.toContain('deploy-prodeu');
      expect(pushSource).not.toContain('deploy-produs');

      const pushTarget = snapshot['.github/workflows/push-production.yml'];
      expect(pushTarget).toContain('deploy-prodeu-0:');
      expect(pushTarget).toContain('deploy-produs-1:');
      expect(pushTarget).not.toContain('deploy-dev');
      expect(pushTarget).not.toContain('deploy-staging');
    });

    test('diff: false skips a stage on pull requests but not on pushes', () => {
      const snapshot = synthWith({
        stages: [
          { environment: 'dev' },
          { environment: 'staging' },
          { environment: 'prodeu', promotion: true },
          { environment: 'produs', promotion: true, diff: false },
        ],
      });
      const prSource = snapshot['.github/workflows/pr-main.yml'];
      expect(prSource).toContain('- environment: prodeu');
      expect(prSource).not.toContain('- environment: produs');
      expect(prSource).toContain('diff-prodeu-2:');
      expect(prSource).not.toContain('diff-produs');
      const prTarget = snapshot['.github/workflows/pr-production.yml'];
      expect(prTarget).toContain('- environment: prodeu');
      expect(prTarget).not.toContain('- environment: produs');
      expect(prTarget).toContain('diff-prodeu-0:');
      expect(prTarget).not.toContain('diff-produs');
      expect(snapshot['.github/workflows/push-production.yml']).toContain('deploy-produs-1:');

      const noPromotedDiff = synthWith({
        stages: [{ environment: 'dev' }, { environment: 'prodeu', promotion: true, diff: false }],
      });
      const prTargetEmpty = noPromotedDiff['.github/workflows/pr-production.yml'];
      expect(prTargetEmpty).toContain('build:');
      expect(prTargetEmpty).not.toContain('synth:');
      expect(prTargetEmpty).not.toContain('diff-');
      expect(prTargetEmpty).not.toContain('matrix:');
      expect(noPromotedDiff['.github/workflows/pr-main.yml']).toContain('diff-dev-0:');
      expect(noPromotedDiff['.github/workflows/push-production.yml']).toContain('deploy-prodeu-0:');
    });

    test('all stages with diff false throws', () => {
      expect(() =>
        synthWith({
          stages: [
            { environment: 'dev', diff: false },
            { environment: 'prodeu', promotion: true, diff: false },
          ],
        }),
      ).toThrow('pipeline.stages must contain at least one stage with diff enabled');
    });

    test('the promote job waits for every source-branch deploy before opening the PR', () => {
      const source = synthWith(prStrategy)['.github/workflows/push-main.yml'];
      expect(source).toMatch(/promote:[\s\S]*?uses: \.\/\.github\/workflows\/action-promote-pr\.yml/);
      expect(source).toMatch(/promote:[\s\S]*?needs:\s*\n\s*- deploy-staging-1/);
      expect(source).toMatch(/promote:[\s\S]*?target-branch: production/);
      expect(source).toMatch(/promote:[\s\S]*?source-branch: \$\{\{ github\.ref_name \}\}/);
      expect(source).toMatch(/promote:[\s\S]*?name: Create production promotion PR/);
    });

    test('the pipeline opens the promotion PR itself — nothing is left to a human to create', () => {
      const promote = synthWith(prStrategy)['.github/workflows/action-promote-pr.yml'];
      expect(promote).toContain('uses: peter-evans/create-pull-request@v8');
      expect(promote).toContain('base: ${{ inputs.target-branch }}');
      expect(promote).toContain('branch: promote-${{ inputs.source-branch }}-to-${{ inputs.target-branch }}');
      // Pushing a branch reset onto another branch's tip needs full history.
      expect(promote).toMatch(/fetch-depth: ['"]?0['"]?/);
    });

    test('each promotion opens a new timestamped PR describing the promoted commits', () => {
      const promote = synthWith(prStrategy)['.github/workflows/action-promote-pr.yml'];
      expect(promote).toContain('branch-suffix: timestamp');
      expect(promote).toContain('## Commits');
      expect(promote).toContain('steps.describe.outputs.sha');
    });

    test('the target branch gets no promote job, so merging the PR only deploys', () => {
      expect(synthWith(prStrategy)['.github/workflows/push-production.yml']).not.toContain('promote:');
    });

    test('checks gate synth on every one of the four entry points', () => {
      const snapshot = synthWith({
        ...prStrategy,
        additionalChecks: [
          { id: 'build-python', name: 'Build Python', uses: './.github/workflows/action-build-python.yml' },
        ],
      });
      for (const file of ['pr-main.yml', 'push-main.yml', 'pr-production.yml', 'push-production.yml']) {
        expect(snapshot[`.github/workflows/${file}`]).toMatch(
          /synth:[\s\S]*?needs:\s*\n\s*- build\s*\n\s*- build-python/,
        );
      }
    });

    test('the PR strategy without a promoted stage is a synth error', () => {
      expect(() => synthWith({ stages: [{ environment: 'dev' }], promotionStrategy: PromotionStrategy.PR })).toThrow(
        PROMOTION_REQUIRED_MESSAGE,
      );
    });

    test('a pipeline with only promoted stages opens the promotion PR from build', () => {
      const snapshot = synthWith({ stages: [{ environment: 'prodeu', promotion: true }] });
      expect(workflowFiles(snapshot)).toHaveLength(9);
      const prSource = snapshot['.github/workflows/pr-main.yml'];
      expect(prSource).toContain('synth:');
      expect(prSource).toContain('diff-prodeu-0:');
      const pushSource = snapshot['.github/workflows/push-main.yml'];
      expect(pushSource).toMatch(/promote:[\s\S]*?needs:\s*\n\s*- build\s*\n\s*uses:/);
      expect(pushSource).not.toContain('synth:');
      expect(pushSource).not.toContain('gate-');
      expect(pushSource).not.toContain('deploy-');
      expect(snapshot['.github/workflows/pr-production.yml']).toContain('diff-prodeu-0:');
      expect(snapshot['.github/workflows/push-production.yml']).toContain('deploy-prodeu-0:');
    });

    test('with only promoted stages, promote also waits on every check', () => {
      const pushSource = synthWith({
        stages: [{ environment: 'prodeu', promotion: true }],
        additionalChecks: [
          { id: 'build-python', name: 'Build Python', uses: './.github/workflows/action-build-python.yml' },
        ],
      })['.github/workflows/push-main.yml'];
      expect(pushSource).toMatch(/promote:[\s\S]*?needs:\s*\n\s*- build\s*\n\s*- build-python/);
    });

    test('promoted stages keep their listed order in push-production.yml', () => {
      const target = synthWith({
        stages: [
          { environment: 'dev' },
          { environment: 'platform', workload: 'management', promotion: true },
          { environment: 'staging' },
          { environment: 'prodeu', promotion: true },
          { environment: 'produs', promotion: true },
        ],
      })['.github/workflows/push-production.yml'];
      const gates = [...target.matchAll(/^ {2}(gate-[a-z0-9-]+):/gm)].map((match) => match[1]);
      expect(gates).toEqual(['gate-platform-0', 'gate-prodeu-1', 'gate-produs-2']);
      expect(target).toMatch(/gate-prodeu-1:[\s\S]*?needs:\s*\n\s*- deploy-platform-management-0/);
      expect(target).toMatch(/gate-produs-2:[\s\S]*?needs:\s*\n\s*- deploy-prodeu-1/);
    });
  });
});

describe('pipeline stage waves', () => {
  const productionWave: PipelineOptions = {
    stages: [
      { environment: 'dev' },
      { environment: 'staging' },
      { environment: 'maineu', promotion: true, wave: 'production' },
      { environment: 'mainus', promotion: true, wave: 'production' },
      { environment: 'prodeu', promotion: true, wave: 'production' },
      { environment: 'produs', promotion: true, wave: 'production' },
    ],
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

  function jobBlock(workflow: string, id: string): string {
    const match = workflow.match(new RegExp(`^ {2}${id}:\\n((?: {4}.*\\n|\\s*\\n)*)`, 'm'));
    expect(match).not.toBeNull();
    return match![1];
  }

  function needsOf(workflow: string, id: string): string[] {
    const block = jobBlock(workflow, id);
    const list = block.match(/^ {4}needs:\n((?: {6}- .*\n)+)/m);
    expect(list).not.toBeNull();
    return [...list![1].matchAll(/- (.*)/g)].map((item) => item[1]);
  }

  function gateIds(workflow: string): string[] {
    return [...workflow.matchAll(/^ {2}(gate-[a-z0-9-]+):/gm)].map((match) => match[1]);
  }

  test('stages sharing a wave deploy in parallel behind per-environment gates', () => {
    const target = synthWith(productionWave)['.github/workflows/push-production.yml'];
    const envs = ['maineu', 'mainus', 'prodeu', 'produs'];
    expect(gateIds(target)).toEqual(envs.map((env, index) => `gate-${env}-${index}`));
    envs.forEach((env, index) => {
      expect(needsOf(target, `gate-${env}-${index}`)).toEqual(['synth']);
      expect(jobBlock(target, `gate-${env}-${index}`)).toContain(`environment: ${env}`);
      expect(needsOf(target, `deploy-${env}-${index}`)).toEqual([`gate-${env}-${index}`]);
    });
    expect(target).not.toContain('promote:');

    const withAudit = synthWith({
      stages: [...productionWave.stages, { environment: 'audit', promotion: true }],
    })['.github/workflows/push-production.yml'];
    expect(needsOf(withAudit, 'gate-audit-4')).toEqual(envs.map((env, index) => `deploy-${env}-${index}`));
    expect(needsOf(withAudit, 'deploy-audit-4')).toEqual(['gate-audit-4']);
  });

  test('wave defaults to the environment', () => {
    const stages = [
      { environment: 'dev' },
      { environment: 'platform', workload: 'management' },
      { environment: 'platform', workload: 'security' },
      { environment: 'staging' },
      { environment: 'prodeu', promotion: true },
      { environment: 'prodeu', workload: 'extra', promotion: true },
      { environment: 'produs', promotion: true },
    ];
    const implicit = synthWith({ stages });
    const explicit = synthWith({ stages: stages.map((stage) => ({ ...stage, wave: stage.environment })) });
    expect(workflowFiles(implicit)).toEqual(workflowFiles(explicit));
    for (const file of workflowFiles(explicit)) {
      expect(implicit[file]).toStrictEqual(explicit[file]);
    }
  });

  test('a wave under DIRECT gives each environment its own gate behind synth', () => {
    const push = synthWith({
      stages: [
        { environment: 'dev', wave: 'all' },
        { environment: 'staging', wave: 'all' },
      ],
      promotionStrategy: PromotionStrategy.DIRECT,
    })['.github/workflows/push-main.yml'];
    expect(gateIds(push)).toEqual(['gate-dev-0', 'gate-staging-1']);
    expect(needsOf(push, 'gate-dev-0')).toEqual(['synth']);
    expect(needsOf(push, 'gate-staging-1')).toEqual(['synth']);
    expect(needsOf(push, 'deploy-dev-0')).toEqual(['gate-dev-0']);
    expect(needsOf(push, 'deploy-staging-1')).toEqual(['gate-staging-1']);
  });
});

describe('generated workflow snapshots', () => {
  const configs: Record<string, PipelineOptions> = {
    pr: {
      stages: [
        { environment: 'dev' },
        { environment: 'staging' },
        { environment: 'platform', workload: 'management', promotion: true },
        { environment: 'prodeu', promotion: true },
        { environment: 'produs', promotion: true },
      ],
      additionalChecks: [
        { id: 'build-python', name: 'Build Python', uses: './.github/workflows/action-build-python.yml' },
      ],
    },
    direct: {
      stages: [
        { environment: 'dev' },
        { environment: 'staging' },
        { environment: 'prodeu' },
        { environment: 'produs' },
      ],
      promotionStrategy: PromotionStrategy.DIRECT,
    },
  };

  for (const [name, options] of Object.entries(configs)) {
    test(`${name} pipeline`, () => {
      const project = newProject();
      addCdkPipelineWorkflows(project, options);
      const snapshot = synthSnapshot(project);
      const files = Object.keys(snapshot)
        .filter((key) => key.startsWith('.github/workflows/'))
        .sort();
      for (const file of files) {
        expect(snapshot[file]).toMatchSnapshot(file);
      }
    });
  }
});
