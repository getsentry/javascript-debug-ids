import { Optimizer } from '@parcel/plugin';
import { stringToUUID, addDebugIdToSource } from './common';
import type { SourceMap } from 'rollup';

export default new Optimizer({
  async optimize({ contents, map }) {
    // We only add debugId where there is a linked sourcemap file
    if (!map) {
      return { contents, map };
    }

    const contentsString = contents.toString();
    const debugId = stringToUUID(contentsString);

    // This is nasty but Parcel uses a native module to handle sourcemaps, so
    // the only way I could find to add the debugId to the sourcemap is to proxy
    // the map 'toVLQ()' method to add the debugId to the sourcemap object...
    const proxiedMap = new Proxy(map, {
      get: function (target, prop, receiver) {
        if (prop === 'toVLQ') {
          const original = Reflect.get(target, prop, receiver);

          return function toVLQ(this: SourceMap) {
            const result = original.apply(this);
            result.debugId = debugId;
            return result;
          };
        }

        return Reflect.get(target, prop, receiver);
      },
    });

    return {
      contents: addDebugIdToSource(contentsString, debugId),
      map: proxiedMap,
    };
  },
});
