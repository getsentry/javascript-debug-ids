import { transpile } from '../../rollup.mjs';

export default [transpile('vite', 'cjs'), transpile('vite', 'esm')];
