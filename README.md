# javascript-debug-ids

JavaScript Polyfills and Bundler Plugins for the [TC39 Debug ID proposal](https://github.com/tc39/source-map/blob/main/proposals/debug-id.md).

## Polyfills

### Browser

```ts
import { getDebugIdForUrl } from "debug-id/browser";

const debugId = await getDebugIdForUrl("https://example.com/main.js");
```

### Node.js

```ts
import { getDebugIdForUrl } from "debug-id/node";

const debugId = await getDebugIdForUrl("./path/to/main.js");
```

### CLI

The CLI can be used to add Debug IDs to source files and corresponding source-maps.

```
> debugids ./dist

Adding debug IDs: 22.86ms
21 source files modified
┌─────────┬────────────────────────┬────────────────────────────┬────────────────────────────────────────┐
│ (index) │ source                 │ map                        │ debugId                                │
├─────────┼────────────────────────┼────────────────────────────┼────────────────────────────────────────┤
│ 0       │ 'dist/cjs/browser.js'  │ 'dist/cjs/browser.js.map'  │ '5d789753-09fa-477c-80f6-6cfe447c9d9c' │
│ 1       │ 'dist/cjs/cli.js'      │ 'dist/cjs/cli.js.map'      │ '9e422107-9efe-43e9-b689-2a4ab4b433fd' │
│ 2       │ 'dist/cjs/common.js'   │ 'dist/cjs/common.js.map'   │ 'edbf08d3-65e4-4ba4-bc1e-89dad07dee83' │
│ 3       │ 'dist/cjs/esbuild.js'  │ 'dist/cjs/esbuild.js.map'  │ 'ba079d7a-bf61-4d37-b0b8-d9a4b6a78b25' │
│ 4       │ 'dist/cjs/node.js'     │ 'dist/cjs/node.js.map'     │ '8afaca7e-2109-4c76-9f06-aa4aaf838038' │
│ 5       │ 'dist/cjs/parcel.js'   │ 'dist/cjs/parcel.js.map'   │ 'fcf05632-597b-4c44-8399-2de02a2dc8cc' │
│ 6       │ 'dist/cjs/rolldown.js' │ 'dist/cjs/rolldown.js.map' │ '8186821c-f0ae-4fc2-8f58-d293f543b912' │
│ 7       │ 'dist/cjs/rollup.js'   │ 'dist/cjs/rollup.js.map'   │ 'b10c5745-792b-4791-9053-f29f891bcd2a' │
│ 8       │ 'dist/cjs/rspack.js'   │ 'dist/cjs/rspack.js.map'   │ 'c86a146b-13c9-42f9-8ce7-022b6a14041e' │
│ 9       │ 'dist/cjs/vite.js'     │ 'dist/cjs/vite.js.map'     │ '01a2e113-63e4-4cfe-8e28-ab7b1c9ad4da' │
│ 10      │ 'dist/cjs/webpack.js'  │ 'dist/cjs/webpack.js.map'  │ '76e02ae5-b2f5-4b86-a8aa-b10c8fe22cae' │
│ 11      │ 'dist/esm/browser.js'  │ 'dist/esm/browser.js.map'  │ '1132afdb-5d3e-4306-a152-d944227e6c0b' │
│ 12      │ 'dist/esm/common.js'   │ 'dist/esm/common.js.map'   │ '33975f78-e815-499d-b1c7-30d30a5dadff' │
│ 13      │ 'dist/esm/esbuild.js'  │ 'dist/esm/esbuild.js.map'  │ '1ee53fe8-75d8-4d2d-a42c-cdd797b9938c' │
│ 14      │ 'dist/esm/node.js'     │ 'dist/esm/node.js.map'     │ '36afeb8e-347d-47d4-9090-86c49677f099' │
│ 15      │ 'dist/esm/parcel.js'   │ 'dist/esm/parcel.js.map'   │ '34de941f-bbe1-462b-a12a-d127492ff33b' │
│ 16      │ 'dist/esm/rolldown.js' │ 'dist/esm/rolldown.js.map' │ 'f907c9c7-e5f6-4e9c-ae16-e1910b5f5f22' │
│ 17      │ 'dist/esm/rollup.js'   │ 'dist/esm/rollup.js.map'   │ '2e809256-e2d2-4ab7-a9d1-f8a0ef960196' │
│ 18      │ 'dist/esm/rspack.js'   │ 'dist/esm/rspack.js.map'   │ '390da573-a94d-46fc-a005-90680847e7c4' │
│ 19      │ 'dist/esm/vite.js'     │ 'dist/esm/vite.js.map'     │ 'b1c9503c-b550-4528-9927-4a51e4968bea' │
│ 20      │ 'dist/esm/webpack.js'  │ 'dist/esm/webpack.js.map'  │ '760e8f6b-b7d6-4775-819c-91804cb035cb' │
└─────────┴────────────────────────┴────────────────────────────┴────────────────────────────────────────┘
```

## Bundler Plugins

Bundler plugins to inject Debug IDs into both source and source-maps.

### Rollup

`rollup.config.mjs`
```ts
import debugIds from "debug-id/rollup";

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

### webpack

`webpack.config.mjs`
```ts
import { DebugIdWebpackPlugin } from "debug-id/webpack";

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

### esbuild

`build.mjs`
```ts
import * as esbuild from "esbuild";
import debugIds from "debug-id/esbuild";

await esbuild.build({
  entryPoints: ["./src/main.js"],
  bundle: true,
  format: "esm",
  sourcemap: true,
  minify: true,
  plugins: [debugIds],
  outdir: "./dist",
});
```

### vite

`vite.config.mjs`
```ts
import debugIds from "debug-id/vite";

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

### rspack

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

### Rolldown

`rolldown.config.mjs`
```ts
import debugIds from "debug-id/rolldown";

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

### Parcel

`.parcelrc`
```json
{
  "extends": "@parcel/config-default",
  "optimizers": {
    "*.{js,cjs,mjs}": ["...", "debug-id/parcel"]
  }
}
```