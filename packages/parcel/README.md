# `@debugids/parcel-optimizer-debugids`

Injects Debug IDs into source and sourcemaps when using Parcel.

`.parcelrc`
```json
{
  "extends": "@parcel/config-default",
  "optimizers": {
    "*.{js,cjs,mjs}": ["...", "@debugids/parcel-optimizer-debugids"]
  }
}
```