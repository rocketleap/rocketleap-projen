import { CdkFeatureFlags, ICdkFeatureFlags } from 'projen/lib/awscdk';

export const CDK_CONFIGURATION = {
  ...CdkFeatureFlags.V2.fromLocalAwsCdkLib(),
} as ICdkFeatureFlags;
