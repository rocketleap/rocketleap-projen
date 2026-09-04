import { Project, YamlFile } from 'projen';

/**
 * The rocketleap default configuration written to `.github/settings.yml`
 * when {@link addGitHubSettings} is called without an explicit object.
 *
 * Conventions:
 *
 *  - squash-merge only, delete branch on merge, auto-merge allowed
 *  - `main` protected: PR review required, conversation resolution
 *    required, linear history required, no force push, no deletion
 */
export const ROCKETLEAP_GITHUB_SETTINGS = {
  repository: {
    default_branch: 'main',
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
      name: 'main',
      protection: {
        required_pull_request_reviews: {
          required_approving_review_count: 1,
          dismiss_stale_reviews: true,
          require_code_owner_reviews: false,
        },
        required_status_checks: null,
        required_conversation_resolution: true,
        required_linear_history: true,
        enforce_admins: false,
        restrictions: null,
        allow_force_pushes: false,
        allow_deletions: false,
      },
    },
  ],
};

/**
 * Emits `.github/settings.yml` in the Probot Settings app format so
 * repository settings and default-branch protection are managed
 * declaratively in-repo. Requires the Probot Settings GitHub App to be
 * installed on the org; without it the file is inert.
 *
 * When called without `obj`, writes {@link ROCKETLEAP_GITHUB_SETTINGS}.
 * Pass a full Probot Settings object to override the defaults entirely,
 * or use the returned {@link YamlFile}'s `addOverride(path, value)` to
 * pass through any Probot Settings field (labels, milestones,
 * collaborators, teams, environments, rulesets, autolinks, extra
 * branches, or individual nested fields).
 *
 * The emitted file is marked `linguist-generated` so GitHub Copilot
 * code review skips it.
 */
export function addGitHubSettings(project: Project, obj?: Record<string, unknown>): YamlFile {
  const file = new YamlFile(project, '.github/settings.yml', {
    obj: obj ?? ROCKETLEAP_GITHUB_SETTINGS,
  });

  project.annotateGenerated('/.github/settings.yml');

  return file;
}
