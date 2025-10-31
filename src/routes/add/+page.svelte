<script lang="ts">
  import { habits, type Habit } from '$lib/stores/habits';
  import { goto } from '$app/navigation';

  let name = '';
  let description = '';
  // validation
  const MAX_NAME = 100;
  const MAX_DESC = 200;
  let nameError = '';
  let descError = '';

  function validate() {
    nameError = '';
    descError = '';
    if (!name.trim()) nameError = 'Name is required';
    else if (name.trim().length > MAX_NAME) nameError = `Name must be at most ${MAX_NAME} characters`;
    if (description && description.length > MAX_DESC) descError = `Description must be at most ${MAX_DESC} characters`;
    return !nameError && !descError;
  }

  function addHabit() {
    if (!validate()) return;
    const h: Habit = {
      id: crypto.randomUUID(),
      name: name.trim(),
      description: description.trim(),
      createdAt: new Date().toISOString(),
      completions: []
    };
    habits.update((list) => [h, ...list]);
    goto('/'); // back to dashboard
  }
</script>

<h1 class="text-2xl font-bold mb-4">Add Habit</h1>
<form class="space-y-3" on:submit|preventDefault={addHabit}>
  <div class="space-y-1">
    <label class="block text-sm font-medium" for="name">Name</label>
    <input id="name" class="w-full rounded border p-2" bind:value={name} placeholder="e.g., Drink water" on:input={() => (nameError = '')} />
    {#if nameError}<div class="text-sm text-red-600">{nameError}</div>{/if}
  </div>

  <div class="space-y-1">
    <label class="block text-sm font-medium" for="desc">Description</label>
    <textarea id="desc" class="w-full rounded border p-2" rows="3" bind:value={description} placeholder="Optional" on:input={() => (descError = '')}></textarea>
    {#if descError}<div class="text-sm text-red-600">{descError}</div>{/if}
  </div>

  <button class="rounded bg-black text-white px-4 py-2" on:click={addHabit} disabled={!validate()}>Save</button>
</form>