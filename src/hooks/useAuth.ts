'use client';

import { useState, useEffect } from 'react';
import { storage } from '@/lib/storage';
import { Session } from '@/types/auth';

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    setSession(storage.getSession());
  }, []);

  return { session };
}

