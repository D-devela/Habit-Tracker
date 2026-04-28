import { describe, expect, it } from 'vitest';
import { toggleHabitCompletion } from '@/lib/habits';
import { Habit } from '@/types/habit';

describe('toggleHabitCompletion', () => {
  const mockHabit: Habit = {
    id: '1',
    userId: 'user1',
    name: 'Test Habit',
    description: '',
    frequency: 'daily',
    createdAt: '2024-01-01',
    completions: ['2024-01-14']
  };

  it('adds a completion date when the date is not present', () => {
    const result = toggleHabitCompletion(mockHabit, '2024-01-15');
    expect(result.completions).toContain('2024-01-15');
    expect(result.completions).toHaveLength(2);
  });

  it('removes a completion date when the date already exists', () => {
    const result = toggleHabitCompletion(mockHabit, '2024-01-14');
    expect(result.completions).not.toContain('2024-01-14');
    expect(result.completions).toHaveLength(0);
  });

  it('does not mutate the original habit object', () => {
    const original = { ...mockHabit };
    toggleHabitCompletion(mockHabit, '2024-01-15');
    expect(mockHabit).toEqual(original);
  });

  it('does not return duplicate completion dates', () => {
    const habitWithDuplicates = {
      ...mockHabit,
      completions: ['2024-01-14', '2024-01-14']
    };
    const result = toggleHabitCompletion(habitWithDuplicates, '2024-01-15');
    const uniqueDates = new Set(result.completions);
    expect(uniqueDates.size).toBe(result.completions.length);
  });
});