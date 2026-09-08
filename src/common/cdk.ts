import { CdkConfigCommonOptions, CdkFeatureFlags } from 'projen/lib/awscdk';
import { CrossStackReferences } from '../cross-stack-references';

export function createCdkConfiguration(crossStackReferences: CrossStackReferences): CdkConfigCommonOptions {
  return {
    featureFlags: CdkFeatureFlags.V2.fromLocalAwsCdkLib(),
    context: {
      '@aws-cdk/core:defaultCrossStackReferences': crossStackReferences,
    },
  };
}
