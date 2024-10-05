import { join } from 'path';
import { DebugIdWebpackPlugin } from '@debugIds/webpack';

const __dirname = new URL('.', import.meta.url).pathname;

export default {
  entry: join(__dirname, './src/main.js'),
  plugins: [new DebugIdWebpackPlugin()],
  mode: 'production',
  devtool: 'inline-source-map',
  output: {
    filename: 'main.js',
    path: join(__dirname, 'dist'),
  },
};
