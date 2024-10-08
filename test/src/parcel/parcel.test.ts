import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
import { describe, test } from 'vitest';
import { type SourceExpect, cleanDir, testResults } from '../utils';

const __dirname = new URL('.', import.meta.url).pathname;

async function parcelTest(path: string, options: SourceExpect) {
  const baseDir = join(__dirname, path);
  cleanDir(baseDir, 'dist');
  execFileSync(
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
    {
      cwd: baseDir,
      stdio: 'inherit',
    },
  );

  await testResults(baseDir, options);
}

describe('parcel', () => {
  test('with sourcemaps', async () => {
    await parcelTest('with-sourcemaps', { numberOfFiles: 2, hasDebugIds: true, hasSourceMapUrl: true });
  });
});
