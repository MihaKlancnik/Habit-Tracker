import { defineConfig } from 'vitest/config';
import path from 'path';

// Minimal Vitest config: use jsdom and avoid loading Vite plugins (Svelte).
// Add path aliases so imports like `$lib/...` and `$app/environment` resolve in tests.
export default defineConfig({
  resolve: {
    alias: {
      $lib: path.resolve(__dirname, 'src/lib'),
      '$app/environment': path.resolve(__dirname, 'src/testing/app-environment.ts'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.test.ts'],
  },
  // Explicitly set no Vite plugins so the Svelte plugin isn't configured during tests
  plugins: [],
});
