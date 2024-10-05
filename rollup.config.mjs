import { builtinModules } from 'node:module';
import { resolve, join } from 'node:path';
import { readFileSync } from 'node:fs';
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const __dirname = new URL('.', import.meta.url).pathname;

// a simple plugin that adds a package.json file with {type: module}
const modulePackageJson = {
  name: 'package-json-module-type',
  generateBundle() {
    this.emitFile({ type: 'asset', fileName: 'package.json', source: '{"type": "module"}' });
  },
};

const tsconfig = resolve(__dirname, 'tsconfig.json');

function transpile(pkg, format, bundle = false) {
  const pkgRoot = join(__dirname, 'packages', pkg);
  const pkgJson = JSON.parse(readFileSync(join(pkgRoot, 'package.json')));
  const external = [...builtinModules, ...Object.keys(pkgJson.dependencies || {})];
  const input = join(pkgRoot, 'src', 'index.ts');
  const outDir = join(pkgRoot, 'dist', format);

  return {
    input,
    output: {
      sourcemap: true,
      format,
      dir: outDir,
      preserveModules: !bundle,
    },
    treeshake: { moduleSideEffects: false },
    plugins: [
      nodeResolve(),
      typescript({ include: [input], outDir, tsconfig }),
      format === 'esm' ? modulePackageJson : {},
    ],
    external,
  };
}

export default [
  ...['common', 'esbuild', 'rollup', 'webpack', 'parcel', 'rolldown', 'rspack', 'vite', 'node', 'cli'].reduce(
    (acc, pkg) => [...acc, transpile(pkg, 'cjs'), transpile(pkg, 'esm')],
    [],
  ),
  transpile('browser', 'cjs', true),
  transpile('browser', 'esm', true),
];
