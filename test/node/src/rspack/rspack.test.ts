import { join } from 'node:path';
import { promisify } from 'node:util';
import { rspack } from '@rspack/core';
import { describe, expect, test } from 'vitest';
import { type SourceExpect, cleanDir, testResults } from '../utils';

const __dirname = new URL('.', import.meta.url).pathname;

async function rspackTest(path: string, expecting: SourceExpect) {
  const baseDir = join(__dirname, path);
  cleanDir(baseDir, 'dist');
  const { default: config } = await import(join(baseDir, 'rspack.config.mjs'));
  const stats = await promisify(rspack)({ ...config, context: baseDir });
  expect(stats?.hasErrors(), stats?.toString({ all: false, errors: true })).toBe(false);
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
