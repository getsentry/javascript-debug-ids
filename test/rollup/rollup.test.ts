import { describe, test } from "vitest";
import { execFileSync } from "child_process";
import { join } from "path";
import { TestOptions, testSourcesAndMaps } from "../utils";

const __dirname = new URL(".", import.meta.url).pathname;

function rollupTest(path: string, options: TestOptions) {
  const baseDir = join(__dirname, path);
  execFileSync("rollup", ["-c", "rollup.config.mjs"], {
    cwd: baseDir,
    stdio: "inherit",
  });

  testSourcesAndMaps(baseDir, options);
}

describe("rollup", () => {
  test("no sourcemaps", () => {
    rollupTest("no-sourcemaps", {
      sourceFiles: ["main.js", "another-CR7-3Cjc.js"],
    });
  });

  test("with sourcemaps", () => {
    rollupTest("with-sourcemaps", {
      sourceFiles: ["main.js", "another-CR7-3Cjc.js"],
      mapIds: {
        "main.js.map": "61539fe6-5010-4063-9159-744f664d7fde",
        "another-CR7-3Cjc.js.map": "97e9f740-675c-47d6-805e-e509aebfe047",
      },
    });
  });

  test("with hidden sourcemaps", () => {
    rollupTest("with-hidden-sourcemaps", {
      sourceFiles: ["main.js", "another-CR7-3Cjc.js"],
      mapIds: {
        "main.js.map": "a11c393e-e161-4ccf-903d-83ac2c41354d",
        "another-CR7-3Cjc.js.map": "21b62a8a-8ef3-4a10-847e-d766353e713b",
      },
    });
  });

  test("with inline sourcemaps", () => {
    rollupTest("with-inline-sourcemaps", {
      sourceFiles: ["main.js", "another-CR7-3Cjc.js"],
    });
  });
});
