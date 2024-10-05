import { describe, test } from 'vitest';
import { join } from 'path';
import { cleanDir, runCmd, SourceExpect, testResults } from '../utils';

const __dirname = new URL('.', import.meta.url).pathname;

async function rspackTest(path: string, expecting: SourceExpect) {
  const baseDir = join(__dirname, path);
  cleanDir(baseDir, 'dist');
  runCmd('rspack', ['build', '--config', './rspack.config.mjs'], baseDir);
  await testResults(baseDir, expecting);
}

describe('rspack', () => {
  test('no sourcemaps', async () => {
    await rspackTest('no-sourcemaps', { numberOfFiles: 2, hasDebugIds: false, hasSourceMapUrl: false });
  });

  test('with sourcemaps', async () => {
    await rspackTest('with-sourcemaps', { numberOfFiles: 2, hasDebugIds: true, hasSourceMapUrl: true });
  });

  test('with hidden sourcemaps', async () => {
    await rspackTest('with-hidden-sourcemaps', { numberOfFiles: 2, hasDebugIds: true, hasSourceMapUrl: false });
  });

  test('with inline sourcemaps', async () => {
    await rspackTest('with-inline-sourcemaps', { numberOfFiles: 2, hasDebugIds: false, hasSourceMapUrl: true });
  });
});
