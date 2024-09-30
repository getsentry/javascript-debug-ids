import { OutputAsset, OutputChunk, Plugin } from "rollup";
import {
  addDebugIdToSourcemap,
  addDebugIdToSource,
  stringToUUID,
  DEFAULT_EXTENSIONS,
} from "./common";

export default function debugIds(): Plugin {
  return {
    name: "rollup-plugin-debug-ids",
    generateBundle: function (
      _: unknown,
      bundle: { [fileName: string]: OutputAsset | OutputChunk }
    ) {
      for (const [key, value] of Object.entries(bundle)) {
        // We only add debugId where there is a linked sourcemap file
        if (!("sourcemapFileName" in value) || !value.sourcemapFileName) {
          continue;
        }

        // We only add to specific file types
        if (!DEFAULT_EXTENSIONS.includes(key.slice(-3))) {
          continue;
        }

        // Check we have a sourcemap in the output and it has source property
        const sourceMapFile = bundle[value.sourcemapFileName];
        if (!sourceMapFile || !("source" in sourceMapFile)) {
          continue;
        }

        const debugId = stringToUUID(value.code);
        value.code = addDebugIdToSource(value.code, debugId);
        sourceMapFile.source = addDebugIdToSourcemap(
          sourceMapFile.source.toString(),
          debugId
        );
      }
    },
  };
}
