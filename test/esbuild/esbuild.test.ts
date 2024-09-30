import { describe, test } from "vitest";
import { execFileSync } from "child_process";
import { join } from "path";
import { TestOptions, testSourcesAndMaps } from "../utils";

const __dirname = new URL(".", import.meta.url).pathname;

function esbuildTest(path: string, options: TestOptions) {
  const baseDir = join(__dirname, path);
  execFileSync("node", ["./build.mjs"], {
    cwd: baseDir,
    stdio: "inherit",
  });

  testSourcesAndMaps(baseDir, options);
}

describe("rollup", () => {
  test("no sourcemaps", () => {
    esbuildTest("no-sourcemaps", {
      sourceFiles: ["main.js"],
    });
  });

  test("with sourcemaps", () => {
    esbuildTest("with-sourcemaps", {
      sourceFiles: ["main.js"],
      mapIds: {
        "main.js.map": "302a139c-0c62-4af7-bfd3-03d083925e5e",
      },
    });
  });

  test("with external sourcemaps", () => {
    esbuildTest("with-external-sourcemaps", {
      sourceFiles: ["main.js"],
      mapIds: {
        "main.js.map": "56431d54-c0a6-451d-8ea2-ba5de5d8ca2e",
      },
    });
  });

  test("with inline sourcemaps", () => {
    esbuildTest("with-inline-sourcemaps", {
      sourceFiles: ["main.js"],
    });
  });
});
