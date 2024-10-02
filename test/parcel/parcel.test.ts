import { describe, test } from 'vitest';
import { execFileSync } from 'child_process';
import { join } from 'path';
import { TestOptions, cleanDir, testResults } from '../utils';

const __dirname = new URL('.', import.meta.url).pathname;

function parcelTest(path: string, options: TestOptions) {
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

  testResults(baseDir, options);
}

describe('parcel', () => {
  test('with sourcemaps', () => {
    parcelTest('with-sourcemaps', {
      'index.9ed5572c.js': { hasDebugIds: true, hasSourceMapUrl: true },
      'another.3bf0f9d4.js': { hasDebugIds: true, hasSourceMapUrl: true },
    });
  });
});
