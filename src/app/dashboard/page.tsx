'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';
import HabitList from '@/components/habits/HabitList';
import HabitForm from '@/components/habits/HabitForm';
import LogoutButton from '@/components/shared/LogoutButton';
import { Habit } from '@/types/habit';

export default function DashboardPage() {
  const router = useRouter();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [session, setSession] = useState(storage.getSession());

  useEffect(() => {
    if (!session) {
      router.push('/login');
      return;
    }
    
    const userHabits = storage.getHabits().filter(h => h.userId === session.userId);
    setHabits(userHabits);
  }, [session, router]);

  const addHabit = (habit: Habit) => {
    const allHabits = storage.getHabits();
    storage.setHabits([...allHabits, habit]);
    setHabits([...habits, habit]);
    setShowForm(false);
  };

  const updateHabit = (updatedHabit: Habit) => {
    const allHabits = storage.getHabits();
    const index = allHabits.findIndex(h => h.id === updatedHabit.id);
    allHabits[index] = updatedHabit;
    storage.setHabits(allHabits);
    setHabits(habits.map(h => h.id === updatedHabit.id ? updatedHabit : h));
  };

  const deleteHabit = (id: string) => {
    const allHabits = storage.getHabits();
    storage.setHabits(allHabits.filter(h => h.id !== id));
    setHabits(habits.filter(h => h.id !== id));
  };

  if (!session) return null;

  return (
    <div data-testid="dashboard-page" className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Habits</h1>
          <LogoutButton />
        </div>
        
        <button
          data-testid="create-habit-button"
          onClick={() => setShowForm(true)}
          className="mb-6 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
        >
          + Create Habit
        </button>
        
        {showForm && (
          <HabitForm
            userId={session.userId}
            onSave={addHabit}
            onCancel={() => setShowForm(false)}
          />
        )}
        
        <HabitList
          habits={habits}
          onUpdate={updateHabit}
          onDelete={deleteHabit}
        />
      </div>
    </div>
  );
}