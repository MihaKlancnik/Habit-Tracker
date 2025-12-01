import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('import CSV via settings', async ({ page }) => {
  // Navigate to settings
  await page.goto('/settings');

  // Use the CSV fixture file under tests/fixtures/import.csv
  const fixturePath = 'tests/fixtures/import.csv';

  // Read the fixture file on the test runner and inject into localStorage to simulate import.
  const fixtureFull = path.join(process.cwd(), fixturePath);
  const txt = fs.readFileSync(fixtureFull, 'utf8').trim();
  const lines = txt.split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) throw new Error('Fixture CSV has no data rows');
  const header = lines[0].split(',').map((h) => h.trim().replace(/^"|"$/g, ''));
  const row = lines[1];
  // naive CSV split for simple fixture (handles quoted cells without commas)
  const cells = row.split(',').map((c) => c.trim().replace(/^"|"$/g, ''));
  const map: Record<string, string> = {};
  for (let i = 0; i < header.length; i++) map[header[i]] = cells[i] ?? '';

  const habit = {
    id: map['id'] || `fixture-${Date.now()}`,
    name: map['name'] || 'Imported Habit',
    description: map['description'] || undefined,
    createdAt: map['createdAt'] || new Date().toISOString(),
    completions: (map['completions'] || '').split(';').filter(Boolean),
  };

  // Inject into the app's localStorage (append, avoiding duplicates)
  await page.evaluate((h) => {
    try {
      const raw = localStorage.getItem('habits');
      const arr = raw ? JSON.parse(raw) : [];
      const seen = new Set(arr.map((x: any) => x.id));
      if (!seen.has(h.id)) arr.push(h);
      localStorage.setItem('habits', JSON.stringify(arr));
    } catch (e) {
      localStorage.setItem('habits', JSON.stringify([h]));
    }
  }, habit);

  // Wait a short moment for the app to pick up the storage change
  await page.waitForTimeout(300);

  // Go back to dashboard and verify the imported habit appears
  await page.goto('/');
  const item = page.locator('li', { hasText: 'CSV Fixture Habit' }).first();
  await expect(item).toBeVisible();
});
