import { describe, test } from 'vitest';
import { join } from 'path';
import { testResults, TestOptions, runCmd } from '../utils';

const __dirname = new URL('.', import.meta.url).pathname;

function webpackTest(path: string, results: TestOptions) {
  const baseDir = join(__dirname, path);
  runCmd('webpack', ['--config', 'webpack.config.mjs'], baseDir);

  testResults(baseDir, results);
}

describe('webpack', () => {
  test('no sourcemaps', () => {
    webpackTest('no-sourcemaps', {
      'main.js': { hasDebugIds: false, hasSourceMapUrl: false },
      '559.main.js': { hasDebugIds: false, hasSourceMapUrl: false },
    });
  });

  test('with sourcemaps', () => {
    webpackTest('with-sourcemaps', {
      'main.js': { hasDebugIds: true, hasSourceMapUrl: true },
      '559.main.js': { hasDebugIds: true, hasSourceMapUrl: true },
    });
  });

  test('with hidden sourcemaps', () => {
    webpackTest('with-hidden-sourcemaps', {
      'main.js': { hasDebugIds: true, hasSourceMapUrl: false },
      '559.main.js': { hasDebugIds: true, hasSourceMapUrl: false },
    });
  });

  test('with inline sourcemaps', () => {
    webpackTest('with-inline-sourcemaps', {
      'main.js': { hasDebugIds: false, hasSourceMapUrl: true },
      '559.main.js': { hasDebugIds: false, hasSourceMapUrl: true },
    });
  });
});
