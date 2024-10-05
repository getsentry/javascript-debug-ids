import { join } from 'path';
import debugIds from '@debugIds/rollup';

const __dirname = new URL('.', import.meta.url).pathname;

export default {
  input: join(__dirname, 'src/main.js'),
  plugins: [debugIds()],
  output: {
    dir: join(__dirname, 'dist'),
    format: 'esm',
    sourcemap: true,
  },
};
