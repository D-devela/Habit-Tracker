'use client';

import SignupForm from '@/components/auth/SignupForm';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <SignupForm />
      <p className="text-center mt-4">
        Already have an account?{' '}
        <Link href="/login" className="text-purple-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}