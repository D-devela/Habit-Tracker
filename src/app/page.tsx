'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SplashScreen from '@/components/shared/SplashScreen';
import { storage } from '@/lib/storage';

export default function Home() {
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const session = storage.getSession();
      if (session) {
        router.push('/dashboard');
      } else {
        router.push('/login');
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [router]);

  if (!showSplash) return null;
  return <SplashScreen />;
}