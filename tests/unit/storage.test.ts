import { describe, it, expect, beforeEach, vi } from 'vitest';
import { storage } from '@/lib/storage';

// Mock types for test
interface MockUser {
  id: string;
  email: string;
  password?: string;
  createdAt: string;
}

interface MockSession {
  userId: string;
  expires?: string;
}

interface MockHabit {
  id: string;
  name: string;
  createdAt: string;
  completions: string[];
  userId?: string;
  description?: string

  describe('getUsers/setUsers', () => {
    it('getUsers returns empty array when no data', () => {
      expect(storage.getUsers()).toEqual([]);
    });

    it('setUsers/getUsers roundtrip', () => {
      const users: User[] = [
        { id: '1', email: 'test@example.com', createdAt: new Date().toISOString() }
      ];
      
      storage.setUsers(users);
      expect(storage.getUsers()).toEqual(users);
    });
  });

  describe('getSession/setSession', () => {
    it('getSession returns null when no data', () => {
      expect(storage.getSession()).toBeNull();
    });

    it('setSession/getSession roundtrip', () => {
      const session: Session = {
        userId: '1',
        expires: new Date(Date.now() + 1000000).toISOString()
      };
      
      storage.setSession(session);
      expect(storage.getSession()).toEqual(session);
    });

    it('setSession(null) removes session', () => {
      storage.setSession(null);
      expect(localStorage.getItem('habit-tracker-session')).toBeNull();
    });
  });

  describe('getHabits/setHabits', () => {
    it('getHabits returns empty array when no data', () => {
      expect(storage.getHabits()).toEqual([]);
    });

    it('setHabits/getHabits roundtrip', () => {
      const habits: Habit[] = [{
        id: '1',
        name: 'Test Habit',
        createdAt: new Date().toISOString(),
        completions: []
      }];
      
      storage.setHabits(habits);
      expect(storage.getHabits()).toEqual(habits);
    });
  });
});
