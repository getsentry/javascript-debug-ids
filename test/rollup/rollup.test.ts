import { describe, test } from "vitest";
import { join } from "path";
import { runCmd, TestOptions, testResults } from "../utils";

const __dirname = new URL(".", import.meta.url).pathname;

function rollupTest(path: string, results: TestOptions) {
  const baseDir = join(__dirname, path);
  runCmd("rollup", ["-c", "rollup.config.mjs"], baseDir);

  testResults(baseDir, results);
}

describe("rollup", () => {
  test("no sourcemaps", () => {
    rollupTest("no-sourcemaps", {
      "main.js": { hasDebugIds: false, hasSourceMapUrl: false },
      "another-CR7-3Cjc.js": { hasDebugIds: false, hasSourceMapUrl: false },
    });
  });

  test("with sourcemaps", () => {
    rollupTest("with-sourcemaps", {
      "main.js": { hasDebugIds: true, hasSourceMapUrl: true },
      "another-CR7-3Cjc.js": { hasDebugIds: true, hasSourceMapUrl: true },
    });
  });

  test("with hidden sourcemaps", () => {
    rollupTest("with-hidden-sourcemaps", {
      "main.js": { hasDebugIds: true, hasSourceMapUrl: false },
      "another-CR7-3Cjc.js": { hasDebugIds: true, hasSourceMapUrl: false },
    });
  });

  test("with inline sourcemaps", () => {
    rollupTest("with-inline-sourcemaps", {
      "main.js": { hasDebugIds: false, hasSourceMapUrl: true },
      "another-CR7-3Cjc.js": { hasDebugIds: false, hasSourceMapUrl: true },
    });
  });
});
