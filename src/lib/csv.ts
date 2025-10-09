// src/lib/csv.ts
import type { Habit, UnknownHabit } from '$lib/stores/habits';
import { normalizeHabit } from '$lib/stores/habits';

// Convert the list of habits to CSV text
export function habitsToCSV(rows: Habit[]): string {
  const header = ['id', 'name', 'description', 'createdAt', 'completions'];
  const escape = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const lines = [header.join(',')];
  for (const h of rows) {
    lines.push(
      [
        h.id,
        h.name,
        h.description ?? '',
        h.createdAt,
        h.completions.join(';'), // semicolon-separated dates
      ]
        .map(escape)
        .join(',')
    );
  }
  return lines.join('\n');
}

// Trigger browser download
export function downloadCSV(filename: string, csv: string) {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// Parse CSV text into Habit[] (best-effort)
export function parseCSV(text: string): Habit[] {
  const lines = text.split(/\r?\n/).filter(Boolean);
  if (lines.length === 0) return [];
  const header = lines[0].split(',').map((h) => h.trim().replace(/^"|"$/g, ''));
  const idx = (name: string) => header.findIndex((h) => h.toLowerCase() === name.toLowerCase());
  const iId = idx('id');
  const iName = idx('name');
  const iDesc = idx('description');
  const iCreated = idx('createdAt');
  const iCompl = idx('completions');

  const out: Habit[] = [];
  for (let r = 1; r < lines.length; r++) {
    const row = safeCSVSplit(lines[r]);
    const raw: UnknownHabit = {
      id: pick(row, iId),
      name: pick(row, iName),
      description: pick(row, iDesc),
      createdAt: pick(row, iCreated),
      completions: (pick(row, iCompl) || '')
        .split(';')
        .map((s) => s.trim())
        .filter(Boolean)
    };
    out.push(normalizeHabit(raw));
  }
  return out;
}

function pick(row: string[], idx: number) {
  return idx >= 0 && idx < row.length ? row[idx] : '';
}

// Simple CSV splitter that respects quoted cells
function safeCSVSplit(line: string): string[] {
  const out: string[] = [];
  let cur = '';
  let q = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (q && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        q = !q;
      }
    } else if (ch === ',' && !q) {
      out.push(cur);
      cur = '';
    } else {
      cur += ch;
    }
  }
  out.push(cur);
  return out.map((cell) => cell.replace(/^"|"$/g, ''));
}

// Parse JSON string into Habit[]
export function parseJSON(text: string): Habit[] {
  try {
    const data: unknown = JSON.parse(text);
  if (Array.isArray(data)) return (data as unknown[]).map((v) => normalizeHabit(v as UnknownHabit));
    if (data && typeof data === 'object' && Array.isArray((data as Record<string, unknown>).habits)) {
  return ((data as Record<string, unknown>).habits as unknown[]).map((v) => normalizeHabit(v as UnknownHabit));
    }
    return [];
  } catch {
    return [];
  }
}
