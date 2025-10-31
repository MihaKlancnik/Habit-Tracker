<script lang="ts">
  // Note: This route is kept for future A/B testing but hidden from navigation.
  // You can disable it entirely by redirecting to /add below.
  // import { goto } from '$app/navigation';
  // goto('/add');
  import { habits, type Habit } from '$lib/stores/habits';
  import { goto } from '$app/navigation';

  let step = 1;
  let name = '';
  let description = '';
  const MAX_NAME = 100;
  const MAX_DESC = 200;
  let nameError = '';
  let descError = '';

  function next() {
    nameError = '';
    if (step === 1) {
      if (!name.trim()) {
        nameError = 'Name is required';
        return;
      }
      if (name.trim().length > MAX_NAME) {
        nameError = `Name must be at most ${MAX_NAME} characters`;
        return;
      }
    }
    step = 2;
  }

  function create() {
    descError = '';
    if (!name.trim()) return;
    if (description && description.length > MAX_DESC) {
      descError = `Description must be at most ${MAX_DESC} characters`;
      return;
    }
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
    <label class="block text-sm font-medium" for="name">Name</label>
    <input id="name" class="w-full rounded border p-2" bind:value={name} placeholder="e.g., Read 10 pages" on:input={() => (nameError = '')} />
    {#if nameError}<div class="text-sm text-red-600">{nameError}</div>{/if}
    <button class="rounded bg-black text-white px-4 py-2" on:click={next}>Next</button>
  </div>
{:else}
  <div class="space-y-3">
    <div class="space-y-1">
      <label class="block text-sm font-medium" for="desc">Description</label>
      <textarea id="desc" class="w-full rounded border p-2" rows="3" bind:value={description} placeholder="Optional" on:input={() => (descError = '')}></textarea>
      {#if descError}<div class="text-sm text-red-600">{descError}</div>{/if}
    </div>
    <div class="flex gap-2">
      <button class="rounded border px-4 py-2" on:click={() => (step = 1)}>Back</button>
      <button class="rounded bg-black text-white px-4 py-2" on:click={create} disabled={!!descError}>Create</button>
    </div>
  </div>
{/if}