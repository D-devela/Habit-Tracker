import { describe, it, expect } from 'vitest';
import { calculateCurrentStreak } from '@/lib/streaks';

describe('calculateCurrentStreak - full coverage', () => {
  it('returns 0 when no completions', () => {
    expect(calculateCurrentStreak([])).toBe(0);
  });

  it('returns 0 when today not completed', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    expect(calculateCurrentStreak([yesterdayStr])).toBe(0);
  });

  it('returns 1 when only today completed', () => {
    expect(calculateCurrentStreak(['2024-01-15'])).toBe(1);
  });

  it('calculates multi-day streak', () => {
    const completions = ['2024-01-15', '2024-01-14', '2024-01-13'];
    expect(calculateCurrentStreak(completions, '2024-01-15')).toBe(3);
  });

  it('handles duplicates', () => {
    const completions = ['2024-01-15', '2024-01-15', '2024-01-14'];
    expect(calculateCurrentStreak(completions, '2024-01-15')).toBe(2);
  });
});
