import { describe, test } from 'vitest';
import { join } from 'path';
import { testResults, runCmd, cleanDir, SourceExpect } from '../utils';

const __dirname = new URL('.', import.meta.url).pathname;

async function webpackTest(path: string, expecting: SourceExpect) {
  const baseDir = join(__dirname, path);
  cleanDir(baseDir, 'dist');
  runCmd('webpack', ['--config', 'webpack.config.mjs'], baseDir);
  await testResults(baseDir, expecting);
}

describe('webpack', () => {
  test('no sourcemaps', async () => {
    await webpackTest('no-sourcemaps', { numberOfFiles: 2, hasDebugIds: false, hasSourceMapUrl: false });
  });

  test('with sourcemaps', async () => {
    await webpackTest('with-sourcemaps', { numberOfFiles: 2, hasDebugIds: true, hasSourceMapUrl: true });
  });

  test('with hidden sourcemaps', async () => {
    await webpackTest('with-hidden-sourcemaps', { numberOfFiles: 2, hasDebugIds: true, hasSourceMapUrl: false });
  });

  test('with inline sourcemaps', async () => {
    await webpackTest('with-inline-sourcemaps', { numberOfFiles: 2, hasDebugIds: false, hasSourceMapUrl: true });
  });
});
