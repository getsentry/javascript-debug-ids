import { join } from 'node:path';
import { describe, test } from 'vitest';
import { type SourceExpect, cleanDir, runCmd, testResults } from '../utils';

const __dirname = new URL('.', import.meta.url).pathname;

async function parcelTest(path: string, options: SourceExpect) {
  const baseDir = join(__dirname, path);
  cleanDir(baseDir, 'dist');

  // Parcel currently crashes in Node v22
  // https://github.com/parcel-bundler/parcel/issues/9926
  if (process.version.startsWith('v22.')) {
    return;
  }

  runCmd(
    'parcel',
    [
      'build',
      '--no-cache',
      '--dist-dir',
      './dist',
      '--config',
      './.parcelrc',
      '--cache-dir',
      './.parcel-cache',
      './src/index.html',
    ],
    baseDir,
  );

  await testResults(baseDir, options);
}

describe('parcel', () => {
  test('with sourcemaps', async () => {
    await parcelTest('with-sourcemaps', { numberOfFiles: 2, hasDebugIds: true, hasSourceMapUrl: true });
  });
});
