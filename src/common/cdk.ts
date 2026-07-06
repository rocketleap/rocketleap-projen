import { CdkConfigCommonOptions, CdkFeatureFlags } from 'projen/lib/awscdk';

export const CDK_CONFIGURATION: CdkConfigCommonOptions = {
  featureFlags: CdkFeatureFlags.V2.fromLocalAwsCdkLib(),
};
