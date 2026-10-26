import { Project } from 'projen';

/**
 * Marks files emitted by the rocketleap template as generated so that
 * GitHub Copilot code review skips them (Copilot honors the Linguist
 * `linguist-generated` attribute) and the diff UI collapses them by
 * default.
 *
 * Projen auto-annotates files it manages directly. This function fills
 * the gap for files emitted by rocketleap template helpers.
 *
 * Trade-off: this is a whole-file exclusion. If a file starts as
 * generated but later becomes hand-edited, remove its entry from
 * `.gitattributes` (or drop the helper that emits it) so review
 * resumes.
 */
export function annotateGeneratedFiles(project: Project): void {
  const globs = [
    '/.github/dependabot.yml',
    '/.github/workflows/action-build.yml',
    '/.github/workflows/action-synth.yml',
    '/.github/workflows/action-deploy.yml',
    '/.github/workflows/action-diff.yml',
    '/.github/workflows/pr-main.yml',
    '/.github/workflows/push-main.yml',
    '/LICENSE.md',
  ];

  for (const glob of globs) {
    project.annotateGenerated(glob);
  }
}
