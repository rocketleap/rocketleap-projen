import { javascript, typescript } from 'projen';

import { gitIgnore } from './common/git';
import { PRETTIER_CONFIGURATION } from './common/prettier';
import { createYarnConfiguration } from './common/yarn';
import { addRocketleapLicense } from './license';

/**
 * Options for {@link RocketleapPlatformMinimalProject}.
 *
 * Extends projen's `NodeProjectOptions` with the rocketleap `company` and
 * `project` slugs used to build the package name (`@<company>/<project>`).
 */
export interface RocketleapPlatformMinimalProjectOptions extends javascript.NodeProjectOptions {
  /**
   * The owning company slug — used as the npm scope (e.g. `rocketleap`).
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
 *  - The rocketleap prettier defaults.
 *  - A `.projenrc.ts` (TypeScript projenrc) backed by a minimal
 *    `tsconfig.projen.json` for compilation — does not promote the
 *    whole project to TypeScript.
 *  - GitHub Mergify and the projen-default workflows disabled — the
 *    rocketleap workflows live in the internal subclass.
 *
 * Deliberately does NOT bring CDK config, ESLint, SWC, jest, project-wide
 * TypeScript compilation, or sample `src/` / `test/` scaffolding. Repos
 * that need those should use one of the CDK project types instead.
 */
export class RocketleapPlatformMinimalProject extends javascript.NodeProject {
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
      ...PRETTIER_CONFIGURATION,
      gitignore: gitIgnore(options.gitignore),
    });

    this.company = company;
    this.projectName = project;

    // Enable TypeScript projenrc without making the whole project a
    // TypeScriptProject (which would drag in jest, eslint, sample src/test
    // and a top-level tsconfig that consumers don't need).
    new typescript.ProjenrcTs(this);

    // NodeProject's default task starts with `node .projenrc.js` which fails
    // for TS projects. Replace with a single ts-node step. `-y` fetches
    // ts-node + typescript at run time; pin to a known-good version so a
    // broken ts-node latest release can't take down every version-bump run.
    this.defaultTask?.reset('npx -y ts-node@^10.9.2 --project tsconfig.projen.json .projenrc.ts');

    addRocketleapLicense(this);
  }
}
