<script lang="ts">
  import { theme } from '$lib/stores/theme'; // you can keep/remove the theme store if unused
  import { habits, importHabits } from '$lib/stores/habits';
  import { parseCSV, parseJSON, habitsToCSV, downloadCSV } from '$lib/csv';

  function clearAll() {
    if (!confirm('This will delete ALL habits. Continue?')) return;
    habits.set([]);
    localStorage.removeItem('habits');
    alert('All data cleared.');
  }

  function onImportJSON(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    file.text().then((txt) => {
      const items = parseJSON(txt);
      importHabits(items, 'append');
      alert(`Imported ${items.length} habits from JSON.`);
      input.value = '';
    });
  }

  function onImportCSV(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    file.text().then((txt) => {
      const items = parseCSV(txt);
      importHabits(items, 'append');
      alert(`Imported ${items.length} habits from CSV.`);
      input.value = '';
    });
  }

  function downloadSampleJSON() {
    const sample = [
      { id: 'demo-1', name: 'Drink water', description: '8 glasses', createdAt: new Date().toISOString(), completions: [] },
      { id: 'demo-2', name: 'Read 10 pages', createdAt: new Date().toISOString(), completions: [] }
    ];
    const blob = new Blob([JSON.stringify({ habits: sample }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'habits-sample.json'; a.click(); URL.revokeObjectURL(url);
  }

  function downloadSampleCSV() {
    const sample = [
      { id: 'demo-1', name: 'Drink water', description: '8 glasses', createdAt: new Date().toISOString(), completions: [] },
      { id: 'demo-2', name: 'Read 10 pages', createdAt: new Date().toISOString(), completions: [] }
    ] as any;
    downloadCSV('habits-sample.csv', habitsToCSV(sample));
  }
</script>

<h1 class="text-2xl font-bold mb-4">Settings</h1>

<div class="space-y-6">
  <section>
    <h2 class="font-semibold mb-2">Data</h2>
    <button class="rounded border px-3 py-2 text-red-600" on:click={clearAll}>Clear all data</button>
  </section>

  <section>
    <h2 class="font-semibold mb-2">Import/Export</h2>
    <div class="space-y-2">
      <div class="flex items-center gap-3">
        <label class="rounded border px-3 py-2 cursor-pointer">
          Import JSON
          <input type="file" accept="application/json,.json" class="hidden" on:change={onImportJSON} />
        </label>
        <label class="rounded border px-3 py-2 cursor-pointer">
          Import CSV
          <input type="file" accept="text/csv,.csv" class="hidden" on:change={onImportCSV} />
        </label>
      </div>
      <div class="flex items-center gap-3">
        <button class="rounded border px-3 py-2" on:click={downloadSampleJSON}>Download sample JSON</button>
        <button class="rounded border px-3 py-2" on:click={downloadSampleCSV}>Download sample CSV</button>
      </div>
    </div>
  </section>
</div>
