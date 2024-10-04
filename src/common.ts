import * as crypto from 'crypto';
import { opendir } from 'fs/promises';
import { join } from 'path';

export const DEFAULT_EXTENSIONS = ['.js', '.mjs', '.cjs'];

export function stringToUUID(str: string): string {
  const md5sum = crypto.createHash('md5');
  md5sum.update(str);
  const md5Hash = md5sum.digest('hex');

  // Position 16 is fixed to either 8, 9, a, or b in the uuid v4 spec (10xx in binary)
  // RFC 4122 section 4.4
  const v4variant = ['8', '9', 'a', 'b'][md5Hash.substring(16, 17).charCodeAt(0) % 4] as string;

  return (
    md5Hash.substring(0, 8) +
    '-' +
    md5Hash.substring(8, 12) +
    '-4' +
    md5Hash.substring(13, 16) +
    '-' +
    v4variant +
    md5Hash.substring(17, 20) +
    '-' +
    md5Hash.substring(20)
  ).toLowerCase();
}

export function addDebugIdToSource(input: string, debugId: string): string {
  return input.replace(/\s*(?:\/\/# debugId=.+)?\s*(\/\/# sourceMappingURL=.+)?\s*$/, `\n//# debugId=${debugId}\n$1`);
}

export function addDebugIdToSourcemap(input: string, debugId: string): string {
  const sourceMapObj = JSON.parse(input);
  sourceMapObj.debugId = debugId;
  return JSON.stringify(sourceMapObj);
}

const DEBUG_ID_REGEX = /\/\/# debugId=([a-fA-F0-9-]+)(?![\s\S]*\/\/# debugId=)/m;

export function getDebugIdFromString(input: string): string | undefined {
  const match = input.match(DEBUG_ID_REGEX);
  return match ? match[1] : undefined;
}

export async function walk(path: string, extensions: string[]): Promise<string[]> {
  let files = [];

  for await (const file of await opendir(path)) {
    if (file.isDirectory()) {
      files.push(...(await walk(join(path, file.name), extensions)));
    } else {
      if (extensions.some((ext) => file.name.endsWith(ext))) {
        files.push(join(path, file.name));
      }
    }
  }

  return files;
}
