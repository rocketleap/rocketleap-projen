import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { NodeProject } from 'projen/lib/javascript/node-project';

/**
 * Lists the module directories under `src` that expose a barrel `index.ts`.
 */
function listModules(outdir: string): string[] {
  const srcDir = join(outdir, 'src');
  if (!existsSync(srcDir)) {
    return [];
  }
  return readdirSync(srcDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && existsSync(join(srcDir, entry.name, 'index.ts')))
    .map((entry) => entry.name)
    .sort();
}

/**
 * Emits a package.json `exports` map with one entry point per module (like `aws-cdk-lib/aws-s3`)
 * plus `typesVersions` so legacy `moduleResolution: node` consumers resolve the same types.
 */
export function configureModuleExports(project: NodeProject): void {
  const modules = listModules(project.outdir);

  project.package.addField('exports', {
    '.': { types: './dist/index.d.ts', default: './dist/index.js' },
    ...Object.fromEntries(
      modules.map((name) => [`./${name}`, { types: `./dist/${name}/index.d.ts`, default: `./dist/${name}/index.js` }]),
    ),
    './dist/*': { types: './dist/*/index.d.ts', default: './dist/*/index.js' },
    './dist/*.js': './dist/*.js',
    './package.json': './package.json',
  });

  project.package.addField('typesVersions', {
    '*': Object.fromEntries(modules.map((name) => [name, [`dist/${name}/index.d.ts`]])),
  });
}
