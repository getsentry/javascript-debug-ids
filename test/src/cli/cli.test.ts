import { resolve } from 'node:path';
import { describe, test } from 'vitest';
import { runCmd, testResults } from '../utils';

const __dirname = new URL('.', import.meta.url).pathname;

describe('cli', () => {
  test('Adds debug IDs to our build output', async () => {
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
      const repoRoot = resolve(__dirname, '..', '..', '..');
      const pkgRoot = resolve(repoRoot, 'packages', pkg);
      const pkgDist = resolve(pkgRoot, 'dist');

      runCmd('debugids', [pkgDist], repoRoot);

      testResults(pkgRoot, { numberOfFiles: 2, hasDebugIds: true, hasSourceMapUrl: true });
    }
  });
});
