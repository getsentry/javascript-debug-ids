import { join } from "path";
import debugIds from "../../../dist/rolldown.mjs";
import { defineConfig } from "rolldown";

const __dirname = new URL(".", import.meta.url).pathname;

export default defineConfig({
  input: join(__dirname, "src/main.js"),
  plugins: [debugIds()],
  output: {
    dir: join(__dirname, "dist"),
    format: "esm",
  },
});
