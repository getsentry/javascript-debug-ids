import { describe, test } from 'vitest';
import { testResults } from '../utils';
import { resolve } from 'path';
import { walk } from '../../src/common';

const __dirname = new URL('.', import.meta.url).pathname;

describe('cli', () => {
  test('our build output has debug IDs', async () => {
    const srcDir = resolve(__dirname, '..', '..', 'src');
    const sourceFiles = await walk(srcDir, ['.ts']);

    // We have both cjs and esm output but the cli is only built to cjs
    const numberOfFiles = sourceFiles.length * 2 - 1;

    const baseDir = resolve(__dirname, '..', '..');
    testResults(baseDir, { numberOfFiles: 1, hasDebugIds: true, hasSourceMapUrl: true });
  });
});
