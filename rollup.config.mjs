import { builtinModules } from 'node:module';
import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import typescript from '@rollup/plugin-typescript';

const pkgJson = JSON.parse(readFileSync(resolve(process.cwd(), 'package.json')));
const external = [...builtinModules, ...Object.keys(pkgJson.dependencies || {})];

// a simple plugin that adds a package.json file with type: module
const modulePackageJson = {
  name: 'package-json-module-type',
  generateBundle() {
    this.emitFile({ type: 'asset', fileName: 'package.json', source: '{"type": "module"}' });
  },
};

function transpileNode(format, input, outDir) {
  return {
    input,
    output: {
      sourcemap: true,
      strict: false,
      format,
      dir: outDir,
      preserveModules: true,
    },
    plugins: [typescript({ outDir, tsconfig: './tsconfig.json' }), format === 'esm' ? modulePackageJson : {}],
    external,
  };
}

const inputs = ['src/esbuild.ts', 'src/rolldown.ts', 'src/rollup.ts', 'src/rspack.ts', 'src/vite.ts', 'src/webpack.ts'];

export default [transpileNode('cjs', inputs, 'dist/cjs'), transpileNode('esm', inputs, 'dist/esm')];
