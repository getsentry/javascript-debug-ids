import { describe, test } from 'vitest';
import { join } from 'path';
import { cleanDir, runCmd, TestOptions, testResults } from '../utils';

const __dirname = new URL('.', import.meta.url).pathname;

function rspackTest(path: string, results: TestOptions) {
  const baseDir = join(__dirname, path);
  cleanDir(baseDir, 'dist');
  runCmd('rspack', ['build', '--config', './rspack.config.mjs'], baseDir);
  testResults(baseDir, results);
}

describe('rspack', () => {
  test('no sourcemaps', () => {
    rspackTest('no-sourcemaps', {
      'main.js': { hasDebugIds: false, hasSourceMapUrl: false },
      '109.main.js': { hasDebugIds: false, hasSourceMapUrl: false },
    });
  });

  test('with sourcemaps', () => {
    rspackTest('with-sourcemaps', {
      'main.js': { hasDebugIds: true, hasSourceMapUrl: true },
      '109.main.js': { hasDebugIds: true, hasSourceMapUrl: true },
    });
  });

  test('with hidden sourcemaps', () => {
    rspackTest('with-hidden-sourcemaps', {
      'main.js': { hasDebugIds: true, hasSourceMapUrl: false },
      '109.main.js': { hasDebugIds: true, hasSourceMapUrl: false },
    });
  });

  test('with inline sourcemaps', () => {
    rspackTest('with-inline-sourcemaps', {
      'main.js': { hasDebugIds: false, hasSourceMapUrl: true },
      '109.main.js': { hasDebugIds: false, hasSourceMapUrl: true },
    });
  });
});
