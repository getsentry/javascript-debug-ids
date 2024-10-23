import { transpile } from '../../rollup.mjs';

export default [transpile('browser', 'cjs', true), transpile('browser', 'esm', true)];
