import { addDebugIdToSource, stringToUUID } from '@debugids/common';
import { Optimizer } from '@parcel/plugin';

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
      get: (target, prop, receiver) => {
        if (prop === 'toVLQ') {
          const original = Reflect.get(target, prop, receiver);

          return function toVLQ(this: unknown) {
            const result = original.apply(this);
            // biome-ignore lint/suspicious/noExplicitAny: We're adding a debugId to the sourcemap
            (result as any).debugId = debugId;
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
