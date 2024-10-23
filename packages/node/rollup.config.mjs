import { transpile } from '../../rollup.mjs';

export default [transpile('node', 'cjs'), transpile('node', 'esm')];
