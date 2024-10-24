# `@debugids/esbuild`

[![npm version](https://img.shields.io/npm/v/@debugids/esbuild.svg)](https://www.npmjs.com/package/@debugids/esbuild)

Injects Debug IDs into source and sourcemaps when using esbuild.

`build.mjs`

```ts
import * as esbuild from "esbuild";
import debugIds from "@debugids/esbuild";

await esbuild.build({
  entryPoints: ["./src/main.js"],
  bundle: true,
  format: "esm",
  sourcemap: true,
  minify: true,
  plugins: [debugIds],
  outdir: "./dist",
});
```
