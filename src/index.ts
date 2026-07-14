export * from './cdk-project';
export * from './cdk-project-options.generated';
export * from './library-cdk-project-options.generated';
export * from './minimal-project';
export { addDependabotConfig } from './dependabot';
export { addRocketleapLicense } from './license';
export * as format from './common/prettier';
export * as lint from './common/eslint';
export * as packages from './common/yarn';
export * as git from './common/git';
export * as actions from './common/actions';
export {
  PipelineOptions,
  PipelineMatrixEntry,
  PipelineStage,
  CdkDiffOptions,
  addCdkPipelineWorkflows,
  // Legacy-shape emitters (kept for consumers still on `deployMain`).
  addActionBuildWorkflow,
  addActionDeployWorkflow,
  addActionDiffWorkflow,
  addActionPromotePrWorkflow,
  addPrMainWorkflow,
  addPrProductionWorkflow,
  addPushMainWorkflow,
  addPushProductionWorkflow,
  // Stages-shape emitters.
  addStagesPipelineWorkflows,
  addStagesActionBuildWorkflow,
  addStagesActionSynthWorkflow,
  addStagesActionDeployWorkflow,
  addStagesActionDiffWorkflow,
  addStagesPrMainWorkflow,
  addStagesPushMainWorkflow,
} from './common/workflows';
