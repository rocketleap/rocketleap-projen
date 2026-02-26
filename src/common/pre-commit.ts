import { Project, TextFile } from 'projen';

/**
 * Configuration for a pre-commit hook
 */
export interface PreCommitHook {
  /**
   * The hook identifier
   */
  readonly id: string;

  /**
   * The display name for the hook
   */
  readonly name: string;

  /**
   * The command to execute
   */
  readonly entry: string;

  /**
   * Whether to pass filenames to the hook
   * @default true
   */
  readonly passFilenames?: boolean;
}

/**
 * Pre-commit hooks for CDK projects
 */
export const CDK_PRE_COMMIT_HOOKS: PreCommitHook[] = [
  { id: 'yarn-clean', name: 'Clean', entry: 'sh -c "CI=true yarn clean"' },
  { id: 'yarn-package', name: 'Packages', entry: 'sh -c "CI=true yarn"' },
  { id: 'yarn-lint', name: 'Lint', entry: 'sh -c "CI=true yarn lint:ci"' },
  { id: 'yarn-build', name: 'Build', entry: 'sh -c "CI=true tsc"' },
  { id: 'yarn-test', name: 'Tests', entry: 'sh -c "CI=true yarn test:ci"' },
];

/**
 * Pre-commit hooks for JSII library projects
 */
export const JSII_PRE_COMMIT_HOOKS: PreCommitHook[] = [
  { id: 'release', name: 'Release', entry: 'sh -c "npx projen release"' },
];

/**
 * Creates a .pre-commit-config.yaml file with the specified hooks
 */
export function createPreCommitConfig(project: Project, hooks: PreCommitHook[]): void {
  const hooksYaml = hooks
    .map((hook) => {
      const lines = [
        `      - id: ${hook.id}`,
        `        name: ${hook.name}`,
        `        entry: ${hook.entry}`,
        `        language: system`,
      ];
      if (hook.passFilenames === false) {
        lines.push('        pass_filenames: false');
      }
      return lines.join('\n');
    })
    .join('\n');

  new TextFile(project, '.pre-commit-config.yaml', {
    lines: [
      `repos:
  - repo: local
    hooks:
${hooksYaml}
`,
    ],
  });
}
