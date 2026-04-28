import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import HabitForm from '@/components/habits/HabitForm';
import { storage } from '@/lib/storage';

const mockHabit = {
  id: 'habit1',
  userId: 'user1',
  name: 'Test Habit',
  description: 'Test description',
  frequency: 'daily' as const,
  createdAt: '2024-01-01',
  completions: [],
};

describe('habit-form integration', () => {
  beforeEach(() => {
    storage.setHabits([]);
  });

  it('creates a new habit with valid data', () => {
    const onSave = vi.fn();
    const onCancel = vi.fn();

    render(<HabitForm userId="user1" onSave={onSave} onCancel={onCancel} />);
    
    fireEvent.change(screen.getByTestId('habit-name-input'), {
      target: { value: 'Drink Water' }
    });
    fireEvent.change(screen.getByTestId('habit-description-input'), {
      target: { value: 'Drink 8 glasses daily' }
    });
    fireEvent.click(screen.getByTestId('habit-save-button'));

    expect(onSave).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Drink Water',
        description: 'Drink 8 glasses daily',
        userId: 'user1',
      })
    );
  });

  it('shows validation error for empty habit name', () => {
    const onSave = vi.fn();
    const onCancel = vi.fn();

    render(<HabitForm userId="user1" onSave={onSave} onCancel={onCancel} />);
    
    fireEvent.click(screen.getByTestId('habit-save-button'));

    expect(screen.getByText('Habit name is required')).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  it('updates an existing habit', () => {
    const onSave = vi.fn();
    const onCancel = vi.fn();

    render(<HabitForm userId="user1" habit={mockHabit} onSave={onSave} onCancel={onCancel} />);
    
    fireEvent.change(screen.getByTestId('habit-name-input'), {
      target: { value: 'Updated Habit' }
    });
    fireEvent.click(screen.getByTestId('habit-save-button'));

    expect(onSave).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'habit1',
        name: 'Updated Habit',
      })
    );
  });

  it('calls onCancel when cancel button is clicked', () => {
    const onSave = vi.fn();
    const onCancel = vi.fn();

    render(<HabitForm userId="user1" onSave={onSave} onCancel={onCancel} />);
    
    fireEvent.click(screen.getByText('Cancel'));

    expect(onCancel).toHaveBeenCalled();
  });
});
