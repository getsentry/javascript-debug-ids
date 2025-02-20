# `@debugids/vite`

[![npm version](https://img.shields.io/npm/v/@debugids/vite.svg)](https://www.npmjs.com/package/@debugids/vite)

Injects Debug IDs into source and sourcemaps when using Vite.

Vite v6.1.1 and later support debug IDs natively without any plugins. Just set
`build.rollupOptions.output.sourcemapDebugIds: true`:

`vite.config.mjs`

```ts
export default {
  root: "./src",
  mode: "production",
  build: {
    outDir: "./dist",
    sourcemap: true,
    rollupOptions: {
      output: {
        sourcemapDebugIds: true,
      },
    },
  },
};
```

For older versions of Vite, you can use this plugin to inject debug IDs:

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
