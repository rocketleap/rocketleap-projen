import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { awscdk, JsonPatch, SampleFile, TextFile } from 'projen';
import { RocketleapCdkProjectOptions } from './cdk-project-options.generated';
import { CDK_CONFIGURATION } from './common/cdk';
import { COMPILE_CONFIGURATION } from './common/compile';
import { configureEsLint, ESLINT_CONFIGURATION } from './common/eslint';
import { GIT_CONFIGURATION } from './common/git';
import { configurePackageJson } from './common/package-json';
import { CDK_PRE_COMMIT_HOOKS, createPreCommitConfig } from './common/pre-commit';
import { PRETTIER_CONFIGURATION } from './common/prettier';
import { createYarnConfiguration } from './common/yarn';

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
    const cdkVersion = options.cdkVersion ?? '2.232.1';
    const constructVersion = options.constructVersion ?? '10.4.4';
    const buildingBlocksVersion = options.buildingBlocksVersion ?? '0.104.1';

    super({
      ...options,
      name: `${project}`,
      packageName: `@${company}/${project}`,

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
      autoDetectBin: false,

      ...createYarnConfiguration(company),
      ...COMPILE_CONFIGURATION,
      ...ESLINT_CONFIGURATION,
      ...PRETTIER_CONFIGURATION,
      ...GIT_CONFIGURATION,
      ...CDK_CONFIGURATION,
    });

    this.company = company;
    this.projectName = project;

    configureEsLint(this.eslint!);
    createPreCommitConfig(this, CDK_PRE_COMMIT_HOOKS);
    configurePackageJson(this, {
      'format': "prettier --write . '!**/*.{js,d.ts}'",
      'format:ci': "prettier -c . '!**/*.{js,d.ts}'",
      'lint': 'eslint --fix .',
      'lint:ci': 'eslint --max-warnings=0 .',
      'build': 'tsc',
      'clean': 'find bin src test -type f \\( -name "*.js" -o -name "*.d.ts" \\) -delete',
      'watch': 'tsc -w',
      'test': 'jest',
      'test:ci': 'jest --ci',
      'test:update-snapshots': 'jest --updateSnapshot',
      'synth': 'cdk synth --output cdk.out/$0/ --app "yarn ts-node --prefer-ts-exts bin/$0.ts";',
      'list': 'cdk list --output cdk.out/$0/ --app "yarn ts-node --prefer-ts-exts bin/$0.ts";',
      'bootstrap': 'cdk bootstrap --output cdk.out/$0/ --app "yarn ts-node --prefer-ts-exts bin/$0.ts";',
      'bootstrap:compliant':
        'cdk bootstrap --output cdk.out/$0/ --bootstrap-kms-key-id $(aws cloudformation list-exports --query "Exports[?Name==\'Platform-CompanyKeyId-v1\'].Value" --output text) --app "yarn ts-node --prefer-ts-exts bin/$0.ts";',
      'diff': 'cdk diff --output cdk.out/$0/ -e --app "yarn ts-node --prefer-ts-exts bin/$0.ts" ${1:---all};',
      'diff:ci': 'cdk diff --ci --app "yarn ts-node --prefer-ts-exts $0";',
      'deploy':
        'cdk deploy --concurrency 10 --output cdk.out/$0/ -e --app "yarn ts-node --prefer-ts-exts bin/$0.ts" ${1:---all};',
      'deploy:ci': 'cdk deploy --concurrency 10 --ci --all --app "yarn ts-node --prefer-ts-exts $0";',
      'destroy': 'cdk destroy --output cdk.out/$0/ -e --app "yarn ts-node --prefer-ts-exts bin/$0.ts" ${1:---all};',
      'destroy:ci': 'cdk destroy --ci -f --all --output cdk.out/$0/ --app  "yarn  ts-node --prefer-ts-exts $0";',
    });

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

    this.configureLicense();
    this.generateSampleProjenrc('PlatformCdkProject');
  }

  private configureLicense(): void {
    this.package.addField('license', 'SEE LICENSE IN LICENSE.md');

    new TextFile(this, 'LICENSE.md', {
      lines: [
        'Norberhuis Onderneming B.V. - Infrastructure as Code License',
        '',
        'Version 1.4, 18 Januari 2024',
        '',
        'A license agreement is entered into between Norberhuis Onderneming B.V. ("Licensor") and the individual or entity using the software ("Licensee").',
        'See the signed contract for the full agreement and license principal. The signed contract overrules any points made here.',
        '',
        'Below is a summary of the major points related to the license:',
        '',
        '1. The Licensor grants the Licensee a non-exclusive and non-transferable right to use the IaC platform for setting up a platform within the Licensee\'s own environment, hereinafter referred to as "the License". The License exclusively includes a right to use. The Licensee accepts this right to use.',
        '2. The Licensee is authorized to use the License to setup up one AWS Organization. The License is exclusively limited to the configuration of AWS Accounts that are part of this AWS Organization.',
        '3. The Licensor owns all (intellectual property) rights to the IaC Platform and will retain all rights - in the broadest sense of the word - during and after this agreement. This includes, but is not limited to, rights to the source code, compiled code, user interfaces, documentation, ideas, designs, inventions, discoveries, tangible or intangible. This includes, at a minimum, all copyrights, patent rights, trade secret rights, trademark rights, moral rights and other intellectual property rights.',
        '4. This agreement expressly does not intend to transfer rights to the Licensee and does not imply such transfer, but solely grants the Licensee the right to use.',
        '5. The Licensor does not grant a License to sell, distribute, or publish the IaC Platform or derivative works of the IaC Platform without explicit written consent of the Licensor. The Licensee is explicitly prohibited from selling, distributing, or publishing the License, the IaC platform, or derivative works of the IaC platform. The Licensor does not waive any moral rights as mentioned in Article 25 of the Copyright Act.',
        '6. The License is non-transferable and can only be used by the Licensee and its subsidiaries, with the exception of the transfer as described in Article 9 of the license agreement.',
        '7. The Licensor retains the right and also intends to use the IaC Platform and to sell licenses of the IaC Platform to third parties.',
        '8. The Licensee waives all rights and, as necessary upon first request, transfers all ownership to the Licensor arising from suggestions, requests for improvement, recommendations, and other feedback.',
        '9. The Licensee accepts that parts of the IaC Platform may contain open-source software and make use of it. The IaC platform does not contain open-source software with licenses that force other software to open source in case of usage.',
      ],
    });
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
  }
}
