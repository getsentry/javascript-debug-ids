# `@debugids/rolldown`

[![npm version](https://img.shields.io/npm/v/@debugids/rolldown.svg)](https://www.npmjs.com/package/@debugids/rolldown)

Injects Debug IDs into source and sourcemaps when using Rolldown.

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
