<script lang="ts">
  import type { Habit } from '$lib/stores/habits';
  import { toggleToday, deleteHabit, duplicateHabit, calcStreak, todayISO } from '$lib/stores/habits';
  import { createEventDispatcher } from 'svelte';
  export let habit: Habit;
  const dispatch = createEventDispatcher<{ deleted: Habit }>();

  // Guard against older data where completions might be missing
  $: isDoneToday = (habit.completions ?? []).includes(todayISO());
  $: streak = calcStreak(habit);

  function onDelete() {
    if (confirm(`Delete "${habit.name}"?`)) {
      const copy: Habit = JSON.parse(JSON.stringify(habit));
      deleteHabit(habit.id);
      dispatch('deleted', copy);
    }
  }
</script>

<li class="p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 flex items-start justify-between gap-4 hover:shadow-sm transition-shadow">
  <div class="min-w-0">
    <h3 class="text-lg font-semibold truncate">{habit.name}</h3>
    {#if habit.description}<p class="text-sm text-gray-600 dark:text-gray-300">{habit.description}</p>{/if}
    <p class="text-xs text-gray-500 mt-1">Streak: <strong>{streak}</strong> 🔥</p>
  </div>

  <div class="flex items-center gap-2 shrink-0">
    <button class="rounded-lg px-3 py-2 border hover:bg-gray-50 dark:hover:bg-gray-800" class:bg-black={isDoneToday} class:text-white={isDoneToday} on:click={() => toggleToday(habit.id)}> 
      {isDoneToday ? 'Done ✓' : 'Mark today'}
    </button>
    <a class="rounded-lg px-3 py-2 border hover:bg-gray-50 dark:hover:bg-gray-800" href={`/habit/${habit.id}`}>Details</a>
    <button class="rounded-lg px-3 py-2 border hover:bg-gray-50 dark:hover:bg-gray-800" on:click={() => duplicateHabit(habit.id)}>Duplicate</button>
    <button class="rounded-lg px-3 py-2 border text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20" on:click={onDelete}>Delete</button>
  </div>
</li>
