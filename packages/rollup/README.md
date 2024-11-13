# `@debugids/rollup`

[![npm version](https://img.shields.io/npm/v/@debugids/rollup.svg)](https://www.npmjs.com/package/@debugids/rollup)

Injects Debug IDs into source and sourcemaps when using Rollup.

Rollup v4.25.0 and later support debug IDs natively without any plugins:

`rollup.config.mjs`

```ts
export default {
  input: "./src/main.js",
  output: {
    dir: "dist",
    format: "esm",
    sourcemap: true,
    sourcemapDebugIds: true,
  },
};
```

For older versions of Rollup, you can use this plugin to inject debug IDs:

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
