import { getDebugIdFromString } from '@debugids/common';

export async function getDebugIdForUrl(url: string): Promise<string | undefined> {
  try {
    const text = await fetch(url, { cache: 'force-cache' }).then((res) => res.text());
    return getDebugIdFromString(text);
  } catch (_) {}

  return;
}
