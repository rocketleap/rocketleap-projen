import { CdkConfigCommonOptions, CdkFeatureFlags, ICdkFeatureFlags } from 'projen/lib/awscdk';

/**
 * Rocketleap CDK configuration merged with caller-supplied overrides.
 *
 * - `featureFlags`: caller wins if provided (feature flags are an opaque object
 *   from projen, so we don't merge internals).
 * - `context`: recursive merge (caller wins on key collisions).
 */
export function cdkConfig(
  userFeatureFlags?: ICdkFeatureFlags,
  userContext?: Record<string, unknown>,
): CdkConfigCommonOptions {
  return {
    featureFlags: userFeatureFlags ?? CdkFeatureFlags.V2.fromLocalAwsCdkLib(),
    context: { ...(userContext ?? {}) },
  };
}
