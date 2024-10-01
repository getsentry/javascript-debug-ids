import { describe, test } from "vitest";
import { join } from "path";
import { runCmd, TestOptions, testSourcesAndMaps } from "../utils";

const __dirname = new URL(".", import.meta.url).pathname;

function esbuildTest(path: string, options: TestOptions) {
  const baseDir = join(__dirname, path);
  runCmd("node", ["./build.mjs"], baseDir);

  testSourcesAndMaps(baseDir, options);
}

describe("rollup", () => {
  test("no sourcemaps", () => {
    esbuildTest("no-sourcemaps", {
      "main.js": { hasDebugIds: false, hasSourceMapUrl: false },
    });
  });

  test("with sourcemaps", () => {
    esbuildTest("with-sourcemaps", {
      "main.js": { hasDebugIds: true, hasSourceMapUrl: true },
    });
  });

  test("with external sourcemaps", () => {
    esbuildTest("with-external-sourcemaps", {
      "main.js": { hasDebugIds: true, hasSourceMapUrl: false },
    });
  });

  test("with inline sourcemaps", () => {
    esbuildTest("with-inline-sourcemaps", {
      "main.js": { hasDebugIds: false, hasSourceMapUrl: true },
    });
  });
});
