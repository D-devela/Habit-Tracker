'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    storage.setSession(null);
    router.push('/login');
  };

  return (
    <button
      onClick={handleLogout}
      data-testid="auth-logout-button"
      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
    >
      Logout
    </button>
  );
}