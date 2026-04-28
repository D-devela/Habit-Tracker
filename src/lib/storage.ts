import { User, Session } from '@/types/auth';
import { Habit } from '@/types/habit';

const STORAGE_KEYS = {
  USERS: 'habit-tracker-users',
  SESSION: 'habit-tracker-session',
  HABITS: 'habit-tracker-habits'
};

function isClient(): boolean {
  return typeof window !== 'undefined';
}

export const storage = {
  // Users
  getUsers(): User[] {
    if (!isClient()) return [];
    const data = localStorage.getItem(STORAGE_KEYS.USERS);
    return data ? JSON.parse(data) : [];
  },
  
  setUsers(users: User[]): void {
    if (!isClient()) return;
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  },
  
  // Session
  getSession(): Session | null {
    if (!isClient()) return null;
    const data = localStorage.getItem(STORAGE_KEYS.SESSION);
    return data ? JSON.parse(data) : null;
  },
  
  setSession(session: Session | null): void {
    if (!isClient()) return;
    if (session) {
      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
    } else {
      localStorage.removeItem(STORAGE_KEYS.SESSION);
    }
  },
  
  // Habits
  getHabits(): Habit[] {
    if (!isClient()) return [];
    const data = localStorage.getItem(STORAGE_KEYS.HABITS);
    return data ? JSON.parse(data) : [];
  },
  
  setHabits(habits: Habit[]): void {
    if (!isClient()) return;
    localStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(habits));
  }
};
