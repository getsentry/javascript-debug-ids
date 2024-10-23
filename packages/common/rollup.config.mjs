import { transpile } from '../../rollup.mjs';

export default [transpile('common', 'cjs'), transpile('common', 'esm')];
