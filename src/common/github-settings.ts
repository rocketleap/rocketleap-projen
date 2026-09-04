import { Project, YamlFile } from 'projen';

/**
 * Repository settings block of `.github/settings.yml`.
 *
 * Mirrors the GitHub `PATCH /repos/{owner}/{repo}` API fields the
 * Probot Settings app forwards.
 */
export interface GitHubRepositorySettings {
  readonly name?: string;
  readonly description?: string;
  readonly homepage?: string;
  readonly topics?: string[];
  readonly private?: boolean;
  readonly hasIssues?: boolean;
  readonly hasProjects?: boolean;
  readonly hasWiki?: boolean;
  readonly hasDownloads?: boolean;
  readonly isTemplate?: boolean;
  readonly defaultBranch?: string;
  readonly allowSquashMerge?: boolean;
  readonly allowMergeCommit?: boolean;
  readonly allowRebaseMerge?: boolean;
  readonly allowAutoMerge?: boolean;
  readonly allowUpdateBranch?: boolean;
  readonly deleteBranchOnMerge?: boolean;
  readonly squashMergeCommitTitle?: string;
  readonly squashMergeCommitMessage?: string;
  readonly mergeCommitTitle?: string;
  readonly mergeCommitMessage?: string;
  readonly archived?: boolean;
  readonly webCommitSignoffRequired?: boolean;
}

/**
 * A repository label managed by Probot Settings.
 */
export interface GitHubLabel {
  readonly name: string;
  readonly color: string;
  readonly description?: string;
  /**
   * Previous name — used to rename an existing label.
   */
  readonly previously?: string;
}

/**
 * A repository milestone managed by Probot Settings.
 */
export interface GitHubMilestone {
  readonly title: string;
  readonly description?: string;
  readonly state?: string;
  readonly dueOn?: string;
}

/**
 * A repository collaborator managed by Probot Settings.
 */
export interface GitHubCollaborator {
  readonly username: string;
  readonly permission: string;
}

/**
 * A repository team managed by Probot Settings.
 */
export interface GitHubTeam {
  readonly name: string;
  readonly permission: string;
}

/**
 * `required_pull_request_reviews` block of a branch protection rule.
 */
export interface GitHubRequiredPullRequestReviews {
  readonly requiredApprovingReviewCount?: number;
  readonly dismissStaleReviews?: boolean;
  readonly requireCodeOwnerReviews?: boolean;
  readonly requireLastPushApproval?: boolean;
}

/**
 * `required_status_checks` block of a branch protection rule.
 */
export interface GitHubRequiredStatusChecks {
  readonly strict?: boolean;
  readonly contexts?: string[];
}

/**
 * Branch protection rule.
 */
export interface GitHubBranchProtection {
  readonly requiredPullRequestReviews?: GitHubRequiredPullRequestReviews;
  readonly requiredStatusChecks?: GitHubRequiredStatusChecks;
  readonly requiredConversationResolution?: boolean;
  readonly requiredLinearHistory?: boolean;
  readonly requiredSignatures?: boolean;
  readonly enforceAdmins?: boolean;
  readonly allowForcePushes?: boolean;
  readonly allowDeletions?: boolean;
  readonly blockCreations?: boolean;
  readonly lockBranch?: boolean;
  readonly allowForkSyncing?: boolean;
}

/**
 * A protected branch.
 */
export interface GitHubBranch {
  readonly name: string;
  readonly protection?: GitHubBranchProtection;
}

/**
 * An autolink reference.
 */
export interface GitHubAutolink {
  readonly keyPrefix: string;
  readonly urlTemplate: string;
  readonly isAlphanumeric?: boolean;
}

/**
 * Options for {@link addGitHubSettings}. Every field is an optional
 * pass-through into `.github/settings.yml`. When the whole options
 * object is omitted, {@link ROCKETLEAP_GITHUB_SETTINGS} is written
 * unchanged.
 *
 * For sections not modeled here (environments, rulesets, ...), call
 * `addOverride(path, value)` on the returned {@link YamlFile}.
 */
export interface GitHubSettingsOptions {
  readonly repository?: GitHubRepositorySettings;
  readonly labels?: GitHubLabel[];
  readonly milestones?: GitHubMilestone[];
  readonly collaborators?: GitHubCollaborator[];
  readonly teams?: GitHubTeam[];
  readonly branches?: GitHubBranch[];
  readonly autolinks?: GitHubAutolink[];
}

/**
 * The rocketleap default configuration written to `.github/settings.yml`
 * when {@link addGitHubSettings} is called without options.
 *
 * Conventions:
 *
 *  - squash-merge only, delete branch on merge, auto-merge allowed
 *  - `main` protected: PR review required, conversation resolution
 *    required, linear history required, no force push, no deletion
 */
export const ROCKETLEAP_GITHUB_SETTINGS: GitHubSettingsOptions = {
  repository: {
    defaultBranch: 'main',
    hasIssues: true,
    hasProjects: false,
    hasWiki: false,
    allowSquashMerge: true,
    allowMergeCommit: false,
    allowRebaseMerge: false,
    squashMergeCommitTitle: 'PR_TITLE',
    squashMergeCommitMessage: 'PR_BODY',
    deleteBranchOnMerge: true,
    allowAutoMerge: true,
    allowUpdateBranch: true,
  },
  branches: [
    {
      name: 'main',
      protection: {
        requiredPullRequestReviews: {
          requiredApprovingReviewCount: 1,
          dismissStaleReviews: true,
          requireCodeOwnerReviews: false,
        },
        requiredConversationResolution: true,
        requiredLinearHistory: true,
        enforceAdmins: false,
        allowForcePushes: false,
        allowDeletions: false,
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
 * When called without options, writes {@link ROCKETLEAP_GITHUB_SETTINGS}.
 * Pass typed options to override the defaults, or use the returned
 * {@link YamlFile}'s `addOverride(path, value)` to pass through any
 * Probot Settings field not modeled by {@link GitHubSettingsOptions}
 * (environments, rulesets, ...).
 *
 * The emitted file is marked `linguist-generated` so GitHub Copilot
 * code review skips it.
 */
export function addGitHubSettings(project: Project, options?: GitHubSettingsOptions): YamlFile {
  const file = new YamlFile(project, '.github/settings.yml', {
    obj: toProbotSchema(options ?? ROCKETLEAP_GITHUB_SETTINGS),
  });

  project.annotateGenerated('/.github/settings.yml');

  return file;
}

function toProbotSchema(options: GitHubSettingsOptions): Record<string, unknown> {
  return prune({
    repository: options.repository ? camelToSnake(options.repository) : undefined,
    labels: options.labels?.map(camelToSnake),
    milestones: options.milestones?.map(camelToSnake),
    collaborators: options.collaborators?.map(camelToSnake),
    teams: options.teams?.map(camelToSnake),
    branches: options.branches?.map((b) => ({
      name: b.name,
      protection: b.protection ? branchProtectionToSnake(b.protection) : undefined,
    })),
    autolinks: options.autolinks?.map(camelToSnake),
  });
}

function branchProtectionToSnake(p: GitHubBranchProtection): Record<string, unknown> {
  return prune({
    required_pull_request_reviews: p.requiredPullRequestReviews
      ? camelToSnake(p.requiredPullRequestReviews)
      : undefined,
    required_status_checks: p.requiredStatusChecks ? camelToSnake(p.requiredStatusChecks) : null,
    required_conversation_resolution: p.requiredConversationResolution,
    required_linear_history: p.requiredLinearHistory,
    required_signatures: p.requiredSignatures,
    enforce_admins: p.enforceAdmins,
    allow_force_pushes: p.allowForcePushes,
    allow_deletions: p.allowDeletions,
    block_creations: p.blockCreations,
    lock_branch: p.lockBranch,
    allow_fork_syncing: p.allowForkSyncing,
    restrictions: null,
  });
}

function camelToSnake(obj: object): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined) continue;
    const snake = key.replace(/[A-Z]/g, (m) => `_${m.toLowerCase()}`);
    out[snake] = value;
  }
  return out;
}

function prune(obj: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) out[key] = value;
  }
  return out;
}
