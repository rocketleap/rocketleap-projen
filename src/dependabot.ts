import { Project, TextFile } from 'projen';

/**
 * Adds a `.github/dependabot.yml` configured for Rocketleap projects.
 *
 *  - monthly schedule, Monday 04:00 Europe/Amsterdam
 *  - one grouped PR (`dependabot` group, pattern `*`) per ecosystem run
 *  - authenticates to the private GitHub Packages registry via
 *    `DEPENDABOT_GITHUB_TOKEN` (org-level secret)
 *
 * Ignored dependencies:
 *
 *  - `eslint`, `@eslint/*`, `eslint-*`, `typescript` — gated on
 *    framework migrations, tracked out-of-band.
 *  - `aws-cdk-lib`, `constructs` — pinned by `rocketleap-projen` to
 *    match `@rocketleap/building-blocks-cdk`'s `peerDependencies`.
 *    Letting dependabot bump them past the pin violates the peer-dep
 *    contract and breaks the version-bump workflow's
 *    `yarn install --immutable` step.
 *
 * Not called automatically by `RocketleapPlatformCdkProject` or
 * `RocketleapLibraryCdkProject`. `RocketleapWorkloadCdkProject` calls
 * it itself; the internal projen wrappers
 * (`@rocketleap/rocketleap-projen-internal`) call it for platform
 * projects.
 *
 * Written as a `TextFile` rather than a `YamlFile` so the
 * `schedule.time` value stays a quoted string. `projen.YamlFile`'s
 * serializer emits `time: 04:00`, which YAML 1.1 parses as a
 * sexagesimal integer; the Dependabot API then rejects the config
 * with "did not match the following type: string".
 */
export function addDependabotConfig(project: Project): void {
  const file = new TextFile(project, '.github/dependabot.yml');

  if (file.marker) {
    file.addLine(`# ${file.marker}`);
    file.addLine('');
  }

  file.addLine('version: 2');
  file.addLine('updates:');
  file.addLine("  - package-ecosystem: 'npm'");
  file.addLine("    directory: '/'");
  file.addLine('    schedule:');
  file.addLine("      interval: 'monthly'");
  file.addLine("      day: 'monday'");
  file.addLine("      time: '04:00'");
  file.addLine('      timezone: Europe/Amsterdam');
  file.addLine('    groups:');
  file.addLine('      dependabot:');
  file.addLine('        patterns:');
  file.addLine("          - '*'");
  file.addLine('    ignore:');
  file.addLine('      - dependency-name: "eslint"');
  file.addLine('      - dependency-name: "@eslint/*"');
  file.addLine('      - dependency-name: "eslint-*"');
  file.addLine('      - dependency-name: "typescript"');
  file.addLine('      # Pinned by rocketleap-projen to match @rocketleap/building-blocks-cdk peer deps.');
  file.addLine('      # Allowing dependabot to bump these would violate the peer-dep contract.');
  file.addLine('      - dependency-name: "aws-cdk-lib"');
  file.addLine('      - dependency-name: "constructs"');
  file.addLine('    registries:');
  file.addLine('      - private');
  file.addLine('');
  file.addLine('registries:');
  file.addLine('  private:');
  file.addLine('    type: npm-registry');
  file.addLine('    url: https://npm.pkg.github.com');
  file.addLine('    token: ${{ secrets.DEPENDABOT_GITHUB_TOKEN }}');
}
