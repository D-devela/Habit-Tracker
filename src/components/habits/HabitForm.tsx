'use client';

import React, { useState } from 'react';
import { Habit } from '@/types/habit';
import { validateHabitName } from '@/lib/validators';

interface HabitFormProps {
  userId: string;
  habit?: Habit;
  onSave: (habit: Habit) => void;
  onCancel: () => void;
}

export default function HabitForm({ userId, habit, onSave, onCancel }: HabitFormProps) {
  const [name, setName] = useState(habit?.name || '');
  const [description, setDescription] = useState(habit?.description || '');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateHabitName(name);
    if (!validation.valid) {
      setError(validation.error!);
      return;
    }
    
    if (habit) {
      onSave({
        ...habit,
        name: validation.value,
        description
      });
    } else {
      const newHabit: Habit = {
        id: crypto.randomUUID(),
        userId,
        name: validation.value,
        description,
        frequency: 'daily',
        createdAt: new Date().toISOString(),
        completions: []
      };
      onSave(newHabit);
    }
  };

  return (
    <form
      data-testid="habit-form"
      onSubmit={handleSubmit}
      className="mb-6 p-4 bg-white rounded-lg shadow-md"
    >
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Habit Name *</label>
        <input
          data-testid="habit-name-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          data-testid="habit-description-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          rows={3}
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Frequency</label>
        <select
          data-testid="habit-frequency-select"
          value="daily"
          className="w-full px-3 py-2 border rounded-md bg-gray-50"
          disabled
        >
          <option value="daily">Daily</option>
        </select>
      </div>
      
      <div className="flex gap-2">
        <button
          type="submit"
          data-testid="habit-save-button"
          className="flex-1 bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
        >
          {habit ? 'Update' : 'Create'} Habit
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}