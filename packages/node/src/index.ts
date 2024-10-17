import * as fs from 'node:fs/promises';
import { getDebugIdFromString } from '@debugids/common';

async function getLastBytesFromFile(path: string, bytesToRead = 1024): Promise<Buffer> {
  let handle: fs.FileHandle | undefined;
  try {
    handle = await fs.open(path, 'r');
    const { size } = await handle.stat();
    const position = Math.max(0, size - bytesToRead);
    const { buffer } = await handle.read(Buffer.alloc(bytesToRead), 0, bytesToRead, position);
    return buffer;
  } finally {
    await handle?.close();
  }
}

export async function getDebugIdForUrl(pathOrUrl: string): Promise<string | undefined> {
  try {
    const endOfFile = await getLastBytesFromFile(pathOrUrl);
    const eofString = endOfFile.toString('utf-8');
    return getDebugIdFromString(eofString);
  } catch (_) {}

  return;
}
