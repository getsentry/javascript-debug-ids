# `@debugids/rollup`

[![npm version](https://img.shields.io/npm/v/@debugids/rollup.svg)](https://www.npmjs.com/package/@debugids/rollup)

Injects Debug IDs into source and sourcemaps when using Rollup.

`rollup.config.mjs`

```ts
import debugIds from "@debugids/rollup";

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
