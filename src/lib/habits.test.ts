import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { normalizeHabit, calcStreak } from './stores/habits';

describe('habits store utilities', () => {
  it('normalizeHabit coerces types and defaults', () => {
    const raw: any = { id: 'x', name: 'N', target: '5', completions: [1, '2'] };
    const h = normalizeHabit(raw as any);
    expect(h.id).toBe('x');
    expect(h.name).toBe('N');
    expect(h.target).toBe(5);
    expect(h.completions).toEqual(['1', '2']);
  });

  it('calcStreak computes consecutive days ending today', () => {
    // fix the system time so test is deterministic
    vi.setSystemTime(new Date('2025-11-29T12:00:00'));
    const h: any = {
      id: 's1',
      name: 'S',
      createdAt: '2025-01-01',
      completions: ['2025-11-29', '2025-11-28', '2025-11-26'],
    };
    const s = calcStreak(h);
    // 29 and 28 are consecutive, 26 breaks streak
    expect(s).toBe(2);
    vi.useRealTimers();
  });
});
