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
 * `required_pull_request_reviews` block of a classic branch protection rule.
 */
export interface GitHubRequiredPullRequestReviews {
  readonly requiredApprovingReviewCount?: number;
  readonly dismissStaleReviews?: boolean;
  readonly requireCodeOwnerReviews?: boolean;
  readonly requireLastPushApproval?: boolean;
}

/**
 * `required_status_checks` block of a classic branch protection rule.
 */
export interface GitHubRequiredStatusChecks {
  readonly strict?: boolean;
  readonly contexts?: string[];
}

/**
 * Classic branch protection rule. Superseded by rulesets for new
 * rocketleap repos; kept for callers that still want the classic
 * mechanism.
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
 * A protected branch (classic branch protection).
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
 * `pull_request` rule parameters.
 */
export interface GitHubRulesetPullRequestParameters {
  readonly requiredApprovingReviewCount?: number;
  readonly dismissStaleReviewsOnPush?: boolean;
  readonly requireCodeOwnerReview?: boolean;
  readonly requireLastPushApproval?: boolean;
  readonly requiredReviewThreadResolution?: boolean;
  readonly requireExtraApprovalForUnattributedChanges?: boolean;
  readonly allowedMergeMethods?: string[];
}

/**
 * A single status check required by a `required_status_checks` rule.
 */
export interface GitHubRulesetStatusCheck {
  readonly context: string;
  readonly integrationId?: number;
}

/**
 * `required_status_checks` rule parameters.
 */
export interface GitHubRulesetRequiredStatusChecksParameters {
  readonly strictRequiredStatusChecksPolicy?: boolean;
  readonly doNotEnforceOnCreate?: boolean;
  readonly requiredStatusChecks?: GitHubRulesetStatusCheck[];
}

/**
 * `copilot_code_review` rule parameters.
 */
export interface GitHubRulesetCopilotCodeReviewParameters {
  readonly reviewOnPush?: boolean;
  readonly reviewDraftPullRequests?: boolean;
}

/**
 * A rule inside a GitHub ruleset. Populate the parameters block that
 * matches `type`. Types without parameters (`deletion`,
 * `non_fast_forward`, ...) use only `type`.
 */
export interface GitHubRulesetRule {
  readonly type: string;
  readonly pullRequest?: GitHubRulesetPullRequestParameters;
  readonly requiredStatusChecks?: GitHubRulesetRequiredStatusChecksParameters;
  readonly copilotCodeReview?: GitHubRulesetCopilotCodeReviewParameters;
}

/**
 * `conditions.ref_name` block of a ruleset.
 */
export interface GitHubRulesetRefNameConditions {
  readonly include?: string[];
  readonly exclude?: string[];
}

/**
 * Conditions restricting when a ruleset applies.
 */
export interface GitHubRulesetConditions {
  readonly refName?: GitHubRulesetRefNameConditions;
}

/**
 * A GitHub ruleset. See
 * https://docs.github.com/en/rest/repos/rules for the underlying API.
 */
export interface GitHubRuleset {
  readonly name: string;
  /** `branch` or `tag`. */
  readonly target: string;
  /** `active`, `evaluate`, or `disabled`. */
  readonly enforcement: string;
  readonly conditions?: GitHubRulesetConditions;
  readonly rules?: GitHubRulesetRule[];
}

/**
 * Options for {@link addGitHubSettings}. Every field is an optional
 * pass-through into `.github/settings.yml`. When the whole options
 * object is omitted, {@link ROCKETLEAP_GITHUB_SETTINGS} is written
 * unchanged.
 *
 * For sections not modeled here (environments, deploy keys, ...), call
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
  readonly rulesets?: GitHubRuleset[];
}

/**
 * The rocketleap default configuration written to `.github/settings.yml`
 * when {@link addGitHubSettings} is called without options. Mirrors the
 * pattern applied to `-cdk` platform repos as of 2026-09.
 *
 * Repository conventions:
 *
 *  - default branch `dev`
 *  - issues, projects, wiki off (bugs and features go to rocketleap/Roadmap)
 *  - squash-merge only, delete branch on merge, auto-merge allowed
 *  - squash commit title from `COMMIT_OR_PR_TITLE`, message from
 *    `COMMIT_MESSAGES`
 *
 * Enforcement is a Ruleset (`Development`, active) targeting the default
 * branch: PR required with squash-only merges, stale-review dismissal,
 * thread resolution required, extra approval for unattributed changes,
 * `Build / build` status check strict, deletion and force-push blocked,
 * Copilot code review on the PR (not on push, not on drafts).
 */
export const ROCKETLEAP_GITHUB_SETTINGS: GitHubSettingsOptions = {
  repository: {
    defaultBranch: 'dev',
    hasIssues: false,
    hasProjects: false,
    hasWiki: false,
    allowSquashMerge: true,
    allowMergeCommit: false,
    allowRebaseMerge: false,
    squashMergeCommitTitle: 'COMMIT_OR_PR_TITLE',
    squashMergeCommitMessage: 'COMMIT_MESSAGES',
    deleteBranchOnMerge: true,
    allowAutoMerge: true,
    allowUpdateBranch: true,
  },
  rulesets: [
    {
      name: 'Development',
      target: 'branch',
      enforcement: 'active',
      conditions: {
        refName: { include: ['~DEFAULT_BRANCH'], exclude: [] },
      },
      rules: [
        { type: 'deletion' },
        { type: 'non_fast_forward' },
        {
          type: 'pull_request',
          pullRequest: {
            requiredApprovingReviewCount: 0,
            dismissStaleReviewsOnPush: true,
            requireCodeOwnerReview: false,
            requireLastPushApproval: false,
            requiredReviewThreadResolution: true,
            requireExtraApprovalForUnattributedChanges: true,
            allowedMergeMethods: ['squash'],
          },
        },
        {
          type: 'required_status_checks',
          requiredStatusChecks: {
            strictRequiredStatusChecksPolicy: true,
            doNotEnforceOnCreate: false,
            requiredStatusChecks: [{ context: 'Build / build' }],
          },
        },
        {
          type: 'copilot_code_review',
          copilotCodeReview: {
            reviewOnPush: false,
            reviewDraftPullRequests: false,
          },
        },
      ],
    },
  ],
};

/**
 * Emits `.github/settings.yml` in the Probot Settings app format so
 * repository settings and branch rulesets are managed declaratively
 * in-repo. Requires the Probot Settings GitHub App to be installed on
 * the org; without it the file is inert.
 *
 * When called without options, writes {@link ROCKETLEAP_GITHUB_SETTINGS}.
 * Pass typed options to override the defaults, or use the returned
 * {@link YamlFile}'s `addOverride(path, value)` to pass through any
 * Probot Settings field not modeled by {@link GitHubSettingsOptions}
 * (environments, ...).
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
    rulesets: options.rulesets?.map(rulesetToSnake),
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

function rulesetToSnake(r: GitHubRuleset): Record<string, unknown> {
  return prune({
    name: r.name,
    target: r.target,
    enforcement: r.enforcement,
    conditions: r.conditions ? conditionsToSnake(r.conditions) : undefined,
    rules: r.rules?.map(ruleToSnake),
  });
}

function conditionsToSnake(c: GitHubRulesetConditions): Record<string, unknown> {
  return prune({
    ref_name: c.refName ? camelToSnake(c.refName) : undefined,
  });
}

function ruleToSnake(rule: GitHubRulesetRule): Record<string, unknown> {
  const parameters = rule.pullRequest
    ? camelToSnake(rule.pullRequest)
    : rule.requiredStatusChecks
      ? requiredStatusChecksParametersToSnake(rule.requiredStatusChecks)
      : rule.copilotCodeReview
        ? camelToSnake(rule.copilotCodeReview)
        : undefined;

  return prune({
    type: rule.type,
    parameters,
  });
}

function requiredStatusChecksParametersToSnake(
  p: GitHubRulesetRequiredStatusChecksParameters,
): Record<string, unknown> {
  return prune({
    strict_required_status_checks_policy: p.strictRequiredStatusChecksPolicy,
    do_not_enforce_on_create: p.doNotEnforceOnCreate,
    required_status_checks: p.requiredStatusChecks?.map(camelToSnake),
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
