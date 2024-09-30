# javascript-debug-ids

Bundler plugins to inject [Debug
IDs](https://github.com/tc39/source-map/blob/main/proposals/debug-id.md) into
both source and source-maps, making build artifacts self-identifying.

## Rollup

`rollup.config.mjs`
```ts
import debugIds from "@sentry/debug-ids/rollup";

export default {
  input: "./src/main.js",
  plugins: [debugIds()],
  output: {
    dir: "dist",
    format: "esm",
    sourcemap: true,
  },
};
```

## Webpack

`webpack.config.mjs`
```ts
import { DebugIdWebpackPlugin } from "@sentry/debug-ids/webpack";

export default {
  entry: "./src/main.js",
  plugins: [new DebugIdWebpackPlugin()],
  mode: "production",
  devtool: "source-map",
  output: {
    filename: "main.js",
    path: "./dist",
  },
};
```

## esbuild

`build.mjs`
```ts
import * as esbuild from "esbuild";
import debugIds from "@sentry/debug-ids/esbuild";

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