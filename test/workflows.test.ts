import { Project } from 'projen';
import { synthSnapshot } from 'projen/lib/util/synth';
import {
  addActionBuildWorkflow,
  addActionDeployWorkflow,
  addActionDiffWorkflow,
  addActionPromotePrWorkflow,
  addCdkPipelineWorkflows,
  addPrMainWorkflow,
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

  test('action-diff.yml is emitted', () => {
    const project = newProject();
    addActionDiffWorkflow(project);
    const snapshot = synthSnapshot(project);
    expect(snapshot['.github/workflows/action-diff.yml']).toContain('yarn diff:ci');
    expect(snapshot['.github/workflows/action-diff.yml']).toContain('gh pr comment');
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

  test('productionPromotionFlow injects promote job into push-main', () => {
    const project = newProject();
    addPushMainWorkflow(project, [{ environment: 'dev', workload: 'example-ecs' }], {
      matrix: [{ environment: 'prodeu', workload: 'example-ecs' }],
    });
    const push = synthSnapshot(project)['.github/workflows/push-main.yml'];
    expect(push).toContain('promote:');
    expect(push).toContain('action-promote-pr.yml');
    expect(push).toContain('target-branch: production');
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
    addCdkPipelineWorkflows(project, { matrix: [{ environment: 'iam' }] });
    const snapshot = synthSnapshot(project);
    expect(snapshot['.github/workflows/action-build.yml']).toBeDefined();
    expect(snapshot['.github/workflows/action-deploy.yml']).toBeDefined();
    expect(snapshot['.github/workflows/action-diff.yml']).toBeDefined();
    expect(snapshot['.github/workflows/pr-main.yml']).toBeDefined();
    expect(snapshot['.github/workflows/push-main.yml']).toBeDefined();
    expect(snapshot['.github/workflows/action-promote-pr.yml']).toBeUndefined();
    expect(snapshot['.github/workflows/push-production.yml']).toBeUndefined();
  });

  test('GitOps production flow emits 7 files', () => {
    const project = newProject();
    addCdkPipelineWorkflows(project, {
      matrix: [{ environment: 'dev', workload: 'example-ecs' }],
      productionPromotionFlow: {
        matrix: [{ environment: 'prodeu', workload: 'example-ecs' }],
      },
    });
    const snapshot = synthSnapshot(project);
    expect(snapshot['.github/workflows/action-promote-pr.yml']).toBeDefined();
    expect(snapshot['.github/workflows/push-production.yml']).toBeDefined();
  });

  test('empty matrix throws', () => {
    const project = newProject();
    expect(() => addCdkPipelineWorkflows(project, { matrix: [] })).toThrow('pipeline.matrix');
  });

  test('prDiffMatrix drives pr-main when supplied; matrix still drives push-main', () => {
    const project = newProject();
    addCdkPipelineWorkflows(project, {
      matrix: [{ environment: 'dev', workload: 'example-ecs' }],
      prDiffMatrix: [
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

  test('empty productionPromotionFlow.matrix throws', () => {
    const project = newProject();
    expect(() =>
      addCdkPipelineWorkflows(project, {
        matrix: [{ environment: 'dev' }],
        productionPromotionFlow: { matrix: [] },
      }),
    ).toThrow('productionPromotionFlow');
  });
});
