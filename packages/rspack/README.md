# `@debugids/rspack`

Injects Debug IDs into source and sourcemaps when using Rspack.

`rspack.config.mjs`
```ts
import { DebugIdRspackPlugin } from "debug-id/rspack";

export default {
  entry: "./src/main.js",
  plugins: [new DebugIdRspackPlugin()],
  mode: "production",
  devtool: "source-map",
  output: {
    filename: "main.js",
    path: "./dist",
  },
};
```