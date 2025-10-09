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

  if (browser) {
    onMount(() => {
      const onKey = (e: KeyboardEvent) => {
        if (e.key === '1') {
          window.location.href = '/add';
        } else if (e.key.toLowerCase() === 'r') {
          goRandom();
        } else if (e.key === '?') {
          showHelp = !showHelp;
        }
      };
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    });
  }

  // Random habit navigation (client only)
  function goRandom() {
    const list = $habits ?? [];
    if (!list.length) return alert('No habits yet');
    const idx = Math.floor(Math.random() * list.length);
    const id = list[idx].id;
    goto(`/habit/${id}`);
  }

  let showHelp = false;
</script>


<div class:dark={$theme === 'dark'}
     class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
  <header class="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
    <a href="/" class="font-semibold">Habit Tracker</a>
    <nav class="flex gap-4">
  <a href="/add">Add (1)</a>
      <a href="/add-b">Add (B)</a>
      <a href="/settings">Settings</a>
      <button type="button" class="rounded border px-2 py-1" on:click={goRandom}>Random (R)</button>
      <button type="button" class="rounded border px-2 py-1" on:click={() => (showHelp = !showHelp)} aria-haspopup="dialog">Shortcuts (?)</button>
    </nav>
  </header>
  <main class="max-w-3xl mx-auto px-4 py-6">
    <slot />
  </main>
</div>

{#if showHelp}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center" role="dialog" aria-modal="true">
    <div class="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded shadow p-4 w-full max-w-md">
      <h2 class="text-lg font-semibold mb-2">Keyboard shortcuts</h2>
      <ul class="list-disc pl-5 space-y-1">
  <li><strong>1</strong> — Add habit</li>
        <li><strong>R</strong> — Random habit</li>
        <li><strong>?</strong> — Toggle this help</li>
      </ul>
      <div class="text-right mt-4">
        <button type="button" class="rounded border px-3 py-1" on:click={() => (showHelp = false)}>Close</button>
      </div>
    </div>
  </div>
{/if}
