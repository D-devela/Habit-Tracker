'use client';

import React from 'react';
import { Habit } from '@/types/habit';
import HabitCard from './HabitCard';

interface HabitListProps {
  habits: Habit[];
  onUpdate: (habit: Habit) => void;
  onDelete: (id: string) => void;
}

export default function HabitList({ habits, onUpdate, onDelete }: HabitListProps) {
  if (habits.length === 0) {
    return (
      <div data-testid="empty-state" className="text-center py-12">
        <p className="text-gray-500 text-lg">No habits yet. Create your first habit!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {habits.map(habit => (
        <HabitCard
          key={habit.id}
          habit={habit}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}