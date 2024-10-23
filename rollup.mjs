import { readFileSync } from 'node:fs';
import { builtinModules } from 'node:module';
import { join, resolve } from 'node:path';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'rollup';

const __dirname = new URL('.', import.meta.url).pathname;

// a simple plugin that adds a package.json file with {type: module}
const modulePackageJson = {
  name: 'package-json-module-type',
  generateBundle() {
    this.emitFile({
      type: 'asset',
      fileName: 'package.json',
      source: '{"type": "module"}',
    });
  },
};

const tsconfig = resolve(__dirname, 'tsconfig.json');

export function transpile(pkg, format, bundle = false) {
  const pkgRoot = join(__dirname, 'packages', pkg);
  const pkgJson = JSON.parse(readFileSync(join(pkgRoot, 'package.json')));
  const external = [...builtinModules, ...Object.keys(pkgJson.dependencies || {})];
  const input = join(pkgRoot, 'src', 'index.ts');
  const outDir = join(pkgRoot, 'dist', format);

  return defineConfig({
    input,
    output: {
      sourcemap: true,
      format,
      dir: outDir,
      preserveModules: !bundle,
    },
    treeshake: { moduleSideEffects: builtinModules },
    plugins: [
      nodeResolve(),
      typescript({ include: [input], outDir, tsconfig }),
      format === 'esm' ? modulePackageJson : {},
    ],
    external,
  });
}
