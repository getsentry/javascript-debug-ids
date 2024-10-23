import { transpile } from '../../rollup.mjs';

export default [transpile('rspack', 'cjs'), transpile('rspack', 'esm')];
