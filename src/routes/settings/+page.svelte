<script lang="ts">
  import { theme } from '$lib/stores/theme'; // you can keep/remove the theme store if unused
  import { habits } from '$lib/stores/habits';

  function clearAll() {
    if (!confirm('This will delete ALL habits. Continue?')) return;
    habits.set([]);
    localStorage.removeItem('habits');
    alert('All data cleared.');
  }
</script>

<h1 class="text-2xl font-bold mb-4">Settings</h1>

<div class="space-y-6">
  <section>
    <h2 class="font-semibold mb-2">Data</h2>
    <button class="rounded border px-3 py-2 text-red-600" on:click={clearAll}>Clear all data</button>
  </section>
</div>
