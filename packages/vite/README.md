# `@debugids/vite`

[![npm version](https://img.shields.io/npm/v/@debugids/vite.svg)](https://www.npmjs.com/package/@debugids/vite)

Injects Debug IDs into source and sourcemaps when using Vite.

`vite.config.mjs`

```ts
import debugIds from "@debugids/vite";

export default {
  root: "./src",
  mode: "production",
  plugins: [debugIds()],
  build: {
    outDir: "./dist",
    sourcemap: true,
  },
};
```
