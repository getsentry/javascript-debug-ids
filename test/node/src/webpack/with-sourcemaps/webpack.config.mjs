import { join } from 'node:path';
import { DebugIdWebpackPlugin } from '@debugids/webpack';

const __dirname = new URL('.', import.meta.url).pathname;

export default {
  entry: join(__dirname, './src/main.js'),
  plugins: [new DebugIdWebpackPlugin()],
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: 'main.js',
    path: join(__dirname, 'dist'),
  },
};
