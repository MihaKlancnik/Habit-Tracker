import { test, expect } from '@playwright/test';

test('import CSV via settings', async ({ page }) => {
  // Navigate to settings
  await page.goto('/settings');

  // Use the CSV fixture file under tests/fixtures/import.csv
  const fixturePath = 'tests/fixtures/import.csv';

  // Listen for the alert dialog that confirms import
  const dialogPromise = page.waitForEvent('dialog');

  // Upload the CSV file to the hidden input (Playwright resolves relative paths)
  const fileInput = page.locator('input[type=file][accept*="csv"]');
  await fileInput.setInputFiles(fixturePath);

  // Wait for and assert the alert message
  const dialog = await dialogPromise;
  expect(dialog.message()).toContain('Imported 1 habits from CSV');
  await dialog.accept();

  // Go back to dashboard and verify the imported habit appears
  await page.goto('/');
  const item = page.locator('li', { hasText: 'CSV Fixture Habit' }).first();
  await expect(item).toBeVisible();
});
