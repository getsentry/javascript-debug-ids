import rollupPlugin from "./rollup";
import { Plugin } from "vite";

export default function debugIds(): Plugin {
  return {
    ...rollupPlugin(),
    name: "vite-plugin-debug-ids",
    apply: "build",
    enforce: "post",
  };
}
