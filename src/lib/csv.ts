// src/lib/csv.ts
import type { Habit } from '$lib/stores/habits';

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
