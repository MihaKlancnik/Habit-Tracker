<script lang="ts">
  import type { Habit } from '$lib/stores/habits';
  export let habit: Habit;

  // Compute last N weeks completion percentage (0..100)
  const WEEKS = 8;
  const today = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  const toISO = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;

  function startOfWeek(d: Date) {
    const x = new Date(d);
    const day = x.getDay(); // 0..6 (Sun..Sat)
    const diff = (day + 6) % 7; // make Monday=0
    x.setDate(x.getDate() - diff);
    x.setHours(0,0,0,0);
    return x;
  }

  $: bars = (() => {
    const done = new Set((habit.completions ?? []));
    const out: { label: string; pct: number }[] = [];
    let end = startOfWeek(today); // current week start
    for (let w=0; w<WEEKS; w++) {
      const weekDays: string[] = [];
      const cur = new Date(end);
      for (let i=0;i<7;i++) {
        weekDays.push(toISO(cur));
        cur.setDate(cur.getDate()+1);
      }
      const hits = weekDays.filter(d => done.has(d)).length;
      const pct = Math.round((hits/7)*100);
      const label = `${end.getDate().toString().padStart(2,'0')}.${(end.getMonth()+1).toString().padStart(2,'0')}.`;
      out.unshift({ label, pct }); // oldest on left
      end.setDate(end.getDate()-7);
    }
    return out;
  })();
</script>

<div class="space-y-2">
  <div class="flex items-end gap-2 h-24">
    {#each bars as b}
      <div class="flex flex-col items-center w-6">
        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded" style={`height:${b.pct}%`}></div>
      </div>
    {/each}
  </div>
  <div class="flex justify-between text-xs text-gray-500">
    {#each bars as b}
      <span>{b.label}</span>
    {/each}
  </div>
</div>

<style>
  .w-6 { width: 16px; }
</style>
