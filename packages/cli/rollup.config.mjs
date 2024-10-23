import { transpile } from '../../rollup.mjs';

export default [transpile('cli', 'cjs', true)];
