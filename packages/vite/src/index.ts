import rollupPlugin from '@debugids/rollup';
import type { Plugin } from 'vite';

export default function debugIds(): Plugin {
  return {
    ...rollupPlugin(),
    name: 'vite-plugin-debug-ids',
    apply: 'build',
    enforce: 'post',
  };
}
