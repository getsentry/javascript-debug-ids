import { join } from 'node:path';
import { describe, test } from 'vitest';
import { type SourceExpect, cleanDir, runCmd, testResults } from '../utils';

const __dirname = new URL('.', import.meta.url).pathname;

async function rollupTest(path: string, expecting: SourceExpect) {
  const baseDir = join(__dirname, path);
  cleanDir(baseDir, 'dist');
  runCmd('rollup', ['-c', 'rollup.config.mjs'], baseDir);
  await testResults(baseDir, expecting);
}

describe('rollup', () => {
  test('no sourcemaps', async () => {
    await rollupTest('no-sourcemaps', { numberOfFiles: 2, hasDebugIds: false, hasSourceMapUrl: false });
  });

  test('with sourcemaps', async () => {
    await rollupTest('with-sourcemaps', { numberOfFiles: 2, hasDebugIds: true, hasSourceMapUrl: true });
  });

  test('with hidden sourcemaps', async () => {
    await rollupTest('with-hidden-sourcemaps', { numberOfFiles: 2, hasDebugIds: true, hasSourceMapUrl: false });
  });

  test('with inline sourcemaps', async () => {
    await rollupTest('with-inline-sourcemaps', { numberOfFiles: 2, hasDebugIds: false, hasSourceMapUrl: true });
  });
});
