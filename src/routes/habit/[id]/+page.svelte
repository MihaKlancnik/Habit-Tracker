<script lang="ts">
  import { habits, type Habit, toggleDate, todayISO, updateHabit } from '$lib/stores/habits';
  import ProgressChart from '$lib/components/ProgressChart.svelte';
  import { page } from '$app/stores';
  import { derived } from 'svelte/store';

  // get habit by id from the store
  const current = derived([habits, page], ([$habits, $page]) => $habits.find(h => h.id === $page.params.id));

  // build last 14 days array: [{iso, label}]
  const pad = (n: number) => String(n).padStart(2,'0');
  function lastDays(n = 14) {
    const out: { iso: string; label: string }[] = [];
    const d = new Date();
    for (let i=0;i<n;i++) {
      const iso = `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
      const label = d.toLocaleDateString(undefined, { weekday: 'short', day: '2-digit' }); // e.g. Mon 07
      out.push({ iso, label });
      d.setDate(d.getDate()-1);
    }
    return out;
  }
  $: days = lastDays(14);

  // simple edit mode
  let editing = false;
  let draftName = '';
  let draftDesc = '';
  $: if ($current && editing) {
    draftName = $current.name;
    draftDesc = $current.description ?? '';
  }

  function startEdit() {
    if (!$current) return;
    editing = true;
    draftName = $current.name;
    draftDesc = $current.description ?? '';
  }
  function saveEdit() {
    if (!$current) return;
    updateHabit($current.id, { name: draftName.trim(), description: draftDesc.trim() });
    editing = false;
  }
  function cancelEdit() {
    editing = false;
  }
</script>

{#if $current}
  {#if !editing}
    <h1 class="text-2xl font-bold mb-2">{$current.name}</h1>
    {#if $current.description}<p class="mb-4 text-gray-600 dark:text-gray-300">{$current.description}</p>{/if}
    <button class="rounded border px-3 py-1 mb-4" on:click={startEdit}>Edit</button>
  {:else}
    <div class="space-y-2 mb-4">
      <label class="block text-sm font-medium" for="name">Name</label>
      <input id="name" class="w-full rounded border p-2" bind:value={draftName} />
      <label class="block text-sm font-medium" for="desc">Description</label>
      <textarea id="desc" class="w-full rounded border p-2" rows="3" bind:value={draftDesc}></textarea>
      <div class="flex gap-2">
        <button class="rounded bg-black text-white px-3 py-1" on:click={saveEdit}>Save</button>
        <button class="rounded border px-3 py-1" on:click={cancelEdit}>Cancel</button>
      </div>
    </div>
  {/if}

  <h2 class="font-semibold mb-2">Last 14 days</h2>
  <div class="grid grid-cols-7 gap-2 mb-6">
    {#each days as d}
      {#if $current}
        <button
          class="px-2 py-3 rounded border text-sm"
          class:bg-black={($current.completions ?? []).includes(d.iso)}
          class:text-white={($current.completions ?? []).includes(d.iso)}
          title={d.iso}
          on:click={() => toggleDate($current.id, d.iso)}
        >
          {d.label}
        </button>
      {/if}
    {/each}
  </div>

  <a href="/" class="underline">← Back</a>
  <h2 class="font-semibold mt-6 mb-2">Progress (last 8 weeks)</h2>
  <ProgressChart habit={$current} />
{:else}
  <p>Habit not found. <a href="/" class="underline">Go back</a></p>
{/if}
