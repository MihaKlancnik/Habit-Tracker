import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('add habit and export CSV', async ({ page }) => {
  // Go to Add page
  await page.goto('/');
  await page.click('a[href="/add"]');
  await expect(page).toHaveURL(/\/add/);

  // Create a new habit
  const name = 'Export Habit ' + Date.now();
  await page.fill('#name', name);
  await page.fill('#desc', 'Exported by Playwright');
  await page.click('button:has-text("Save")');
  await expect(page).toHaveURL('/');

  // Ensure the habit appears
  const item = page.locator('li', { hasText: name }).first();
  await expect(item).toBeVisible();

  // Trigger export and capture download
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.click('button:has-text("Export CSV")'),
  ]);

  const suggested = download.suggestedFilename();
  expect(suggested).toBe('habits.csv');

  // Save download to workspace tests/tmp and assert content
  const tmp = path.join(process.cwd(), 'tests', 'tmp');
  fs.mkdirSync(tmp, { recursive: true });
  const filePath = path.join(tmp, suggested);
  await download.saveAs(filePath);
  const content = fs.readFileSync(filePath, 'utf8');
  expect(content).toContain(name);
});
