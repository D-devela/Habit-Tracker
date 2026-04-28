'use client';

import React, { useState } from 'react';
import { Habit } from '@/types/habit';
import { getHabitSlug } from '@/lib/slug';
import { calculateCurrentStreak } from '@/lib/streaks';
import { toggleHabitCompletion } from '@/lib/habits';
import HabitForm from './HabitForm';
import DeleteModal from './DeleteModal';

interface HabitCardProps {
  habit: Habit;
  onUpdate: (habit: Habit) => void;
  onDelete: (id: string) => void;
}

export default function HabitCard({ habit, onUpdate, onDelete }: HabitCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const slug = getHabitSlug(habit.name);
  const today = new Date().toISOString().split('T')[0];
  const isCompleted = habit.completions.includes(today);
  const streak = calculateCurrentStreak(habit.completions);

  const handleToggleComplete = () => {
    const updated = toggleHabitCompletion(habit, today);
    onUpdate(updated);
  };

  if (isEditing) {
    return (
      <HabitForm
        userId={habit.userId}
        habit={habit}
        onSave={(updated) => {
          onUpdate(updated);
          setIsEditing(false);
        }}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <>
      <div
        data-testid={`habit-card-${slug}`}
        className="bg-white rounded-lg shadow-md p-4 mb-4"
      >
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-semibold">{habit.name}</h3>
            {habit.description && (
              <p className="text-gray-600 text-sm mt-1">{habit.description}</p>
            )}
          </div>
          <div className="flex gap-2">
            <button
              data-testid={`habit-edit-${slug}`}
              onClick={() => setIsEditing(true)}
              className="text-blue-600 hover:text-blue-800"
            >
              ✏️ Edit
            </button>
            <button
              data-testid={`habit-delete-${slug}`}
              onClick={() => setShowDeleteConfirm(true)}
              className="text-red-600 hover:text-red-800"
            >
              🗑️ Delete
            </button>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm text-gray-500">Current Streak: </span>
            <span
              data-testid={`habit-streak-${slug}`}
              className="text-xl font-bold text-purple-600"
            >
              {streak}
            </span>
            <span className="text-sm text-gray-500"> days</span>
          </div>
          
          <button
            data-testid={`habit-complete-${slug}`}
            onClick={handleToggleComplete}
            className={`px-4 py-2 rounded-md transition ${
              isCompleted
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {isCompleted ? '✅ Completed' : '⬜ Mark Complete'}
          </button>
        </div>
      </div>
      
      {showDeleteConfirm && (
        <DeleteModal
          onConfirm={() => {
            onDelete(habit.id);
            setShowDeleteConfirm(false);
          }}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </>
  );
}