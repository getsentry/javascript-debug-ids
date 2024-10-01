import { describe, test } from "vitest";
import { execFileSync } from "child_process";
import { join } from "path";
import { TestOptions, testSourcesAndMaps } from "../utils";

const __dirname = new URL(".", import.meta.url).pathname;

function rspackTest(path: string, options: TestOptions) {
  const baseDir = join(__dirname, path);
  execFileSync("rspack", ["build", "--config", "./rspack.config.mjs"], {
    cwd: baseDir,
    stdio: "inherit",
  });

  testSourcesAndMaps(baseDir, options);
}

describe("rspack", () => {
  test("no sourcemaps", () => {
    rspackTest("no-sourcemaps", {
      sourceFiles: ["main.js", "109.main.js"],
    });
  });

  test("with sourcemaps", () => {
    rspackTest("with-sourcemaps", {
      sourceFiles: ["main.js", "109.main.js"],
      mapIds: {
        "main.js.map": "b4b9bc99-7b69-4204-a399-e1899a41fc94",
        "109.main.js.map": "5ace50fe-ace8-4fff-97e3-1fa79128b309",
      },
    });
  });

  test("with hidden sourcemaps", () => {
    rspackTest("with-hidden-sourcemaps", {
      sourceFiles: ["main.js", "109.main.js"],
      mapIds: {
        "main.js.map": "797b2e77-cda7-4d05-b93f-e4df1d24b5f6",
        "109.main.js.map": "a242d7ee-cf3e-4f37-8bd9-8a5cee439b85",
      },
    });
  });

  test("with inline sourcemaps", () => {
    rspackTest("with-inline-sourcemaps", {
      sourceFiles: ["main.js", "109.main.js"],
    });
  });
});
