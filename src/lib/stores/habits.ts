import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Habit = {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  completions: string[]; // YYYY-MM-DD (local)
};

const pad = (n: number) => String(n).padStart(2, '0');
export const todayISO = () => {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

type UnknownHabit = Record<string, unknown> | null | undefined;
function normalizeHabit(x: UnknownHabit): Habit {
  return {
    id: String(x?.id ?? (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2))),
    name: String(x?.name ?? 'Unnamed'),
    description: x?.description != null ? String(x.description) : undefined,
    createdAt: typeof x?.createdAt === 'string' ? x.createdAt : new Date().toISOString(),
    completions: Array.isArray((x as Record<string, unknown> | undefined)?.completions)
      ? ((x as Record<string, unknown>).completions as unknown[]).map((d) => String(d))
      : []
  };
}

function safeLoad(): Habit[] {
  if (!browser) return [];
  try {
    const raw = localStorage.getItem('habits');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map(normalizeHabit);
  } catch {
    // If the stored JSON is corrupted, start fresh instead of crashing
    return [];
  }
}

const start: Habit[] = safeLoad();
export const habits = writable<Habit[]>(start);
if (browser) habits.subscribe(v => localStorage.setItem('habits', JSON.stringify(v)));

export function toggleToday(habitId: string) {
  toggleDate(habitId, todayISO());
}

export function toggleDate(habitId: string, isoDate: string) {
  habits.update(list => list.map(h => {
    if (h.id !== habitId) return h;
    const set = new Set(h.completions ?? []);
    if (set.has(isoDate)) {
      set.delete(isoDate);
    } else {
      set.add(isoDate);
    }
    return { ...h, completions: Array.from(set).sort() };
  }));
}

export function deleteHabit(habitId: string) {
  habits.update(list => list.filter(h => h.id !== habitId));
}

export function duplicateHabit(habitId: string) {
  habits.update(list => {
    const idx = list.findIndex(h => h.id === habitId);
    if (idx === -1) return list;
    const src = list[idx];
    const copy: Habit = {
      ...src,
      id: crypto.randomUUID(),
      name: `${src.name} (copy)`,
      createdAt: new Date().toISOString(),
    };
    return [copy, ...list];
  });
}

export function updateHabit(
  habitId: string,
  changes: Partial<Pick<Habit, 'name' | 'description' | 'createdAt' | 'completions'>>
) {
  habits.update((list) =>
    list.map((h) => {
      if (h.id !== habitId) return h;
      const next: Habit = {
        ...h,
        ...(changes.name !== undefined ? { name: String(changes.name) } : {}),
        ...(changes.description !== undefined ? { description: changes.description } : {}),
        ...(changes.createdAt !== undefined ? { createdAt: changes.createdAt } : {}),
        ...(changes.completions !== undefined ? { completions: [...changes.completions] } : {}),
      };
      return next;
    })
  );
}

export function setTodayAll(done: boolean) {
  const iso = todayISO();
  habits.update((list) =>
    list.map((h) => {
      const set = new Set(h.completions ?? []);
      if (done) set.add(iso);
      else set.delete(iso);
      return { ...h, completions: Array.from(set).sort() };
    })
  );
}

export function calcStreak(h: Habit): number {
  const done = new Set(h.completions ?? []);
  let streak = 0;
  const d = new Date();
  while (true) {
    const iso = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    if (!done.has(iso)) break;
    streak++;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}
