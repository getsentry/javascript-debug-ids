import { transpile } from '../../rollup.mjs';

export default [transpile('parcel', 'cjs'), transpile('parcel', 'esm')];
