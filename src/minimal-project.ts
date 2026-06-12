import { typescript } from 'projen';

import { GIT_CONFIGURATION } from './common/git';
import { createYarnConfiguration } from './common/yarn';

/**
 * Options for {@link RocketleapPlatformMinimalProject}.
 *
 * Extends projen's `TypeScriptProjectOptions` with the rocketleap `company`
 * and `project` slugs used to build the package name (`@<company>/<project>`).
 */
export interface RocketleapPlatformMinimalProjectOptions extends typescript.TypeScriptProjectOptions {
  /**
   * The owning company slug — used as the npm scope (e.g. `rocketleap`).
   * @default no scope
   */
  readonly company: string;

  /**
   * The project slug — used as the package name suffix (e.g. `aws-nuke-templates`).
   */
  readonly project: string;
}

/**
 * A minimal projen base for rocketleap repos that are NOT CDK projects.
 *
 * Use this for repos whose source is essentially hand-maintained (docs,
 * sample monorepos, template directories, …) but still need to participate
 * in the platform's release flow (version-bump, release, tag-release
 * workflows; dependabot config; the customer release CLI).
 *
 * Carries the bare minimum projen wires the release workflows expect:
 *
 *  - A real npm-style `package.json` with a `version` field — the
 *    version-bump workflow reads/writes it.
 *  - A `main` default release branch.
 *  - Yarn 4 (Berry) configured against the rocketleap registry.
 *  - The rocketleap git defaults (line endings, attributes).
 *  - GitHub Mergify and the projen-default workflows disabled — the
 *    rocketleap workflows live in the internal subclass.
 *
 * Deliberately does NOT bring CDK config, ESLint, Prettier, SWC, jest, or
 * TypeScript compilation. Repos that need those should use one of the
 * CDK project types instead.
 */
export class RocketleapPlatformMinimalProject extends typescript.TypeScriptProject {
  protected readonly company: string;
  protected readonly projectName: string;

  constructor(options: RocketleapPlatformMinimalProjectOptions) {
    const company = options.company;
    const project = options.project;

    super({
      ...options,
      name: `@${company}/${project}`,
      packageName: `@${company}/${project}`,

      defaultReleaseBranch: 'main',
      githubOptions: {
        mergify: false,
        workflows: false,
      },
      pullRequestTemplate: false,

      licensed: false,
      autoDetectBin: false,

      ...createYarnConfiguration(company),
      ...GIT_CONFIGURATION,
    });

    this.company = company;
    this.projectName = project;
  }
}
