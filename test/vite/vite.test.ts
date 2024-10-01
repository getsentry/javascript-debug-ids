import { describe, test } from "vitest";
import { execFileSync } from "child_process";
import { join } from "path";
import { TestOptions, testSourcesAndMaps } from "../utils";

const __dirname = new URL(".", import.meta.url).pathname;

function viteTest(path: string, options: TestOptions) {
  const baseDir = join(__dirname, path);
  execFileSync("vite", ["build", "--config", "vite.config.mjs"], {
    cwd: baseDir,
    stdio: "inherit",
  });

  testSourcesAndMaps(baseDir, options);
}

describe("vite", () => {
  test("no sourcemaps", () => {
    viteTest("no-sourcemaps", {
      sourceFiles: ["assets/index-CGQYQSPO.js", "assets/another-CR7-3Cjc.js"],
    });
  });

  test("with sourcemaps", () => {
    viteTest("with-sourcemaps", {
      sourceFiles: ["assets/index-CGQYQSPO.js", "assets/another-CR7-3Cjc.js"],
      mapIds: {
        "assets/index-CGQYQSPO.js.map": "c5154bb4-4fc4-4e84-8714-3a86aedb6ee5",
        "assets/another-CR7-3Cjc.js.map":
          "97e9f740-675c-47d6-805e-e509aebfe047",
      },
    });
  });

  test("with hidden sourcemaps", () => {
    viteTest("with-hidden-sourcemaps", {
      sourceFiles: ["assets/index-CGQYQSPO.js", "assets/another-CR7-3Cjc.js"],
      mapIds: {
        "assets/index-CGQYQSPO.js.map": "8a4b9b46-753c-432e-8cde-de2454981c55",
        "assets/another-CR7-3Cjc.js.map":
          "21b62a8a-8ef3-4a10-847e-d766353e713b",
      },
    });
  });

  test("with inline sourcemaps", () => {
    viteTest("with-inline-sourcemaps", {
      sourceFiles: ["assets/index-CGQYQSPO.js", "assets/another-CR7-3Cjc.js"],
    });
  });
});
