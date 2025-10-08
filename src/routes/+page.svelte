<script lang="ts">
  import HabitCard from '$lib/components/HabitCard.svelte';
  import { habits, type Habit, todayISO, calcStreak, setTodayAll } from '$lib/stores/habits';
  import { habitsToCSV, downloadCSV } from '$lib/csv';

  // UI state
  let q = '';
  let sortBy: 'created' | 'name' = 'created';
  let onlyDoneToday = false;
  let lastDeleted: Habit | null = null;

  // --- helpers ---
  const str = (x: unknown) => (x == null ? '' : String(x));
  const isArr = (x: unknown): x is Habit[] => Array.isArray(x);

  // Always work with an array (even if store is undefined temporarily)
  $: list = isArr($habits) ? $habits : [];

  // Filter (guarded)
  $: filtered = list.filter((h) => {
    const term = q.trim().toLowerCase();
    if (term && !(h.name?.toLowerCase().includes(term) || h.description?.toLowerCase().includes(term))) return false;
    if (onlyDoneToday && !h.completions?.includes(todayISO())) return false;
    return true;
  });

  // Sort (guarded, no assumptions about createdAt)
  $: ordered = (() => {
    const arr = [...filtered];
    if (sortBy === 'name') return arr.sort((a, b) => str(a.name).localeCompare(str(b.name)));
    return arr.sort((a, b) => str(b.createdAt).localeCompare(str(a.createdAt)));
  })();

  // Stats (guarded)
  $: total = list.length;
  $: doneToday = list.filter((h) => h.completions?.includes(todayISO())).length;
  $: bestStreak = Math.max(0, ...list.map((h) => calcStreak(h)));

  // Actions
  function exportCSV() {
    downloadCSV('habits.csv', habitsToCSV(list));
  }
  function onDeleted(e: CustomEvent<Habit>) {
    lastDeleted = e.detail;
  }
  function undoDelete() {
    if (!lastDeleted) return;
    habits.update((xs) => [lastDeleted!, ...(xs ?? [])]);
    lastDeleted = null;
  }
</script>

<h1 class="text-3xl font-bold mb-4">Dashboard</h1>

<!-- Quick stats (also useful to confirm no 500s while computing) -->
<div class="grid grid-cols-3 gap-3 mb-4">
  <div class="p-3 rounded bg-white shadow">
    <div class="text-xs text-gray-500">Total habits</div>
    <div class="text-2xl font-semibold">{total}</div>
  </div>
  <div class="p-3 rounded bg-white shadow">
    <div class="text-xs text-gray-500">Done today</div>
    <div class="text-2xl font-semibold">{doneToday}</div>
  </div>
  <div class="p-3 rounded bg-white shadow">
    <div class="text-xs text-gray-500">Best streak</div>
    <div class="text-2xl font-semibold">{bestStreak}</div>
  </div>
</div>

<!-- Controls -->
<div class="mb-4 flex flex-wrap gap-3 items-center">
  <a class="underline" href="/add">Add (A)</a>
  <a class="underline" href="/add-b">Add (B)</a>

  <input class="rounded border p-2" placeholder="Search habits…" bind:value={q} />
  <label class="flex items-center gap-2">
    <input type="checkbox" bind:checked={onlyDoneToday} />
    <span>Only done today</span>
  </label>
  <select class="rounded border p-2" bind:value={sortBy}>
    <option value="created">Sort: Newest</option>
    <option value="name">Sort: Name</option>
  </select>

  <button class="rounded border px-3 py-2 ml-auto" on:click={exportCSV}>Export CSV</button>
  <div class="flex gap-2 ml-2">
    <button class="rounded border px-3 py-2" on:click={() => setTodayAll(true)}>Mark all today</button>
    <button class="rounded border px-3 py-2" on:click={() => setTodayAll(false)}>Clear all today</button>
  </div>
</div>

{#if list.length === 0}
  <p class="text-gray-600">No habits yet. Use Add (A) or Add (B) above.</p>
{:else if ordered.length === 0}
  <p class="text-gray-600">No matches.</p>
{:else}
  <ul class="space-y-3">
    {#each ordered as h (h.id)}
      <HabitCard habit={h} on:deleted={onDeleted} />
    {/each}
  </ul>
{/if}

{#if lastDeleted}
  <div class="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white border shadow rounded px-4 py-3 flex items-center gap-4">
    <span>Habit deleted.</span>
    <button class="rounded border px-3 py-1" on:click={undoDelete}>Undo</button>
    <button class="text-gray-500" on:click={() => (lastDeleted = null)}>Dismiss</button>
  </div>
{/if}
