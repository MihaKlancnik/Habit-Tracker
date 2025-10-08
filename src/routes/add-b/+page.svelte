<script lang="ts">
  import { habits, type Habit } from '$lib/stores/habits';
  import { goto } from '$app/navigation';

  let step = 1;
  let name = '';
  let description = '';

  function next() {
    if (step === 1 && !name.trim()) return;
    step = 2;
  }

  function create() {
    if (!name.trim()) return;
    const h: Habit = {
      id: crypto.randomUUID(),
      name: name.trim(),
      description: description.trim(),
      createdAt: new Date().toISOString(),
      completions: []
    };
    habits.update((list) => [h, ...list]);
    goto('/');
  }
</script>

<h1 class="text-2xl font-bold mb-4">Add Habit (B)</h1>

{#if step === 1}
  <div class="space-y-2">
    <label class="block text-sm font-medium">Name</label>
    <input class="w-full rounded border p-2" bind:value={name} placeholder="e.g., Read 10 pages" required />
    <button class="rounded bg-black text-white px-4 py-2" on:click={next}>Next</button>
  </div>
{:else}
  <div class="space-y-3">
    <div class="space-y-1">
      <label class="block text-sm font-medium">Description</label>
      <textarea class="w-full rounded border p-2" rows="3" bind:value={description} placeholder="Optional"></textarea>
    </div>
    <div class="flex gap-2">
      <button class="rounded border px-4 py-2" on:click={() => (step = 1)}>Back</button>
      <button class="rounded bg-black text-white px-4 py-2" on:click={create}>Create</button>
    </div>
  </div>
{/if}