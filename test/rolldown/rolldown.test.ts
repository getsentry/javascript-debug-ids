import { describe, test } from 'vitest';
import { join } from 'path';
import { cleanDir, runCmd, TestOptions, testResults } from '../utils';

const __dirname = new URL('.', import.meta.url).pathname;

function rolldownTest(path: string, results: TestOptions) {
  const baseDir = join(__dirname, path);
  cleanDir(baseDir, 'dist');
  runCmd('rolldown', ['-c', 'rolldown.config.mjs'], baseDir);
  testResults(baseDir, results);
}

describe('rolldown', () => {
  test('no sourcemaps', () => {
    rolldownTest('no-sourcemaps', {
      'main.js': { hasDebugIds: false, hasSourceMapUrl: false },
      'another-xPvAO7_p.js': { hasDebugIds: false, hasSourceMapUrl: false },
    });
  });

  test('with sourcemaps', () => {
    rolldownTest('with-sourcemaps', {
      'main.js': { hasDebugIds: true, hasSourceMapUrl: true },
      'another-xPvAO7_p.js': { hasDebugIds: true, hasSourceMapUrl: true },
    });
  });

  // Fix not released yet: https://github.com/rolldown/rolldown/issues/2208
  // test("with hidden sourcemaps", () => {
  //   rolldownTest("with-hidden-sourcemaps", {
  //     sourceFiles: ["main.js", "another-xPvAO7_p.js"],
  //     mapIds: {
  //       "main.js.map": "a11c393e-e161-4ccf-903d-83ac2c41354d",
  //       "another-xPvAO7_p.js.map": "21b62a8a-8ef3-4a10-847e-d766353e713b",
  //     },
  //   });
  // });

  test('with inline sourcemaps', () => {
    rolldownTest('with-inline-sourcemaps', {
      'main.js': { hasDebugIds: false, hasSourceMapUrl: true },
      'another-xPvAO7_p.js': { hasDebugIds: false, hasSourceMapUrl: true },
    });
  });
});
