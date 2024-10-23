import { transpile } from '../../rollup.mjs';

export default [transpile('rolldown', 'cjs'), transpile('rolldown', 'esm')];
