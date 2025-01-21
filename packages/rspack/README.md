# `@debugids/rspack`

[![npm version](https://img.shields.io/npm/v/@debugids/rspack.svg)](https://www.npmjs.com/package/@debugids/rspack)

Injects Debug IDs into source and sourcemaps when using Rspack.

Rspack v1.2.0 and later support debug IDs natively without any plugins. Just add `-debugids` to the end of any devtool option:

`rspack.config.mjs`
```ts
export default {
  entry: "./src/main.js",
  mode: "production",
  devtool: "source-map-debugids",
  output: {
    filename: "main.js",
    path: "./dist",
  },
};
```

For older versions of webpack, you can use this plugin to inject debug IDs:

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
