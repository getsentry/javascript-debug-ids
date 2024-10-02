import type { Compiler } from 'webpack';
import { DEFAULT_EXTENSIONS, addDebugIdToSource, stringToUUID, addDebugIdToSourcemap } from './common';

const PLUGIN_NAME = 'DebugIdWebpackPlugin';

export class DebugIdWebpackPlugin {
  apply(compiler: Compiler) {
    const { webpack } = compiler;
    const { Compilation } = webpack;
    const { RawSource } = webpack.sources;

    compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: PLUGIN_NAME,
          // https://webpack.js.org/api/compilation-hooks/#list-of-asset-processing-stages
          // This is the same stage as the 'webpack-subresource-integrity' plugin but we
          // cannot use the previous stage `PROCESS_ASSETS_STAGE_DEV_TOOLING` because it's
          // used for adding sourcemaps.
          //
          // It's possible to use this plugin with 'webpack-subresource-integrity' but this
          // plugin should come first.
          stage: Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_INLINE,
        },
        () => {
          const assetsWithCorrectExt = Object.keys(compilation.assets).filter((file) =>
            DEFAULT_EXTENSIONS.some((ext) => file.endsWith(ext)),
          );

          for (const key of assetsWithCorrectExt) {
            const sourceAsset = compilation.getAsset(key);

            // skip if we don't have a sourceMap
            if (!sourceAsset?.info.related?.sourceMap) {
              continue;
            }

            if (Array.isArray(sourceAsset.info.related.sourceMap)) {
              throw new Error(
                'DebugIdWebpackPlugin: Oh dear, we cannot handle arrays of source maps yet! Please open an issue with an example.',
              );
            }

            const sourcemapKey = sourceAsset.info.related.sourceMap;
            const sourcemapAsset = compilation.getAsset(sourcemapKey);

            if (!sourcemapAsset) {
              continue;
            }

            const source = sourceAsset.source.source().toString();
            const debugId = stringToUUID(source);
            const updatedSource = addDebugIdToSource(source, debugId);

            compilation.updateAsset(key, new RawSource(updatedSource));

            const updatedSourcemap = addDebugIdToSourcemap(sourcemapAsset.source.source().toString(), debugId);

            compilation.updateAsset(sourcemapKey, new RawSource(updatedSourcemap));
          }
        },
      );
    });
  }
}
