import type { OutputAsset, OutputChunk, Plugin } from 'rollup';
import { addDebugIdToSourcemap, addDebugIdToSource, stringToUUID, DEFAULT_EXTENSIONS } from '@debugids/common';
import { TextDecoder } from 'util';

function getString(input: string | Uint8Array): string {
  if (typeof input === 'string') {
    return input;
  }

  return new TextDecoder().decode(input);
}

export default function debugIds(): Plugin {
  return {
    name: 'rollup-plugin-debug-ids',
    generateBundle: function (_, bundle: { [fileName: string]: OutputAsset | OutputChunk }) {
      for (const [key, value] of Object.entries(bundle)) {
        // We only add debugId where there is a linked sourcemap file
        if (!('sourcemapFileName' in value) || !value.sourcemapFileName) {
          continue;
        }

        // We only add to specific file types
        if (!DEFAULT_EXTENSIONS.includes(key.slice(-3))) {
          continue;
        }

        // Check we have a sourcemap in the output and it has source property
        const sourceMapFile = bundle[value.sourcemapFileName];
        if (!sourceMapFile || !('source' in sourceMapFile)) {
          continue;
        }

        const debugId = stringToUUID(value.code);
        value.code = addDebugIdToSource(value.code, debugId);
        sourceMapFile.source = addDebugIdToSourcemap(sourceMapFile.source.toString(), debugId);

        // vite has a plugin that runs after us which can modify the sourcemap so we
        // proxy the sourceMapFile to re-add the debugId if the source gets set again
        bundle[value.sourcemapFileName] = new Proxy(bundle[value.sourcemapFileName] as OutputAsset, {
          set: function <K extends keyof OutputAsset>(target: OutputAsset, prop: K, value: OutputAsset[K]) {
            if (prop === 'source') {
              (target as any)[prop] = addDebugIdToSourcemap(getString(value as string | Uint8Array), debugId);
            } else {
              target[prop] = value;
            }
            return true;
          },
        }) as OutputAsset;
      }
    },
  };
}
