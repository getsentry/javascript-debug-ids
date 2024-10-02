import { join } from "path";
import debugIds from "../../../dist/esm/vite.js";
import { defineConfig } from "vite";

const __dirname = new URL(".", import.meta.url).pathname;

export default defineConfig({
  root: join(__dirname, "src"),
  mode: "production",
  plugins: [debugIds()],
  build: {
    outDir: join(__dirname, "dist"),
    sourcemap: true,
    emptyOutDir: true,
  },
});
