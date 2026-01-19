import { awscdk, JsonPatch, SampleFile } from 'projen';
import { COMPILE_CONFIGURATION } from './common/compile';
import { configureEsLint, ESLINT_CONFIGURATION } from './common/eslint';
import { GIT_CONFIGURATION } from './common/git';
import { configurePackageJson } from './common/package-json';
import { CDK_PRE_COMMIT_HOOKS, createPreCommitConfig } from './common/pre-commit';
import { PRETTIER_CONFIGURATION } from './common/prettier';
import { YARN_CONFIGURATION } from './common/yarn';

/**
 * Options for RocketleapCdkProject
 */
export interface RocketleapCdkProjectOptions {
  /**
   * The company identifier used for package scoping.
   * @example 'rocketleap'
   */
  readonly company: string;

  /**
   * The project name.
   * @example 'root-cdk'
   */
  readonly project: string;

  /**
   * The AWS CDK version to use.
   * @default '2.233.0'
   */
  readonly cdkVersion?: string;

  /**
   * The constructs library version to use.
   * @default '10.4.4'
   */
  readonly constructVersion?: string;

  /**
   * The Rocketleap building blocks CDK version to use.
   * @default '0.104.1'
   */
  readonly buildingBlocksVersion?: string;
}

/**
 * A projen project for Rocketleap CDK projects.
 *
 * This project type generates a fully configured AWS CDK TypeScript application
 * with Rocketleap's standard configuration including ESLint, Prettier, Yarn Berry,
 * and pre-commit hooks.
 */
export class RocketleapCdkProject extends awscdk.AwsCdkTypeScriptApp {
  constructor(options: RocketleapCdkProjectOptions) {
    const company = options.company;
    const project = options.project;
    const cdkVersion = options.cdkVersion ?? '2.232.1';
    const constructVersion = options.constructVersion ?? '10.4.4';
    const buildingBlocksVersion = options.buildingBlocksVersion ?? '0.104.1';

    super({
      name: project,
      packageName: `@${company}/${project}`,

      deps: [`@rocketleap/building-blocks-cdk@npm:@${company}/building-blocks-cdk@${buildingBlocksVersion}`],

      cdkVersion: cdkVersion,
      constructsVersion: constructVersion,
      cdkVersionPinning: true,

      defaultReleaseBranch: 'main',
      projenrcTs: true,
      githubOptions: {
        mergify: false,
        workflows: false,
      },
      pullRequestTemplate: false,

      licensed: false,

      ...YARN_CONFIGURATION,
      ...COMPILE_CONFIGURATION,
      ...ESLINT_CONFIGURATION,
      ...PRETTIER_CONFIGURATION,
      ...GIT_CONFIGURATION,
    });
    configureEsLint(this.eslint!);
    createPreCommitConfig(this, CDK_PRE_COMMIT_HOOKS);
    configurePackageJson(this, {
      'synth': 'cdk synth --output cdk.out/$0/ --app "yarn ts-node --prefer-ts-exts bin/$0.ts";',
      'bootstrap': 'cdk bootstrap --output cdk.out/$0/ --app "yarn ts-node --prefer-ts-exts bin/$0.ts";',
      'list': 'cdk list --output cdk.out/$0/ --app "yarn ts-node --prefer-ts-exts bin/$0.ts";',
      'diff': 'cdk diff --output cdk.out/$0/ --app "yarn ts-node --prefer-ts-exts bin/$0.ts" ${1:---all};',
      'diff:ci': 'cdk diff --ci --app "yarn ts-node --prefer-ts-exts $0";',
      'deploy': 'cdk deploy --output cdk.out/$0/ --app "yarn ts-node --prefer-ts-exts bin/$0.ts" ${1:---all};',
      'deploy:ci': 'cdk deploy --ci --all --require-approval never --app "yarn ts-node --prefer-ts-exts $0";',
      'destroy': 'cdk destroy --output cdk.out/$0/ --app "yarn ts-node --prefer-ts-exts bin/$0.ts" ${1:---all};',
      'destroy:ci': 'cdk destroy --ci -f --all --output cdk.out/$0/ --app  "yarn  ts-node --prefer-ts-exts $0";',
    });
    this.configureCdkJson();

    this.package.addDeps(`construct@=${constructVersion}`); // Pin Constructs to exact version.
    this.package.addDevDeps('@rocketleap/rocketleap-projen'); // Add this library to dev deps.

    // Generate sample .projenrc.ts only during project initialization
    if (this.initProject) {
      this.generateSampleProjenrc(company, project);
    }
  }

  /**
   * Generates a sample .projenrc.ts file during project initialization
   */
  private generateSampleProjenrc(company: string, project: string): void {
    new SampleFile(this, '.projenrc.ts', {
      contents: `import { RocketleapCdkProject } from '@rocketleap/rocketleap-projen';

const project = new RocketleapCdkProject({
  company: '${company}',
  project: '${project}',
});

project.synth();
`,
    });
  }

  private configureCdkJson(): void {
    this.cdkConfig.json.patch(JsonPatch.add('/versionReporting', false));
  }
}
