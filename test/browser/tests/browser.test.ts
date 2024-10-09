import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { getDebugIdFromString } from '@debugids/common';
import { expect, test } from '@playwright/test';

const distPath = join(__dirname, '..', 'dist');

test('can get debug IDs from stack trace', async ({ page }) => {
  await page.goto('/');

  await page.waitForSelector('#results');

  const resultsJson = await page.locator('#results').innerHTML();
  const results = JSON.parse(resultsJson);

  let fileCount = 0;

  for (const [file, debugId] of Object.entries(results)) {
    const sourceContent = await readFile(join(distPath, file), 'utf-8');
    const expectedDebugId = getDebugIdFromString(sourceContent);
    expect(debugId).toBe(expectedDebugId);
    fileCount++;
  }

  expect(fileCount).toBeGreaterThanOrEqual(2);
});
