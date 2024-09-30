import { describe, test } from "vitest";
import { execFileSync } from "child_process";
import { join } from "path";
import { TestOptions, testSourcesAndMaps } from "../utils";

const __dirname = new URL(".", import.meta.url).pathname;

function webpackTest(path: string, options: TestOptions) {
  const baseDir = join(__dirname, path);
  execFileSync("webpack", ["--config", "webpack.config.mjs"], {
    cwd: baseDir,
    stdio: "inherit",
  });

  testSourcesAndMaps(baseDir, options);
}

describe("webpack", () => {
  test("no sourcemaps", () => {
    webpackTest("no-sourcemaps", {
      sourceFiles: ["main.js", "559.main.js"],
    });
  });

  test("with sourcemaps", () => {
    webpackTest("with-sourcemaps", {
      sourceFiles: ["main.js", "559.main.js"],
      mapIds: {
        "main.js.map": "97674e7f-c80e-4280-88e4-34b06b9ab1e5",
        "559.main.js.map": "fef287ff-c5dd-48ea-85d6-901e97257e77",
      },
    });
  });

  test("with hidden sourcemaps", () => {
    webpackTest("with-hidden-sourcemaps", {
      sourceFiles: ["main.js", "559.main.js"],
      mapIds: {
        "main.js.map": "11beb5e3-9a39-4ba7-b03e-89ae9f9f00f2",
        "559.main.js.map": "6b0e6b9e-83d5-48c5-9074-6829d7adde86",
      },
    });
  });

  test("with inline sourcemaps", () => {
    webpackTest("with-inline-sourcemaps", {
      sourceFiles: ["main.js", "559.main.js"],
    });
  });
});
