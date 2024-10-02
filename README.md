# javascript-debug-ids

JavaScript Polyfills and Bundler Plugins for the TC39 [Debug ID proposal](https://github.com/tc39/source-map/blob/main/proposals/debug-id.md).

## Polyfills

### Browser

```ts
import { getDebugIdForUrl } from "@sentry/debug-ids/browser";

const debugId = await getDebugIdForUrl("https://example.com/main.js");
```

### Node.js

```ts
import { getDebugIdForUrl } from "@sentry/debug-ids/node";

const debugId = await getDebugIdForUrl("./path/to/main.js");
```

## Bundler Plugins

Bundler plugins to inject [Debug
IDs](https://github.com/tc39/source-map/blob/main/proposals/debug-id.md) into
both source and source-maps.

### Rollup

`rollup.config.mjs`
```ts
import debugIds from "@sentry/debug-ids/rollup";

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
import { DebugIdWebpackPlugin } from "@sentry/debug-ids/webpack";

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
import debugIds from "@sentry/debug-ids/esbuild";

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
import debugIds from "@sentry/debug-ids/vite";

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
import { DebugIdRspackPlugin } from "@sentry/debug-ids/rspack";

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
import debugIds from "@sentry/debug-ids/rolldown";

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
    "*.{js,cjs,mjs}": ["...", "@sentry/debug-ids/parcel"]
  }
}
```