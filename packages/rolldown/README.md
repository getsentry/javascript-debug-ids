# `@debugids/rolldown`

[![npm version](https://img.shields.io/npm/v/@debugids/rolldown.svg)](https://www.npmjs.com/package/@debugids/rolldown)

Injects Debug IDs into source and sourcemaps when using Rolldown.

Rolldown v0.14.0 and later support debug IDs natively without any plugins:

`rolldown.config.mjs`

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

For older versions of Rolldown, you can use this plugin to inject debug IDs:

`rolldown.config.mjs`

```ts
import debugIds from "@debugids/rolldown";

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
