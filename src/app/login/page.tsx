'use client';

import LoginForm from '@/components/auth/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <LoginForm />
      <p className="text-center mt-4">
        Don't have an account?{' '}
        <Link href="/signup" className="text-purple-600 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}