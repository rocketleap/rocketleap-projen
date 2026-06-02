import { RocketleapBaseCdkProject } from './cdk-project';
import { RocketleapCdkProjectOptions } from './cdk-project-options.generated';
import { addDependabotConfig } from './dependabot';

/**
 * Projen project for customer workload CDK projects.
 *
 * This is for customer-specific workload code that runs on the platform.
 * Does NOT include the platform license.
 *
 * Auto-generates a `.github/dependabot.yml` via `addDependabotConfig`.
 * `RocketleapPlatformCdkProject` and `RocketleapLibraryCdkProject` do
 * not — their dependabot config is added by
 * `@rocketleap/rocketleap-projen-internal`'s internal wrappers.
 */
export class RocketleapWorkloadCdkProject extends RocketleapBaseCdkProject {
  constructor(options: RocketleapCdkProjectOptions) {
    super(options);

    this.generateSampleProjenrc('WorkloadCdkProject');
    addDependabotConfig(this);
  }
}
