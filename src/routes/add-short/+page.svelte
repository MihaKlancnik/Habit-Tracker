<script lang="ts">
  import { habits, type Habit } from '$lib/stores/habits';
  import { goto } from '$app/navigation';

  let name = '';
  let shortNote = '';
  let error = '';
  const MAX_LEN = 50;
  const MAX_NAME = 100;
  let nameError = '';
  let noteError = '';

  function addShortHabit() {
    nameError = '';
    noteError = '';
    if (!name.trim()) {
      nameError = 'Name is required';
      return;
    }
    if (name.trim().length > MAX_NAME) {
      nameError = `Name must be at most ${MAX_NAME} characters`;
      return;
    }
    if (!shortNote.trim()) {
      noteError = 'Short note is required';
      return;
    }
    if (shortNote.length > MAX_LEN) {
      noteError = `Short note must be at most ${MAX_LEN} characters`;
      return;
    }

    const h: Habit = {
      id: crypto.randomUUID(),
      name: name.trim(),
      description: shortNote.trim(),
      createdAt: new Date().toISOString(),
      completions: []
    };
    habits.update((list) => [h, ...list]);
    goto('/');
  }
</script>

<h1 class="text-2xl font-bold mb-4">Add Short Habit</h1>
<form class="space-y-3" on:submit|preventDefault={addShortHabit}>
  <div class="space-y-1">
    <label class="block text-sm font-medium" for="name">Name</label>
    <input id="name" class="w-full rounded border p-2" bind:value={name} placeholder="e.g., Stretch" on:input={() => (nameError = '')} />
    {#if nameError}<div class="text-sm text-red-600">{nameError}</div>{/if}
  </div>

  <div class="space-y-1">
    <label class="block text-sm font-medium" for="note">Short note (required, max {MAX_LEN} chars)</label>
    <input id="note" class="w-full rounded border p-2" bind:value={shortNote} placeholder="Short note" maxlength={MAX_LEN} on:input={() => (noteError = '')} />
    <p class="text-xs text-gray-500">This note must be non-empty and no longer than {MAX_LEN} characters.</p>
    {#if noteError}<div class="text-sm text-red-600">{noteError}</div>{/if}
  </div>

  <button class="rounded bg-black text-white px-4 py-2" on:click={addShortHabit}>Create</button>
</form>
