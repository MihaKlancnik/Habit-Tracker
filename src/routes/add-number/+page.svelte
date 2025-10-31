<script lang="ts">
  import { habits, type Habit } from '$lib/stores/habits';
  import { goto } from '$app/navigation';

  let name = '';
  let target: number | undefined = undefined;
  let nameError = '';
  let targetError = '';
  const MAX_NAME = 100;

  function validateTarget(n: number | undefined) {
    if (n == null || Number.isNaN(n)) return 'Target is required';
    if (!Number.isFinite(n) || !Number.isInteger(n)) return 'Target must be an integer';
    if (n <= 0) return 'Target must be greater than 0';
    if (n >= 100) return 'Target must be smaller than 100';
    return '';
  }

  function addNumberHabit() {
    nameError = '';
    targetError = '';
    if (!name.trim()) {
      nameError = 'Name is required';
      return;
    }
    if (name.trim().length > MAX_NAME) {
      nameError = `Name must be at most ${MAX_NAME} characters`;
      return;
    }
    const tErr = validateTarget(target);
    if (tErr) {
      targetError = tErr;
      return;
    }

    const h: Habit = {
      id: crypto.randomUUID(),
      name: name.trim(),
      description: `Daily target: ${target}`,
      target: target,
      createdAt: new Date().toISOString(),
      completions: []
    };
    habits.update((list) => [h, ...list]);
    goto('/');
  }
</script>

<h1 class="text-2xl font-bold mb-4">Add Numeric Habit</h1>
<form class="space-y-3" on:submit|preventDefault={addNumberHabit}>
  <div class="space-y-1">
    <label class="block text-sm font-medium" for="name">Name</label>
    <input id="name" class="w-full rounded border p-2" bind:value={name} placeholder="e.g., Read pages" on:input={() => (nameError = '')} />
    {#if nameError}<div class="text-sm text-red-600">{nameError}</div>{/if}
  </div>

  <div class="space-y-1">
    <label class="block text-sm font-medium" for="target">Daily target (number, &lt; 100)</label>
    <input id="target" type="number" min="1" max="99" class="w-full rounded border p-2" bind:value={target} on:input={() => (targetError = '')} />
    <p class="text-xs text-gray-500">Only integers allowed. Must be &gt; 0 and &lt; 100.</p>
    {#if targetError}<div class="text-sm text-red-600">{targetError}</div>{/if}
  </div>

  <button class="rounded bg-black text-white px-4 py-2" on:click={addNumberHabit}>Save</button>
</form>
