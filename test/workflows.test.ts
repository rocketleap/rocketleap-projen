import { Project } from 'projen';
import { synthSnapshot } from 'projen/lib/util/synth';
import {
  addActionBuildWorkflow,
  addActionDeployWorkflow,
  addActionDiffWorkflow,
  addActionPromotePrWorkflow,
  addCdkPipelineWorkflows,
  addPrMainWorkflow,
  addPrProductionWorkflow,
  addPushMainWorkflow,
  addPushProductionWorkflow,
} from '../src/common/workflows';

function newProject(): Project {
  return new Project({ name: 'test' });
}

describe('reusable action workflows', () => {
  test('action-build.yml is emitted', () => {
    const project = newProject();
    addActionBuildWorkflow(project);
    const snapshot = synthSnapshot(project);
    expect(snapshot['.github/workflows/action-build.yml']).toBeDefined();
    expect(snapshot['.github/workflows/action-build.yml']).toContain('workflow_call:');
    expect(snapshot['.github/workflows/action-build.yml']).toContain('yarn test:ci');
  });

  test('action-deploy.yml is emitted', () => {
    const project = newProject();
    addActionDeployWorkflow(project);
    const snapshot = synthSnapshot(project);
    expect(snapshot['.github/workflows/action-deploy.yml']).toContain('role/CdkDeployRole');
    expect(snapshot['.github/workflows/action-deploy.yml']).toContain('yarn run deploy:ci');
  });

  test('action-diff.yml synths then runs corymhall/cdk-diff-action', () => {
    const project = newProject();
    addActionDiffWorkflow(project);
    const snapshot = synthSnapshot(project);
    const diff = snapshot['.github/workflows/action-diff.yml'];
    expect(diff).toContain('yarn synth:ci');
    expect(diff).toContain('corymhall/cdk-diff-action@v2');
    expect(diff).toContain('title: ${{ inputs.job-name }}');
    expect(diff).not.toContain('yarn diff:ci');
    expect(diff).not.toContain('gha-jobid-action');
    expect(diff).not.toContain('gh pr comment');
    expect(diff).not.toContain('pr-number');
  });

  test('action-promote-pr.yml is emitted', () => {
    const project = newProject();
    addActionPromotePrWorkflow(project);
    const snapshot = synthSnapshot(project);
    expect(snapshot['.github/workflows/action-promote-pr.yml']).toContain('Production Promotion');
    expect(snapshot['.github/workflows/action-promote-pr.yml']).toContain('peter-evans/create-pull-request');
  });
});

describe('pr-main and push-main workflows', () => {
  test('single-entry matrix collapses to non-matrix job', () => {
    const project = newProject();
    addPrMainWorkflow(project, [{ environment: 'iam' }]);
    addPushMainWorkflow(project, [{ environment: 'iam' }]);
    const snapshot = synthSnapshot(project);
    const pr = snapshot['.github/workflows/pr-main.yml'];
    const push = snapshot['.github/workflows/push-main.yml'];
    expect(pr).toContain('environment: iam');
    expect(pr).not.toContain('strategy:');
    expect(push).toContain('environment: iam');
    expect(push).not.toContain('strategy:');
    expect(push).not.toContain('promote:');
  });

  test('multi-entry matrix uses strategy.matrix', () => {
    const project = newProject();
    addPrMainWorkflow(project, [
      { environment: 'dev', workload: 'example-ecs' },
      { environment: 'dev', workload: 'example-lambda' },
    ]);
    const snapshot = synthSnapshot(project);
    const pr = snapshot['.github/workflows/pr-main.yml'];
    expect(pr).toContain('strategy:');
    expect(pr).toContain('workloads:');
    expect(pr).toContain('example-ecs');
    expect(pr).toContain('example-lambda');
  });

  test('includePromote injects only the promote job into push-main (no production-diff)', () => {
    const project = newProject();
    addPushMainWorkflow(project, [{ environment: 'dev', workload: 'example-ecs' }], true);
    const push = synthSnapshot(project)['.github/workflows/push-main.yml'];
    expect(push).toContain('promote:');
    expect(push).toContain('action-promote-pr.yml');
    expect(push).toContain('target-branch: production');
    expect(push).not.toContain('production-diff');
  });
});

describe('pr-production workflow', () => {
  test('pr-production.yml triggers on production branch PRs with given matrix', () => {
    const project = newProject();
    addPrProductionWorkflow(project, [
      { environment: 'prodeu', workload: 'example-ecs' },
      { environment: 'produs', workload: 'example-ecs' },
    ]);
    const pr = synthSnapshot(project)['.github/workflows/pr-production.yml'];
    expect(pr).toContain('pull_request:');
    expect(pr).toContain('- production');
    expect(pr).toContain('prodeu');
    expect(pr).toContain('produs');
  });
});

describe('push-production workflow', () => {
  test('push-production.yml is emitted with matrix', () => {
    const project = newProject();
    addPushProductionWorkflow(project, [
      { environment: 'prodeu', workload: 'example-ecs' },
      { environment: 'produs', workload: 'example-ecs' },
    ]);
    const push = synthSnapshot(project)['.github/workflows/push-production.yml'];
    expect(push).toContain('branches:');
    expect(push).toContain('- production');
    expect(push).toContain('prodeu');
    expect(push).toContain('produs');
  });
});

describe('addCdkPipelineWorkflows', () => {
  test('simple flow emits 5 files (no production promotion)', () => {
    const project = newProject();
    addCdkPipelineWorkflows(project, { deployMain: [{ environment: 'iam' }] });
    const snapshot = synthSnapshot(project);
    expect(snapshot['.github/workflows/action-build.yml']).toBeDefined();
    expect(snapshot['.github/workflows/action-deploy.yml']).toBeDefined();
    expect(snapshot['.github/workflows/action-diff.yml']).toBeDefined();
    expect(snapshot['.github/workflows/pr-main.yml']).toBeDefined();
    expect(snapshot['.github/workflows/push-main.yml']).toBeDefined();
    expect(snapshot['.github/workflows/action-promote-pr.yml']).toBeUndefined();
    expect(snapshot['.github/workflows/push-production.yml']).toBeUndefined();
    expect(snapshot['.github/workflows/pr-production.yml']).toBeUndefined();
  });

  test('GitOps production flow emits 8 files when deployProduction is set', () => {
    const project = newProject();
    addCdkPipelineWorkflows(project, {
      deployMain: [{ environment: 'dev', workload: 'example-ecs' }],
      deployProduction: [{ environment: 'prodeu', workload: 'example-ecs' }],
    });
    const snapshot = synthSnapshot(project);
    expect(snapshot['.github/workflows/action-promote-pr.yml']).toBeDefined();
    expect(snapshot['.github/workflows/push-production.yml']).toBeDefined();
    expect(snapshot['.github/workflows/pr-production.yml']).toBeDefined();
  });

  test('push-main.yml has no production-diff job; pr-production runs the prod diff instead', () => {
    const project = newProject();
    addCdkPipelineWorkflows(project, {
      deployMain: [{ environment: 'dev', workload: 'example-ecs' }],
      deployProduction: [
        { environment: 'prodeu', workload: 'example-ecs' },
        { environment: 'produs', workload: 'example-ecs' },
      ],
    });
    const snapshot = synthSnapshot(project);
    expect(snapshot['.github/workflows/push-main.yml']).not.toContain('production-diff');
    expect(snapshot['.github/workflows/push-main.yml']).toContain('promote:');
    expect(snapshot['.github/workflows/pr-production.yml']).toContain('prodeu');
    expect(snapshot['.github/workflows/pr-production.yml']).toContain('produs');
  });

  test('empty deployMain throws', () => {
    const project = newProject();
    expect(() => addCdkPipelineWorkflows(project, { deployMain: [] })).toThrow('pipeline.deployMain');
  });

  test('diffMain drives pr-main when supplied; deployMain still drives push-main', () => {
    const project = newProject();
    addCdkPipelineWorkflows(project, {
      deployMain: [{ environment: 'dev', workload: 'example-ecs' }],
      diffMain: [
        { environment: 'staging', workload: 'example-ecs' },
        { environment: 'platform', workload: 'management' },
      ],
    });
    const snapshot = synthSnapshot(project);
    expect(snapshot['.github/workflows/pr-main.yml']).toContain('staging');
    expect(snapshot['.github/workflows/pr-main.yml']).toContain('management');
    expect(snapshot['.github/workflows/pr-main.yml']).not.toContain('environment: dev');
    expect(snapshot['.github/workflows/push-main.yml']).toContain('environment: dev');
    expect(snapshot['.github/workflows/push-main.yml']).not.toContain('staging');
  });

  test('diffMain defaults to deployMain when omitted', () => {
    const project = newProject();
    addCdkPipelineWorkflows(project, {
      deployMain: [{ environment: 'iam' }],
    });
    const snapshot = synthSnapshot(project);
    expect(snapshot['.github/workflows/pr-main.yml']).toContain('environment: iam');
    expect(snapshot['.github/workflows/push-main.yml']).toContain('environment: iam');
  });

  test('diffProduction drives pr-production when supplied; deployProduction drives push-production', () => {
    const project = newProject();
    addCdkPipelineWorkflows(project, {
      deployMain: [{ environment: 'dev' }],
      deployProduction: [{ environment: 'prodeu', workload: 'example-ecs' }],
      diffProduction: [{ environment: 'platform', workload: 'management' }],
    });
    const snapshot = synthSnapshot(project);
    expect(snapshot['.github/workflows/pr-production.yml']).toContain('management');
    expect(snapshot['.github/workflows/pr-production.yml']).not.toContain('prodeu');
    expect(snapshot['.github/workflows/push-production.yml']).toContain('prodeu');
    expect(snapshot['.github/workflows/push-production.yml']).not.toContain('management');
  });

  test('diffProduction defaults to deployProduction when omitted', () => {
    const project = newProject();
    addCdkPipelineWorkflows(project, {
      deployMain: [{ environment: 'dev' }],
      deployProduction: [{ environment: 'prodeu', workload: 'example-ecs' }],
    });
    const snapshot = synthSnapshot(project);
    expect(snapshot['.github/workflows/pr-production.yml']).toContain('prodeu');
  });

  test('empty deployProduction throws', () => {
    const project = newProject();
    expect(() =>
      addCdkPipelineWorkflows(project, {
        deployMain: [{ environment: 'dev' }],
        deployProduction: [],
      }),
    ).toThrow('pipeline.deployProduction');
  });
});
