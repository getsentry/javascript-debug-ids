import { transpile } from '../../rollup.mjs';

export default [transpile('rollup', 'cjs'), transpile('rollup', 'esm')];
