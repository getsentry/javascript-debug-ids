# `@debugids/webpack`

[![npm version](https://img.shields.io/npm/v/@debugids/webpack.svg)](https://www.npmjs.com/package/@debugids/webpack)

Injects Debug IDs into source and sourcemaps when using webpack.

Webpack v5.97.0 and later support debug IDs natively without any plugins. Just
add `-debugids` to the end of any devtool option:

`webpack.config.mjs`

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

`webpack.config.mjs`

```ts
import { DebugIdWebpackPlugin } from "@debugids/webpack";

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
