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
  test('emits install + drift check + format/lint/build/test, no synth, no upload', () => {
    const project = newProject();
    addActionBuildWorkflow(project);
    const build = synthSnapshot(project)['.github/workflows/action-build.yml'];
    expect(build).toBeDefined();
    expect(build).toContain('workflow_call:');
    expect(build).toContain('yarn test:ci');
    expect(build).toContain('actions/checkout@v6');
    expect(build).toContain('actions/setup-node@v6');
    expect(build).toMatch(/node-version:\s*['"]?24['"]?/);
    expect(build).not.toMatch(/node-version:\s*['"]?18['"]?/);
    // Synth + upload are the responsibility of action-synth.yml, not build.
    expect(build).not.toContain('yarn synth');
    expect(build).not.toContain('upload-artifact');
  });

  test('verifies projen synth is a no-op before build', () => {
    const project = newProject();
    addActionBuildWorkflow(project);
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
});

describe('action-synth.yml', () => {
  test('installs, builds, synths one env, uploads per-env cdk-out artifact', () => {
    const project = newProject();
    addActionSynthWorkflow(project);
    const synth = synthSnapshot(project)['.github/workflows/action-synth.yml'];
    expect(synth).toBeDefined();
    expect(synth).toContain('workflow_call:');
    // Takes environment (required) and workload (optional).
    expect(synth).toMatch(/environment:\s*\n\s*type: string\s*\n\s*required: true/);
    // Sets both cdk_out_dir and artifact_name so upload & downstream download agree.
    expect(synth).toContain('cdk_out_dir=cdk.out/${{inputs.environment}}');
    expect(synth).toContain('artifact_name=cdk-out-${{inputs.environment}}');
    expect(synth).toContain('artifact_name=cdk-out-${{inputs.environment}}-${{inputs.workload}}');
    // The synth invocation passes env[/workload] to `yarn synth`.
    expect(synth).toContain('yarn synth');
    // Uploads the per-env cloud assembly under the per-env artifact name.
    expect(synth).toContain('actions/upload-artifact@v4');
    expect(synth).toContain('name: ${{ env.artifact_name }}');
    expect(synth).toContain('path: ${{ env.cdk_out_dir }}');
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
    // yarn run deploy:ci is the script entry point; user asked to keep this
    // in workflow calls rather than inlining `cdk deploy`.
    expect(deploy).toContain('yarn run deploy:ci "${{env.cdk_out_dir}}"');
    // Install is needed for yarn scripts / cdk to resolve; artifact reuse
    // saves the tsc build + synth cost, not the install cost.
    expect(deploy).toContain('- run: yarn\n');
  });

  test('gh-environment input is gone; deploy job just uses `environment` input', () => {
    const project = newProject();
    addActionDeployWorkflow(project);
    const deploy = synthSnapshot(project)['.github/workflows/action-deploy.yml'];
    expect(deploy).not.toContain('gh-environment');
    // The job-level environment field is bound directly to the CDK env input.
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
    expect(diff).toContain('title: ${{ inputs.job-name }}');
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
  test('fans out per-stage synth and per-stage diff; each diff needs its synth', () => {
    const project = newProject();
    addPrMainWorkflow(project, [{ environment: 'dev' }, { environment: 'prodeu' }]);
    const pr = synthSnapshot(project)['.github/workflows/pr-main.yml'];
    expect(pr).toContain('build:');
    expect(pr).toContain('synth-dev-0:');
    expect(pr).toContain('synth-prodeu-1:');
    expect(pr).toContain('diff-dev-0:');
    expect(pr).toContain('diff-prodeu-1:');
    // Every synth fans out from build (parallel), every diff waits on its synth.
    expect(pr).toMatch(/synth-dev-0:[\s\S]*?needs:\s*\n\s*- build/);
    expect(pr).toMatch(/synth-prodeu-1:[\s\S]*?needs:\s*\n\s*- build/);
    expect(pr).toMatch(/diff-dev-0:[\s\S]*?needs:\s*\n\s*- synth-dev-0/);
    expect(pr).toMatch(/diff-prodeu-1:[\s\S]*?needs:\s*\n\s*- synth-prodeu-1/);
  });

  test('empty stages throws', () => {
    const project = newProject();
    expect(() => addPrMainWorkflow(project, [])).toThrow('at least one entry');
  });
});

describe('push-main.yml', () => {
  test('build → parallel synth fan-out → sequential deploy chain', () => {
    const project = newProject();
    addPushMainWorkflow(project, [
      { environment: 'dev' },
      { environment: 'staging' },
      { environment: 'prodeu' },
      { environment: 'produs' },
    ]);
    const push = synthSnapshot(project)['.github/workflows/push-main.yml'];

    // All synth jobs fan out from build in parallel.
    expect(push).toMatch(/synth-dev-0:[\s\S]*?needs:\s*\n\s*- build/);
    expect(push).toMatch(/synth-staging-1:[\s\S]*?needs:\s*\n\s*- build/);
    expect(push).toMatch(/synth-prodeu-2:[\s\S]*?needs:\s*\n\s*- build/);
    expect(push).toMatch(/synth-produs-3:[\s\S]*?needs:\s*\n\s*- build/);

    // First deploy waits on its stage's synth only.
    expect(push).toMatch(/deploy-dev-0:[\s\S]*?needs:\s*\n\s*- synth-dev-0/);
    // Each subsequent deploy waits on the previous deploy AND its own synth,
    // so gating on the previous deploy serialises the chain and each stage's
    // synth is guaranteed done before its deploy starts.
    expect(push).toMatch(/deploy-staging-1:[\s\S]*?needs:\s*\n\s*- deploy-dev-0\s*\n\s*- synth-staging-1/);
    expect(push).toMatch(/deploy-prodeu-2:[\s\S]*?needs:\s*\n\s*- deploy-staging-1\s*\n\s*- synth-prodeu-2/);
    expect(push).toMatch(/deploy-produs-3:[\s\S]*?needs:\s*\n\s*- deploy-prodeu-2\s*\n\s*- synth-produs-3/);
  });

  test('workload stages thread the workload input through synth and deploy', () => {
    const project = newProject();
    addPushMainWorkflow(project, [{ environment: 'dev', workload: 'example-ecs' }]);
    const push = synthSnapshot(project)['.github/workflows/push-main.yml'];
    expect(push).toContain('synth-dev-example-ecs-0:');
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
    // The retired GitOps-production workflow set must not leak back in.
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
