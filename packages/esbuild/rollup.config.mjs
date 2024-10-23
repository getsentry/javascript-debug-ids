import { transpile } from '../../rollup.mjs';

export default [transpile('esbuild', 'cjs'), transpile('esbuild', 'esm')];
