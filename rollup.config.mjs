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

function transpile(format, input, outDir, preserveModules = true) {
  return {
    input,
    output: {
      sourcemap: true,
      format,
      dir: outDir,
      preserveModules,
    },
    plugins: [typescript({ outDir, tsconfig: './tsconfig.json' }), format === 'esm' ? modulePackageJson : {}],
    external,
  };
}

const nodeInputs = [
  'src/esbuild.ts',
  'src/node.ts',
  'src/parcel.ts',
  'src/rolldown.ts',
  'src/rollup.ts',
  'src/rspack.ts',
  'src/vite.ts',
  'src/webpack.ts',
];

export default [
  transpile('cjs', [...nodeInputs, 'src/cli.ts'], 'dist/cjs'),
  transpile('esm', nodeInputs, 'dist/esm'),
  transpile('cjs', ['src/browser.ts'], 'dist/cjs', false),
  transpile('esm', ['src/browser.ts'], 'dist/esm', false),
];
