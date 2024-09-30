import { readFileSync } from "fs";
import { join } from "path";
import { expect } from "vitest";

function getSourceFile(...paths: string[]): string {
  const path = join(...paths);
  return readFileSync(path, "utf-8");
}

function getSourceMapDebugID(...paths: string[]): string | undefined {
  const path = join(...paths);
  try {
    return JSON.parse(readFileSync(path, "utf-8")).debugId;
  } catch (_) {
    //
  }
}

export interface TestOptions {
  sourceFiles: string[];
  mapIds?: Record<string, string>;
}

export function testSourcesAndMaps(
  baseDir: string,
  { sourceFiles, mapIds }: TestOptions
) {
  for (const file of sourceFiles) {
    const spanPath = join(baseDir, "snap", file);
    expect(getSourceFile(baseDir, "dist", file)).toMatchFileSnapshot(spanPath);
  }

  for (const [key, value] of Object.entries(mapIds || {})) {
    expect(getSourceMapDebugID(baseDir, "dist", key)).toEqual(value);
  }
}
