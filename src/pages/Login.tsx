import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { login, AuthError } from '../auth';

export function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const user = login(email, password);
      navigate(user.role === 'admin' && redirect === '/' ? '/admin' : redirect, { replace: true });
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
        <h1 className="font-display text-2xl font-semibold text-ink-900">Log in</h1>
      </div>
      <p className="mt-2 text-sm text-ink-500">
        Welcome back to Thala For A Reason.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4 rounded-2xl border border-ink-100 bg-white p-6 shadow-card">
        {error && (
          <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</div>
        )}

        <div>
          <label htmlFor="email" className="block text-xs font-medium text-ink-500">Email</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="mt-1 h-10 w-full rounded-lg border border-ink-200 bg-sand-50 px-3 text-sm focus:border-ink-900 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-xs font-medium text-ink-500">Password</label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="mt-1 h-10 w-full rounded-lg border border-ink-200 bg-sand-50 px-3 text-sm focus:border-ink-900 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-ink-900 py-2.5 text-sm font-semibold text-white transition hover:bg-ink-800 active:scale-[0.99]"
        >
          <LogIn className="h-4 w-4" aria-hidden />
          Log in
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-ink-500">
        New here?{' '}
        <Link to="/signup" className="font-medium text-ink-900 underline underline-offset-2">
          Create an account
        </Link>
      </p>

      <div className="mt-6 rounded-xl border border-dashed border-ink-200 bg-sand-50 p-4 text-xs text-ink-500">
        <p className="font-medium text-ink-700">Demo admin login</p>
        <p className="mt-1">admin@thala.com / admin123</p>
      </div>
    </main>
  );
}
