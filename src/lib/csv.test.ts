import { describe, it, expect } from 'vitest';
import { habitsToCSV, parseCSV, parseJSON } from './csv';

describe('csv utilities', () => {
  it('roundtrips habits -> csv -> parseCSV', () => {
    const sample = [
      {
        id: 'h1',
        name: 'Read',
        description: 'Read books',
        createdAt: '2025-11-29T00:00:00.000Z',
        completions: ['2025-11-28', '2025-11-29'],
      },
    ];
    const csv = habitsToCSV(sample as any);
    const parsed = parseCSV(csv);
    expect(parsed).toHaveLength(1);
    const p = parsed[0];
    expect(p.id).toBe('h1');
    expect(p.name).toBe('Read');
    expect(p.description).toBe('Read books');
    expect(p.completions).toEqual(['2025-11-28', '2025-11-29']);
  });

  it('parseJSON accepts array and object with habits key', () => {
    const a = JSON.stringify([
      { id: 'a1', name: 'A', createdAt: '2025-01-01', completions: [] },
    ]);
    const p1 = parseJSON(a);
    expect(p1).toHaveLength(1);

    const o = JSON.stringify({ habits: [{ id: 'b1', name: 'B', createdAt: '2025-01-02', completions: [] }] });
    const p2 = parseJSON(o);
    expect(p2).toHaveLength(1);

    const bad = 'not json';
    expect(parseJSON(bad)).toEqual([]);
  });
});
