import { CdkConfigCommonOptions, CdkFeatureFlags } from 'projen/lib/awscdk';

export function createCdkConfiguration(crossStackReferences: string = 'both'): CdkConfigCommonOptions {
  return {
    featureFlags: CdkFeatureFlags.V2.fromLocalAwsCdkLib(),
    context: {
      '@aws-cdk/core:defaultCrossStackReferences': crossStackReferences,
    },
  };
}
