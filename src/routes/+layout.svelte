
<script lang="ts">
  import '../app.css';
  import { theme } from '$lib/stores/theme';
  import { browser } from '$app/environment';

  // persist whenever it changes (browser only)
  $: if (browser) localStorage.setItem('theme', $theme);
</script>

<!-- ⬇️ The magic: class:dark toggles .dark on THIS root container -->
<div class:dark={$theme === 'dark'}
     class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
  <header class="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
    <a href="/" class="font-semibold">Habit Tracker</a>
    <nav class="flex gap-4">
      <a href="/add">Add (A)</a>
      <a href="/add-b">Add (B)</a>
      <a href="/settings">Settings</a>
    </nav>
  </header>
  <main class="max-w-3xl mx-auto px-4 py-6">
    <slot />
  </main>
</div>
