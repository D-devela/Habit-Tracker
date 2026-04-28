'use client';

import { useState, useEffect } from 'react';
import { storage } from '@/lib/storage';
import { Habit } from '@/types/habit';

export function useHabits(userId: string) {
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    const allHabits = storage.getHabits();
    setHabits(allHabits.filter(h => h.userId === userId));
  }, [userId]);

  return { habits };
}

