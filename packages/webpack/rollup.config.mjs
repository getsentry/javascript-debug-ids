import { transpile } from '../../rollup.mjs';

export default [transpile('webpack', 'cjs'), transpile('webpack', 'esm')];
