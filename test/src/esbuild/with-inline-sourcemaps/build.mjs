import { join } from 'node:path';
import debugIds from '@debugids/esbuild';
import * as esbuild from 'esbuild';

const __dirname = new URL('.', import.meta.url).pathname;

await esbuild.build({
  entryPoints: [join(__dirname, 'src', 'main.js')],
  bundle: true,
  format: 'esm',
  sourcemap: 'inline',
  minify: true,
  plugins: [debugIds],
  outdir: join(__dirname, 'dist'),
});
