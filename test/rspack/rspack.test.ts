import { describe, test } from "vitest";
import { join } from "path";
import { runCmd, TestOptions, testSourcesAndMaps } from "../utils";

const __dirname = new URL(".", import.meta.url).pathname;

function rspackTest(path: string, options: TestOptions) {
  const baseDir = join(__dirname, path);
  runCmd("rspack", ["build", "--config", "./rspack.config.mjs"], baseDir);

  testSourcesAndMaps(baseDir, options);
}

describe("rspack", () => {
  test("no sourcemaps", () => {
    rspackTest("no-sourcemaps", {
      "main.js": { hasDebugIds: false, hasSourceMapUrl: false },
      "109.main.js": { hasDebugIds: false, hasSourceMapUrl: false },
    });
  });

  test("with sourcemaps", () => {
    rspackTest("with-sourcemaps", {
      "main.js": { hasDebugIds: true, hasSourceMapUrl: true },
      "109.main.js": { hasDebugIds: true, hasSourceMapUrl: true },
    });
  });

  test("with hidden sourcemaps", () => {
    rspackTest("with-hidden-sourcemaps", {
      "main.js": { hasDebugIds: true, hasSourceMapUrl: false },
      "109.main.js": { hasDebugIds: true, hasSourceMapUrl: false },
    });
  });

  test("with inline sourcemaps", () => {
    rspackTest("with-inline-sourcemaps", {
      "main.js": { hasDebugIds: false, hasSourceMapUrl: true },
      "109.main.js": { hasDebugIds: false, hasSourceMapUrl: true },
    });
  });
});
