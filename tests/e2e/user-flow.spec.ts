import { test, expect } from '@playwright/test';

test('add → mark → details → delete (with undo)', async ({ page }) => {
  // Start at the dashboard
  await page.goto('/');

  // Navigate to Add page
  await page.click('a[href="/add"]');
  await expect(page).toHaveURL(/\/add/);

  // Fill the form and save
  const name = 'E2E Habit ' + Date.now();
  await page.fill('#name', name);
  await page.fill('#desc', 'Created by Playwright test');

  await page.click('button:has-text("Save")');
  await expect(page).toHaveURL('/');

  // Find the created habit card
  const item = page.locator('li', { hasText: name }).first();
  await expect(item).toBeVisible();

  // Mark today
  await item.locator('button:has-text("Mark today")').click();
  await expect(item.locator('button:has-text("Done ✓")')).toBeVisible();

  // Open details
  await item.locator('a[href^="/habit/"]').click();
  await expect(page.locator('text=Last 14 days')).toBeVisible();

  // Back to dashboard
  await page.click('a:has-text("← Back")');
  await expect(page).toHaveURL('/');

  // Delete the habit (confirm dialog)
  page.once('dialog', (d) => d.accept());
  await item.locator('button:has-text("Delete")').click();

  // Snackbar appears
  await expect(page.locator('text=Habit deleted.')).toBeVisible();

  // Undo deletion
  await page.click('button:has-text("Undo")');
  // there may be multiple matches; assert the first returned item is visible
  await expect(page.locator('li', { hasText: name }).first()).toBeVisible();

  // Cleanup: delete again
  page.once('dialog', (d) => d.accept());
  await item.locator('button:has-text("Delete")').click();
  await expect(page.locator('text=Habit deleted.')).toBeVisible();
});
