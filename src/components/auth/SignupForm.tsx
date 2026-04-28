'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';
import { User } from '@/types/auth';

export default function SignupForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const users = storage.getUsers();
    const existingUser = users.find(u => u.email === email);
    
    if (existingUser) {
      setError('User already exists');
      return;
    }
    
    const newUser: User = {
      id: crypto.randomUUID(),
      email,
      password,
      createdAt: new Date().toISOString()
    };
    
    storage.setUsers([...users, newUser]);
    storage.setSession({ userId: newUser.id, email: newUser.email });
    router.push('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Email</label>
        <input
          type="email"
          data-testid="auth-signup-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Password</label>
        <input
          type="password"
          data-testid="auth-signup-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
      </div>
      
      <button
        type="submit"
        data-testid="auth-signup-submit"
        className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
      >
        Sign Up
      </button>
    </form>
  );
}