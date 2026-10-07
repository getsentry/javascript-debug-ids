import { cp, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { describe, test } from 'vitest';
import { runCmd, testResults } from '../utils';

const __dirname = new URL('.', import.meta.url).pathname;

describe('cli', () => {
  test('Adds debug IDs to our build output', async ({ onTestFinished }) => {
    const testDir = await mkdtemp(resolve(tmpdir(), 'debugids-cli-'));
    onTestFinished(() => rm(testDir, { recursive: true, force: true }));
    const packages = [
      'common',
      'esbuild',
      'rollup',
      'webpack',
      'parcel',
      'rolldown',
      'rspack',
      'vite',
      'node',
      'cli',
      'browser',
    ];

    for (const pkg of packages) {
      const repoRoot = resolve(__dirname, '..', '..', '..', '..');
      const pkgRoot = resolve(testDir, pkg);
      const pkgDist = resolve(pkgRoot, 'dist');
      await cp(resolve(repoRoot, 'packages', pkg, 'dist'), pkgDist, { recursive: true });

      runCmd('debugids', [pkgDist], repoRoot);

      await testResults(pkgRoot, { numberOfFiles: pkg === 'cli' ? 1 : 2, hasDebugIds: true, hasSourceMapUrl: true });
    }
  });
});
