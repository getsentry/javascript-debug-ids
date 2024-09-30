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
      _,
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

        // vite has plugins that run after us which can modify the sourcemap so we
        // proxy the sourceMapFile to re-add the debugId if the source gets set again
        bundle[value.sourcemapFileName] = new Proxy(
          bundle[value.sourcemapFileName],
          {
            set: function (target, prop, value) {
              if (prop === "source") {
                target[prop] = addDebugIdToSourcemap(value, debugId);
              } else {
                target[prop] = value;
              }
              return true;
            },
          }
        );
      }
    },
  };
}
