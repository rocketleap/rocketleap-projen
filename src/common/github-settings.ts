import { Project, YamlFile } from 'projen';

/**
 * Options for {@link addGitHubSettings}.
 */
export interface GitHubSettingsOptions {
  /**
   * Repository description surfaced on the GitHub repo page.
   */
  readonly description?: string;

  /**
   * Default branch name.
   *
   * @default 'main'
   */
  readonly defaultBranch?: string;

  /**
   * Status check contexts required to pass before the default branch
   * accepts a merge. Passed through as
   * `branches[].protection.required_status_checks.contexts`.
   *
   * @default - no required status checks
   */
  readonly requiredStatusChecks?: string[];

  /**
   * Number of approving reviews required before the default branch
   * accepts a merge.
   *
   * @default 1
   */
  readonly requiredApprovingReviewCount?: number;
}

/**
 * Emits `.github/settings.yml` in the Probot Settings app format so
 * repository settings and default-branch protection are managed
 * declaratively in-repo. Requires the Probot Settings GitHub App to be
 * installed on the org; without it the file is inert.
 *
 * Defaults enforce the rocketleap conventions:
 *
 *  - squash-merge only, delete branch on merge, auto-merge allowed
 *  - default branch protected: PR review required, conversation
 *    resolution required, linear history required, no force push, no
 *    deletion
 *
 * The emitted file itself is marked `linguist-generated` so GitHub
 * Copilot code review skips it.
 */
export function addGitHubSettings(project: Project, options: GitHubSettingsOptions = {}): void {
  const defaultBranch = options.defaultBranch ?? 'main';
  const reviewCount = options.requiredApprovingReviewCount ?? 1;

  new YamlFile(project, '.github/settings.yml', {
    obj: {
      repository: {
        ...(options.description ? { description: options.description } : {}),
        default_branch: defaultBranch,
        has_issues: true,
        has_projects: false,
        has_wiki: false,
        allow_squash_merge: true,
        allow_merge_commit: false,
        allow_rebase_merge: false,
        squash_merge_commit_title: 'PR_TITLE',
        squash_merge_commit_message: 'PR_BODY',
        delete_branch_on_merge: true,
        allow_auto_merge: true,
        allow_update_branch: true,
      },
      branches: [
        {
          name: defaultBranch,
          protection: {
            required_pull_request_reviews: {
              required_approving_review_count: reviewCount,
              dismiss_stale_reviews: true,
              require_code_owner_reviews: false,
            },
            required_status_checks: options.requiredStatusChecks?.length
              ? { strict: true, contexts: options.requiredStatusChecks }
              : null,
            required_conversation_resolution: true,
            required_linear_history: true,
            enforce_admins: false,
            restrictions: null,
            allow_force_pushes: false,
            allow_deletions: false,
          },
        },
      ],
    },
  });

  project.annotateGenerated('/.github/settings.yml');
}
