import { join } from "path";
import * as esbuild from "esbuild";
import debugIds from "../../../dist/esbuild.mjs";

const __dirname = new URL(".", import.meta.url).pathname;

await esbuild.build({
  entryPoints: [join(__dirname, "src", "main.js")],
  bundle: true,
  format: "esm",
  minify: true,
  sourcemap: false,
  plugins: [debugIds],
  outdir: join(__dirname, "dist"),
});
