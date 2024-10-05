import { join } from 'path';
import { DebugIdRspackPlugin } from '@debugIds/rspack';

const __dirname = new URL('.', import.meta.url).pathname;

export default {
  entry: join(__dirname, './src/main.js'),
  plugins: [new DebugIdRspackPlugin()],
  mode: 'production',
  devtool: 'hidden-source-map',
  output: {
    filename: 'main.js',
    path: join(__dirname, 'dist'),
  },
};
