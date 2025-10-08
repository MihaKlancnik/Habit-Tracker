<script lang="ts">
  import { habits, type Habit } from '$lib/stores/habits';
  import { goto } from '$app/navigation';

  let name = '';
  let description = '';

  function addHabit() {
    if (!name.trim()) return;
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
    <label class="block text-sm font-medium">Name</label>
    <input class="w-full rounded border p-2" bind:value={name} placeholder="e.g., Drink water" required />
  </div>

  <div class="space-y-1">
    <label class="block text-sm font-medium">Description</label>
    <textarea class="w-full rounded border p-2" rows="3" bind:value={description} placeholder="Optional"></textarea>
  </div>

  <button class="rounded bg-black text-white px-4 py-2">Save</button>
</form>