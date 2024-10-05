import type { PluginBuild } from 'esbuild';
import { addDebugIdToSource, DEFAULT_EXTENSIONS, stringToUUID, addDebugIdToSourcemap } from '@debugids/common';
import { readFile, writeFile } from 'fs/promises';
import * as path from 'path';

export default {
  name: 'esbuild-plugin-debug-ids',
  setup({ onEnd, initialOptions }: PluginBuild) {
    if (initialOptions.bundle !== true || initialOptions.sourcemap === undefined) {
      return;
    }

    initialOptions.metafile = true;

    onEnd(async (result) => {
      const assets = Object.keys(result.metafile?.outputs || {});
      const assetsWithCorrectExt = assets.filter((file) => DEFAULT_EXTENSIONS.some((ext) => file.endsWith(ext)));

      if (assetsWithCorrectExt.length === 0) {
        return;
      }

      const promises = assetsWithCorrectExt.map(async (key) => {
        const sourcemapKey = `${key}.map`;

        // If we don't have a sourcemap, don't do anything
        if (!assets.includes(sourcemapKey)) {
          return Promise.resolve();
        }

        const sourcePath = path.join(process.cwd(), key);
        const source = await readFile(sourcePath, { encoding: 'utf-8' });
        const debugId = stringToUUID(source);
        const updatedSource = addDebugIdToSource(source, debugId);
        await writeFile(sourcePath, updatedSource);

        const sourcemapPath = path.join(process.cwd(), sourcemapKey);
        const sourcemap = await readFile(sourcemapPath, { encoding: 'utf-8' });
        const updatedSourcemap = addDebugIdToSourcemap(sourcemap, debugId);
        await writeFile(sourcemapPath, updatedSourcemap);
      });

      await Promise.all(promises);
    });
  },
};
