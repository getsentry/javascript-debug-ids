# `@debugids/webpack`

[![npm version](https://img.shields.io/npm/v/@debugids/webpack.svg)](https://www.npmjs.com/package/@debugids/webpack)

Injects Debug IDs into source and sourcemaps when using webpack.

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
