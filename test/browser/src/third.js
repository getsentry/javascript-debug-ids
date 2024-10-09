import { getDebugIdForUrl } from '@debugids/browser';
import { defaultStackParser } from '@sentry/browser';

export async function doWork() {
  // parse the stack trace which should go though a few files to get to here
  const frames = defaultStackParser(new Error().stack, 0, 0);
  // Call getDebugIdForUrl for each frame
  const results = {};
  for (const frame of frames) {
    const path = new URL(frame.filename, location.href).pathname;
    results[path] = await getDebugIdForUrl(frame.filename);
  }
  // Add the results to the HTML
  const pre = document.createElement('pre');
  pre.id = 'results';
  pre.innerHTML = JSON.stringify(results, null, 2);
  document.body.appendChild(pre);
}
