<script lang="ts">
  import '../app.css';
  import { theme } from '$lib/stores/theme';
  import { habits } from '$lib/stores/habits';
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';

  // persist whenever it changes (browser only)
  $: if (browser) localStorage.setItem('theme', $theme);

  // Also reflect theme on <html> so Tailwind dark: variants apply globally
  $: if (browser) {
    document.documentElement.classList.toggle('dark', $theme === 'dark');
  }

  // Keyboard shortcuts removed

  // Random habit navigation (client only)
  function goRandom() {
    const list = $habits ?? [];
    if (!list.length) return alert('No habits yet');
    const idx = Math.floor(Math.random() * list.length);
    const id = list[idx].id;
    goto(`/habit/${id}`);
  }

  // Shortcuts help removed
</script>


<div class:dark={$theme === 'dark'}
     class="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
  <header class="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-800">
    <div class="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
      <a href="/" class="font-semibold tracking-tight">Habit Tracker</a>
      <nav class="flex gap-2">
  <a class="rounded px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800" href="/add">Add</a>
        <a class="rounded px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800" href="/settings">Settings</a>
  <button type="button" class="rounded px-3 py-1.5 border hover:bg-gray-50 dark:hover:bg-gray-800" on:click={goRandom}>Random</button>
      </nav>
    </div>
  </header>
  <main class="max-w-3xl mx-auto px-4 py-6">
    <slot />
  </main>
</div>

<!-- Shortcuts help removed -->
