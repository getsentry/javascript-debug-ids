import { join } from 'node:path';
import { describe, test } from 'vitest';
import { type SourceExpect, cleanDir, runCmd, testResults } from '../utils';

const __dirname = new URL('.', import.meta.url).pathname;

async function rolldownTest(path: string, expecting: SourceExpect) {
  const baseDir = join(__dirname, path);
  cleanDir(baseDir, 'dist');
  runCmd('rolldown', ['-c', 'rolldown.config.mjs'], baseDir);
  await testResults(baseDir, expecting);
}

describe('rolldown', () => {
  test('no sourcemaps', async () => {
    await rolldownTest('no-sourcemaps', { numberOfFiles: 2, hasDebugIds: false, hasSourceMapUrl: false });
  });

  test('with sourcemaps', async () => {
    await rolldownTest('with-sourcemaps', { numberOfFiles: 2, hasDebugIds: true, hasSourceMapUrl: true });
  });

  // Fix not released yet: https://github.com/rolldown/rolldown/issues/2208
  // test("with hidden sourcemaps", async () => {
  //    await rolldownTest('with-hidden-sourcemaps', { numberOfFiles: 2, hasDebugIds: true, hasSourceMapUrl: false });
  // });

  test('with inline sourcemaps', async () => {
    await rolldownTest('with-inline-sourcemaps', { numberOfFiles: 2, hasDebugIds: false, hasSourceMapUrl: true });
  });
});
