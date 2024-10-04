import { opendir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { addDebugIdToSource, stringToUUID, DEFAULT_EXTENSIONS, addDebugIdToSourcemap } from './common';

async function walk(path: string, extensions = DEFAULT_EXTENSIONS): Promise<string[]> {
  const extensionsAndMaps = [...extensions, ...extensions.map((e) => `${e}.map`)];
  let files = [];

  for await (const file of await opendir(path)) {
    if (file.isDirectory()) {
      files.push(...(await walk(join(path, file.name))));
    } else {
      if (extensionsAndMaps.some((ext) => file.name.endsWith(ext))) {
        files.push(join(path, file.name));
      }
    }
  }

  return files;
}

async function groupSourceAndMapFiles(files: string[]): Promise<Array<[string, string | undefined]>> {
  const sourceFiles = files.filter((f) => !f.endsWith('.map'));
  const mapFiles = files.filter((f) => f.endsWith('.map'));

  return sourceFiles.map((sourceFile) => {
    const mapFile = mapFiles.find((f) => f === `${sourceFile}.map`);
    return [sourceFile, mapFile];
  });
}

(async () => {
  console.time('Adding debug IDs');
  if (!process.argv[2]) {
    console.error('Usage: debugids <dir>');
    process.exit(1);
  }

  const results = await walk(process.argv[2]);
  const groupedResults = await groupSourceAndMapFiles(results);
  let modifiedFiles: Array<{ source: string; map: string; debugId: string }> = [];
  let missingMaps = new Set<string>();
  let addedDebugIds = 0;

  const promises = groupedResults.map(async ([source, map]) => {
    if (!map) {
      missingMaps.add(source);
      return;
    }

    const [sourceContent, mapContent] = await Promise.all([readFile(source, 'utf-8'), readFile(map, 'utf-8')]);

    const debugId = stringToUUID(sourceContent);
    const newSourceContent = addDebugIdToSource(sourceContent, debugId);
    const newMapContent = addDebugIdToSourcemap(mapContent, debugId);

    modifiedFiles.push({ source, map, debugId });

    await Promise.all([writeFile(source, newSourceContent), writeFile(map, newMapContent)]);
    addedDebugIds++;
  });

  await Promise.all(promises);

  console.timeEnd('Adding debug IDs');
  console.log(`${addedDebugIds} source files modified`);
  console.table(modifiedFiles.sort((a, b) => a.source.localeCompare(b.source)));

  if (missingMaps.size > 0) {
    console.log(`The following files were missing sourcemaps: ${[...missingMaps].join(', ')}`);
  }
})();
