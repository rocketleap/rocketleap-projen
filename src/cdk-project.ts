import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { awscdk, JsonPatch, SampleFile, typescript } from 'projen';
import { RocketleapCdkProjectOptions } from './cdk-project-options.generated';
import { cdkConfig } from './common/cdk';
import { compileConfig, configureSwc, libraryCompileConfig, swcConfig } from './common/compile';
import { configureEsLint, eslintConfig } from './common/eslint';
import { gitIgnore } from './common/git';
import { CDK_SCRIPTS, configurePackageJson, LIBRARY_SCRIPTS } from './common/package-json';
import { CDK_PRE_COMMIT_HOOKS, createPreCommitConfig } from './common/pre-commit';
import { prettierConfig } from './common/prettier';
import { addCdkPipelineWorkflows } from './common/workflows';
import { configureTaskPath, yarnConfig } from './common/yarn';
import { addDependabotConfig } from './dependabot';
import { RocketleapLibraryCdkProjectOptions } from './library-cdk-project-options.generated';
import { addRocketleapLicense } from './license';

/**
 * Base projen project for Rocketleap CDK projects.
 *
 * This project type generates a fully configured AWS CDK TypeScript application
 * with Rocketleap's standard configuration including ESLint, Prettier, Yarn Berry,
 * and pre-commit hooks.
 *
 * Use PlatformCdkProject for platform infrastructure (includes license).
 * Use WorkloadCdkProject for customer workloads (no license).
 */
abstract class RocketleapBaseCdkProject extends awscdk.AwsCdkTypeScriptApp {
  protected readonly company: string;
  protected readonly projectName: string;

  protected constructor(options: RocketleapCdkProjectOptions) {
    const company = options.company;
    const project = options.project;
    const cdkVersion = options.cdkVersion ?? '2.248.0';
    const constructVersion = options.constructVersion ?? '10.5.0';
    const buildingBlocksVersion = options.buildingBlocksVersion ?? '0.106.0';

    super({
      ...options,

      // Locked identity / release settings — always Rocketleap-owned.
      name: `${project}`,
      packageName: `@${company}/${project}`,
      defaultReleaseBranch: 'main',
      licensed: false,
      autoDetectBin: false,
      pullRequestTemplate: false,
      sampleCode: false,
      cdkVersion,
      constructsVersion: constructVersion,
      cdkVersionPinning: true,
      githubOptions: {
        ...(options.githubOptions ?? {}),
        mergify: false,
        workflows: false,
      },

      // Extensible defaults — merged with any caller-supplied input.
      gitignore: gitIgnore(options.gitignore),
      ...yarnConfig(company, options.yarnBerryOptions),
      ...compileConfig(options.tsconfig, options.tsconfigDev),
      ...eslintConfig(options.eslintOptions),
      ...prettierConfig(options.prettierOptions),
      ...cdkConfig(options.featureFlags, options.context),
      ...swcConfig(options.jestOptions),
    });

    this.company = company;
    this.projectName = project;

    configureTaskPath(this);
    configureSwc(this);
    configureEsLint(this.eslint!);
    createPreCommitConfig(this, CDK_PRE_COMMIT_HOOKS);
    configurePackageJson(this, CDK_SCRIPTS);
    addCdkPipelineWorkflows(this, options.pipeline);

    this.configureCdkJson();

    const devDependencies = [
      '@jest/globals@^30.2.0',
      '@rocketleap/rocketleap-projen',
      '@types/aws-lambda@8.10.159',
      '@types/js-yaml@4.0.9',
      'jest-mock-extended@^4.0.0',
    ];
    const dependencies = [
      `@rocketleap/building-blocks-cdk@npm:@${company}/building-blocks-cdk@${buildingBlocksVersion}`,
      `constructs@=${constructVersion}`,
      'source-map-support@^0.5.21',
    ];

    this.package.addDevDeps(...devDependencies);
    this.package.addDeps(...dependencies);
  }

  private configureCdkJson(): void {
    this.cdkConfig.json.patch(JsonPatch.add('/versionReporting', false));
  }

  protected generateSampleProjenrc(projectClass: string): void {
    const rcFile = resolve(this.outdir, '.projenrc.ts');
    if (existsSync(rcFile)) {
      return; // already exists
    }

    new SampleFile(this, '.projenrc.ts', {
      contents: `import { ${projectClass} } from '@rocketleap/rocketleap-projen';

const project = new ${projectClass}({
  company: '${this.company}',
  project: '${this.projectName}',
});

project.synth();
`,
    });
  }
}

/**
 * Projen project for Rocketleap Platform CDK projects.
 *
 * This is for platform infrastructure code (e.g., root-cdk, vpc-cdk, iam-cdk).
 * Includes the Norberhuis Onderneming B.V. license.
 */
export class RocketleapPlatformCdkProject extends RocketleapBaseCdkProject {
  constructor(options: RocketleapCdkProjectOptions) {
    super(options);

    addRocketleapLicense(this);
    this.generateSampleProjenrc('PlatformCdkProject');
  }
}

/**
 * Projen project for customer workload CDK projects.
 *
 * This is for customer-specific workload code that runs on the platform.
 * Does NOT include the platform license.
 */
export class RocketleapWorkloadCdkProject extends RocketleapBaseCdkProject {
  constructor(options: RocketleapCdkProjectOptions) {
    super(options);

    this.generateSampleProjenrc('WorkloadCdkProject');
    addDependabotConfig(this);
  }
}

/**
 * Projen project for Rocketleap CDK construct library projects.
 *
 * This is for CDK construct libraries (e.g., building-blocks-cdk).
 * Includes CDK peer dependencies and publishing configuration for GitHub Packages.
 */
export class RocketleapLibraryCdkProject extends typescript.TypeScriptProject {
  constructor(options: RocketleapLibraryCdkProjectOptions) {
    const company = options.company;
    const project = options.project;
    const cdkVersion = options.cdkVersion ?? '2.248.0';
    const constructVersion = options.constructVersion ?? '10.5.0';

    super({
      ...options,

      // Locked identity / release settings — always Rocketleap-owned.
      name: `@${company}/${project}`,
      defaultReleaseBranch: 'main',
      licensed: false,
      autoDetectBin: false,
      pullRequestTemplate: false,
      githubOptions: {
        ...(options.githubOptions ?? {}),
        mergify: false,
        workflows: false,
      },

      // Extensible defaults — merged with any caller-supplied input.
      gitignore: gitIgnore(options.gitignore),
      ...yarnConfig(company, options.yarnBerryOptions),
      ...libraryCompileConfig(options.tsconfig, options.tsconfigDev),
      ...eslintConfig(options.eslintOptions),
      ...prettierConfig(options.prettierOptions),
      ...swcConfig(options.jestOptions),
    });

    configureTaskPath(this);
    configureSwc(this);
    configureEsLint(this.eslint!);
    createPreCommitConfig(this, CDK_PRE_COMMIT_HOOKS);
    configurePackageJson(this, LIBRARY_SCRIPTS);

    this.package.addField('license', 'SEE LICENSE IN LICENSE.md');
    this.package.addField('main', 'dist/index.js');
    this.package.addField('types', 'dist/index.d.ts');
    this.package.addField('files', ['API.md', 'dist/']);
    this.package.addField('publishConfig', {
      registry: 'https://npm.pkg.github.com/',
    });

    this.npmignore?.addPatterns('!/dist');

    this.testTask.reset('jest');

    this.package.addPeerDeps(`aws-cdk-lib@=${cdkVersion}`, `constructs@=${constructVersion}`);
    this.package.addDevDeps(`aws-cdk-lib@${cdkVersion}`, `constructs@${constructVersion}`);
  }
}
