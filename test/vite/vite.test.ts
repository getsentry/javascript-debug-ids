import { describe, test } from "vitest";
import { join } from "path";
import { runCmd, TestOptions, testSourcesAndMaps } from "../utils";

const __dirname = new URL(".", import.meta.url).pathname;

function viteTest(path: string, options: TestOptions) {
  const baseDir = join(__dirname, path);
  runCmd("vite", ["build", "--config", "vite.config.mjs"], baseDir);

  testSourcesAndMaps(baseDir, options);
}

describe("vite", () => {
  test("no sourcemaps", () => {
    viteTest("no-sourcemaps", {
      "assets/index-CGQYQSPO.js": {
        hasDebugIds: false,
        hasSourceMapUrl: false,
      },
      "assets/another-CR7-3Cjc.js": {
        hasDebugIds: false,
        hasSourceMapUrl: false,
      },
    });
  });

  test("with sourcemaps", () => {
    viteTest("with-sourcemaps", {
      "assets/index-CGQYQSPO.js": {
        hasDebugIds: true,
        hasSourceMapUrl: true,
      },
      "assets/another-CR7-3Cjc.js": {
        hasDebugIds: true,
        hasSourceMapUrl: true,
      },
    });
  });

  test("with hidden sourcemaps", () => {
    viteTest("with-hidden-sourcemaps", {
      "assets/index-CGQYQSPO.js": {
        hasDebugIds: true,
        hasSourceMapUrl: false,
      },
      "assets/another-CR7-3Cjc.js": {
        hasDebugIds: true,
        hasSourceMapUrl: false,
      },
    });
  });

  test("with inline sourcemaps", () => {
    viteTest("with-inline-sourcemaps", {
      "assets/index-CGQYQSPO.js": {
        hasDebugIds: false,
        hasSourceMapUrl: true,
      },
      "assets/another-CR7-3Cjc.js": {
        hasDebugIds: false,
        hasSourceMapUrl: true,
      },
    });
  });
});
