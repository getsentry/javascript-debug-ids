import { describe, test } from 'vitest';
import { join } from 'path';
import { cleanDir, runCmd, TestOptions, testResults } from '../utils';

const __dirname = new URL('.', import.meta.url).pathname;

function esbuildTest(path: string, results: TestOptions) {
  const baseDir = join(__dirname, path);
  cleanDir(baseDir, 'dist');
  runCmd('node', ['./build.mjs'], baseDir);
  testResults(baseDir, results);
}

describe('rollup', () => {
  test('no sourcemaps', () => {
    esbuildTest('no-sourcemaps', {
      'main.js': { hasDebugIds: false, hasSourceMapUrl: false },
    });
  });

  test('with sourcemaps', () => {
    esbuildTest('with-sourcemaps', {
      'main.js': { hasDebugIds: true, hasSourceMapUrl: true },
    });
  });

  test('with external sourcemaps', () => {
    esbuildTest('with-external-sourcemaps', {
      'main.js': { hasDebugIds: true, hasSourceMapUrl: false },
    });
  });

  test('with inline sourcemaps', () => {
    esbuildTest('with-inline-sourcemaps', {
      'main.js': { hasDebugIds: false, hasSourceMapUrl: true },
    });
  });
});
