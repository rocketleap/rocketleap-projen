import { awscdk, javascript, JsonPatch, TextFile } from 'projen';

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
   * @default '0.105.0-RC1'
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
  /**
   * The company identifier.
   */
  public readonly company: string;

  /**
   * The project name.
   */
  public readonly projectName: string;

  constructor(options: RocketleapCdkProjectOptions) {
    const company = options.company;
    const project = options.project;
    const cdkVersion = options.cdkVersion ?? '2.233.0';
    const constructVersion = options.constructVersion ?? '10.4.4';
    const buildingBlocksVersion = options.buildingBlocksVersion ?? '0.105.0';

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

      packageManager: javascript.NodePackageManager.YARN_BERRY,

      licensed: false,
      yarnBerryOptions: {
        version: '4.9.2',
        yarnRcOptions: {
          compressionLevel: 'mixed',
          enableGlobalCache: true,
          nodeLinker: javascript.YarnNodeLinker.NODE_MODULES,
          npmRegistries: {
            'https://npm.pkg.github.com/': {
              npmAuthToken: '${GITHUB_TOKEN}',
            },
          },
          npmScopes: {
            [company]: {
              npmRegistryServer: 'https://npm.pkg.github.com/',
              npmAlwaysAuth: true,
            },
          },
          yarnPath: '.yarn/releases/yarn-4.9.2.cjs',
        },
      },

      tsconfig: {
        compilerOptions: {
          rootDir: '.',
          outDir: 'dist',
        },
        include: ['bin/**/*ts', 'src/**/*.ts'],
        exclude: ['cdk.out', 'node_modules'],
      },

      eslint: true,
      eslintOptions: {
        dirs: [],
        ignorePatterns: [
          '*.js',
          '*.d.ts',
          'node_modules/',
          '*.generated.ts',
          'src/**/*-handler/index.ts', // ignore handler files.
        ],
        prettier: true,
      },

      prettier: true,
      prettierOptions: {
        settings: {
          printWidth: 120,
          singleQuote: true,
          trailingComma: javascript.TrailingComma.ALL,
          semi: true,
          quoteProps: javascript.QuoteProps.CONSISTENT,
        },
        ignoreFileOptions: {
          ignorePatterns: [
            'dist',
            'node_modules',
            'coverage',
            'cdk.out',
            '.claude',
            '.yarn',
            '.pnp.cjs',
            '.eslintrc.json',
            '.pre-commit-config.yaml',
            'cdk.json',
            'tsconfig.dev.json',
            'tsconfig.json',
          ],
        },
      },
      gitignore: [
        // IDE
        '.code',
        '.idea',
        // Typescript files
        '*.d.ts',
        '*.js',
        '*.js.map',
        'dist',
        // Python
        'venv',
        '__pycache__/',
        // CDK asset staging directory
        '.cdk.staging',
        'cdk.out',
        // Yarn
        '.pnp.*',
        '.yarn/*',
        '!.yarn/patches',
        '!.yarn/plugins',
        '!.yarn/releases',
        '!.yarn/sdks',
        // Rocketleap release files
        'release.diff',
        // AI
        '.claude',
      ],
    });

    this.company = company;
    this.projectName = project;

    this.configurePackageJson();
    this.configureEslint();
    this.createPreCommitConfig();
    this.configureCdkJson();
  }

  private configurePackageJson(): void {
    this.addScripts({
      format: "prettier --write . '!**/*.{js,d.ts}'",
      'format:ci': "prettier -c . '!**/*.{js,d.ts}'",
      lint: 'eslint --fix .',
      'lint:ci': 'eslint --max-warnings=0 .',
      build: 'tsc',
      clean: 'find bin src test -type f \\( -name "*.js" -o -name "*.d.ts" \\) -delete',
      watch: 'tsc -w',
      test: 'jest',
      'test:ci': 'jest --ci --maxWorkers=2',
      'test:update-snapshots': 'jest --updateSnapshot',
      synth: 'cdk synth --output cdk.out/$0/ --app "yarn ts-node --prefer-ts-exts bin/$0.ts";',
      bootstrap: 'cdk bootstrap --output cdk.out/$0/ --app "yarn ts-node --prefer-ts-exts bin/$0.ts";',
      list: 'cdk list --output cdk.out/$0/ --app "yarn ts-node --prefer-ts-exts bin/$0.ts";',
      diff: 'cdk diff --output cdk.out/$0/ --app "yarn ts-node --prefer-ts-exts bin/$0.ts" ${1:---all};',
      'diff:ci': 'cdk diff --ci --app "yarn ts-node --prefer-ts-exts $0";',
      deploy: 'cdk deploy --output cdk.out/$0/ --app "yarn ts-node --prefer-ts-exts bin/$0.ts" ${1:---all};',
      'deploy:ci': 'cdk deploy --ci --all --require-approval never --app "yarn ts-node --prefer-ts-exts $0";',
      destroy: 'cdk destroy --output cdk.out/$0/ --app "yarn ts-node --prefer-ts-exts bin/$0.ts" ${1:---all};',
      'destroy:ci': 'cdk destroy --ci -f --all --output cdk.out/$0/ --app  "yarn  ts-node --prefer-ts-exts $0";',
    });

    this.package.addDevDeps(...['eslint@^8', 'eslint-plugin-jest@^28.x.x']);
  }

  private configureEslint(): void {
    this.eslint!.addExtends(
      ...[
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/typescript',
        'plugin:jest/recommended',
        'prettier',
        'plugin:prettier/recommended',
      ],
    );
    this.eslint!.addPlugins(...['@typescript-eslint', 'import', 'jest', 'prettier']);
    this.eslint!.addOverride({
      files: ['*.test.ts'],
      rules: {
        'jest/expect-expect': 'off',
      },
    });
  }

  private createPreCommitConfig(): void {
    new TextFile(this, '.pre-commit-config.yaml', {
      lines: [
        `repos:
  - repo: local
    hooks:
      - id: yarn-package
        name: Packages
        entry: sh -c "CI=true yarn"
        language: system
      - id: yarn-format
        name: Format
        entry: sh -c "CI=true yarn format:ci"
        language: system
      - id: yarn-lint
        name: Lint
        entry: sh -c "CI=true yarn lint:ci"
        language: system
      - id: yarn-build
        name: Build
        entry: sh -c "CI=true yarn build"
        language: system
      - id: yarn-test
        name: Tests
        entry: sh -c "CI=true yarn test:ci"
        language: system
  `,
      ],
    });
  }

  private configureCdkJson(): void {
    this.cdkConfig.json.patch(JsonPatch.add('/versionReporting', false));
  }
}
