import { javascript, TextFile } from 'projen';

/**
 * Adds the Norberhuis Onderneming B.V. Infrastructure as Code License to
 * the given project: sets `package.json#license` to
 * `"SEE LICENSE IN LICENSE.md"` and writes the licence summary to
 * `LICENSE.md`.
 *
 * Use from any project class that should ship the platform licence on
 * `main` (currently `RocketleapPlatformCdkProject` and
 * `RocketleapPlatformMinimalProject`). Library and workload projects
 * intentionally do NOT call this — see their class docs.
 */
export function addRocketleapLicense(project: javascript.NodeProject): void {
  project.package.addField('license', 'SEE LICENSE IN LICENSE.md');

  new TextFile(project, 'LICENSE.md', {
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
