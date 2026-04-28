import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';
import { storage } from '@/lib/storage';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('auth-flow integration', () => {
  beforeEach(() => {
    storage.setUsers([]);
    storage.setSession(null);
  });

  it('signs up a new user successfully', () => {
    render(<SignupForm />);
    
    fireEvent.change(screen.getByTestId('auth-signup-email'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByTestId('auth-signup-password'), {
      target: { value: 'password123' }
    });
    fireEvent.click(screen.getByTestId('auth-signup-submit'));

    const users = storage.getUsers();
    expect(users).toHaveLength(1);
    expect(users[0].email).toBe('test@example.com');
  });

  it('logs in an existing user', () => {
    storage.setUsers([{
      id: 'user1',
      email: 'user@example.com',
      password: 'pass123',
      createdAt: '2024-01-01'
    }]);

    render(<LoginForm />);

    fireEvent.change(screen.getByTestId('auth-login-email'), {
      target: { value: 'user@example.com' }
    });
    fireEvent.change(screen.getByTestId('auth-login-password'), {
      target: { value: 'pass123' }
    });
    fireEvent.click(screen.getByTestId('auth-login-submit'));

    expect(storage.getSession()).not.toBeNull();
  });

  it('shows error for invalid login credentials', () => {
    render(<LoginForm />);

    fireEvent.change(screen.getByTestId('auth-login-email'), {
      target: { value: 'wrong@example.com' }
    });
    fireEvent.change(screen.getByTestId('auth-login-password'), {
      target: { value: 'wrongpass' }
    });
    fireEvent.click(screen.getByTestId('auth-login-submit'));

    expect(screen.getByText('Invalid email or password')).toBeInTheDocument();
  });
});
