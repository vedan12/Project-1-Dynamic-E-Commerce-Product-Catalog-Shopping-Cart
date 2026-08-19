import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { signup, AuthError } from '../auth';

export function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    try {
      signup(name, email, password);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err instanceof AuthError ? err.message : 'Something went wrong. Try again.');
    }
  };

  return (
    <main className="mx-auto flex max-w-md flex-col px-4 py-16 sm:px-6">
      <div className="flex items-center gap-2">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-900 font-display text-lg font-bold text-brand-500">
          7
        </span>
        <h1 className="font-display text-2xl font-semibold text-ink-900">Create account</h1>
      </div>
      <p className="mt-2 text-sm text-ink-500">
        Sign up to shop, track orders, and check out faster.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4 rounded-2xl border border-ink-100 bg-white p-6 shadow-card">
        {error && (
          <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</div>
        )}

        <div>
          <label htmlFor="name" className="block text-xs font-medium text-ink-500">Full name</label>
          <input
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Doe"
            className="mt-1 h-10 w-full rounded-lg border border-ink-200 bg-sand-50 px-3 text-sm focus:border-ink-900 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="signup-email" className="block text-xs font-medium text-ink-500">Email</label>
          <input
            id="signup-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="mt-1 h-10 w-full rounded-lg border border-ink-200 bg-sand-50 px-3 text-sm focus:border-ink-900 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="signup-password" className="block text-xs font-medium text-ink-500">Password</label>
          <input
            id="signup-password"
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            className="mt-1 h-10 w-full rounded-lg border border-ink-200 bg-sand-50 px-3 text-sm focus:border-ink-900 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="confirm-password" className="block text-xs font-medium text-ink-500">Confirm password</label>
          <input
            id="confirm-password"
            type="password"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Re-enter password"
            className="mt-1 h-10 w-full rounded-lg border border-ink-200 bg-sand-50 px-3 text-sm focus:border-ink-900 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-500 py-2.5 text-sm font-semibold text-ink-900 transition hover:bg-brand-400 active:scale-[0.99]"
        >
          <UserPlus className="h-4 w-4" aria-hidden />
          Create account
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-ink-500">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-ink-900 underline underline-offset-2">
          Log in
        </Link>
      </p>
    </main>
  );
}
