import { describe, test } from "vitest";
import { execFileSync } from "child_process";
import { join } from "path";
import { TestOptions, testSourcesAndMaps } from "../utils";

const __dirname = new URL(".", import.meta.url).pathname;

function rolldownTest(path: string, options: TestOptions) {
  const baseDir = join(__dirname, path);
  execFileSync("rolldown", ["-c", "rolldown.config.mjs"], {
    cwd: baseDir,
    stdio: "inherit",
  });

  testSourcesAndMaps(baseDir, options);
}

describe("rolldown", () => {
  test("no sourcemaps", () => {
    rolldownTest("no-sourcemaps", {
      sourceFiles: ["main.js", "another-xPvAO7_p.js"],
    });
  });

  test("with sourcemaps", () => {
    rolldownTest("with-sourcemaps", {
      sourceFiles: ["main.js", "another-xPvAO7_p.js"],
      mapIds: {
        "main.js.map": "b54c9e29-dccc-48c3-9ce0-e97811b99450",
        "another-xPvAO7_p.js.map": "ef170d2c-ed10-4a19-a4ad-f214c8257c5a",
      },
    });
  });

  // Fix not released yet: https://github.com/rolldown/rolldown/issues/2208
  // test("with hidden sourcemaps", () => {
  //   rolldownTest("with-hidden-sourcemaps", {
  //     sourceFiles: ["main.js", "another-xPvAO7_p.js"],
  //     mapIds: {
  //       "main.js.map": "a11c393e-e161-4ccf-903d-83ac2c41354d",
  //       "another-xPvAO7_p.js.map": "21b62a8a-8ef3-4a10-847e-d766353e713b",
  //     },
  //   });
  // });

  test("with inline sourcemaps", () => {
    rolldownTest("with-inline-sourcemaps", {
      sourceFiles: ["main.js", "another-xPvAO7_p.js"],
    });
  });
});
