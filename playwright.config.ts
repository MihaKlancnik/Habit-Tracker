import { defineConfig } from '@playwright/test';

// Allow customizing visibility and speed via environment variables:
// - E2E_HEADLESS: 'true' or 'false' (defaults to 'true')
// - E2E_SLOW_MS: number of milliseconds to slow down actions (defaults to 0)
const headless = process.env.E2E_HEADLESS ? process.env.E2E_HEADLESS === 'true' : true;
const slowMo = process.env.E2E_SLOW_MS ? Number(process.env.E2E_SLOW_MS) : 0;

export default defineConfig({
  testDir: 'tests/e2e',
  timeout: 30_000,
  expect: {
    timeout: 5000,
  },
  use: {
    headless,
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    launchOptions: {
      slowMo,
    },
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: true,
    timeout: 180_000,
  },
});
