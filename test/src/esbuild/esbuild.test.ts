import { join } from 'node:path';
import { describe, test } from 'vitest';
import { type SourceExpect, cleanDir, runCmd, testResults } from '../utils';

const __dirname = new URL('.', import.meta.url).pathname;

async function esbuildTest(path: string, expecting: SourceExpect) {
  const baseDir = join(__dirname, path);
  cleanDir(baseDir, 'dist');
  runCmd('node', ['./build.mjs'], baseDir);
  await testResults(baseDir, expecting);
}

describe('rollup', () => {
  test('no sourcemaps', async () => {
    await esbuildTest('no-sourcemaps', { numberOfFiles: 1, hasDebugIds: false, hasSourceMapUrl: false });
  });

  test('with sourcemaps', async () => {
    await esbuildTest('with-sourcemaps', { numberOfFiles: 1, hasDebugIds: true, hasSourceMapUrl: true });
  });

  test('with external sourcemaps', async () => {
    await esbuildTest('with-external-sourcemaps', { numberOfFiles: 1, hasDebugIds: true, hasSourceMapUrl: false });
  });

  test('with inline sourcemaps', async () => {
    await esbuildTest('with-inline-sourcemaps', { numberOfFiles: 1, hasDebugIds: false, hasSourceMapUrl: true });
  });
});
