import { execFileSync } from 'child_process';
import { readFileSync, rmSync } from 'fs';
import { join } from 'path';
import { expect } from 'vitest';

interface SourceDetails {
  debugId?: string;
  hasSourceMapUrl: boolean;
}

function parseDetailsFromSource(input: string): SourceDetails {
  const match = input.match(/(\/\/# debugId=([a-fA-F0-9-]+))?\s*(\/\/# sourceMappingURL=.+)?\s*$/);
  return match ? { debugId: match[2], hasSourceMapUrl: !!match[3] } : { hasSourceMapUrl: false };
}

function getDebugIDFromSourcemap(...paths: string[]): string | undefined {
  const path = join(...paths);
  try {
    return JSON.parse(readFileSync(path, 'utf-8')).debugId;
  } catch (_) {
    //
  }
}

interface SourceExpect {
  hasDebugIds: boolean;
  hasSourceMapUrl: boolean;
}

export type TestOptions = Record<string, SourceExpect>;

export function cleanDir(...paths: string[]) {
  const dir = join(...paths);
  // remove all files in the dist directory
  rmSync(dir, { recursive: true, force: true });
}

export function testResults(baseDir: string, results: TestOptions) {
  for (const [file, expecting] of Object.entries(results)) {
    const source = readFileSync(join(baseDir, 'dist', file), 'utf-8');
    const { debugId, hasSourceMapUrl } = parseDetailsFromSource(source);
    const mapDebugId = getDebugIDFromSourcemap(baseDir, 'dist', `${file}.map`);

    if (expecting.hasDebugIds) {
      expect(debugId, 'Source debugId').toBeDefined();
      expect(debugId, 'debugIds should match').toEqual(mapDebugId);
    } else {
      expect(debugId, 'Source debugId').toBeUndefined();
    }

    expect(hasSourceMapUrl).toEqual(expecting.hasSourceMapUrl);
  }
}

export function runCmd(cmd: string, args: string[], cwd: string) {
  return execFileSync(cmd, args, { cwd, stdio: process.env.DEBUG ? 'inherit' : 'ignore' });
}
