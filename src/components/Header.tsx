import { useState } from 'react';
import { Search, ShoppingBag, User, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, logout } from '../auth';

interface HeaderProps {
  totalItems: number;
  search: string;
  onSearch: (value: string) => void;
}

export function Header({ totalItems, search, onSearch }: HeaderProps) {
  const navigate = useNavigate();
  const user = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-30 border-b border-ink-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-900 font-display text-lg font-bold text-brand-500">
            7
          </span>
          <span className="hidden font-display text-xl font-bold tracking-tight text-ink-900 sm:block">
            Thala<span className="text-brand-500">.</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 text-sm font-medium text-ink-700 md:flex">
          <Link to="/" className="transition hover:text-brand-600">Home</Link>
          <Link to="/shop" className="transition hover:text-brand-600">Shop</Link>
          <Link to="/about" className="transition hover:text-brand-600">About</Link>
          <Link to="/brands" className="transition hover:text-brand-600">Brands</Link>
          <Link to="/contact" className="transition hover:text-brand-600">Contact</Link>
        </nav>

        <div className="relative ml-auto flex-1 sm:max-w-xs">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400"
            aria-hidden
          />
          <input
            type="search"
            value={search}
            onChange={(e) => {
              onSearch(e.target.value);
              navigate('/shop');
            }}
            placeholder="Search…"
            aria-label="Search products"
            className="h-10 w-full rounded-full border border-ink-200 bg-sand-50 pl-10 pr-4 text-sm text-ink-900 placeholder:text-ink-400 transition focus:border-ink-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-ink-900/10"
          />
        </div>

        <Link
          to="/cart"
          className="relative flex h-10 items-center gap-2 rounded-full bg-ink-900 px-4 text-sm font-medium text-white transition hover:bg-ink-800 active:scale-[0.98]"
          aria-label={`Open cart, ${totalItems} items`}
        >
          <ShoppingBag className="h-4 w-4" aria-hidden />
          <span className="hidden sm:inline">Cart</span>
          {totalItems > 0 && (
            <span
              key={totalItems}
              className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] animate-pop items-center justify-center rounded-full bg-brand-500 px-1 text-xs font-bold text-ink-900 ring-2 ring-white"
            >
              {totalItems}
            </span>
          )}
        </Link>

        {user ? (
          <div className="relative">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-10 items-center gap-1.5 rounded-full border border-ink-200 px-3 text-sm font-medium text-ink-700 transition hover:border-ink-400"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
            >
              <User className="h-4 w-4" aria-hidden />
              <span className="hidden max-w-[8rem] truncate sm:inline">{user.name}</span>
              <ChevronDown className="h-3.5 w-3.5" aria-hidden />
            </button>

            {menuOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setMenuOpen(false)} />
                <div className="absolute right-0 z-40 mt-2 w-48 rounded-xl border border-ink-100 bg-white p-1.5 shadow-card">
                  {user.role === 'admin' ? (
                    <Link
                      to="/admin"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-ink-700 transition hover:bg-sand-50"
                    >
                      <LayoutDashboard className="h-4 w-4" aria-hidden />
                      Admin Dashboard
                    </Link>
                  ) : (
                    <Link
                      to="/account"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-ink-700 transition hover:bg-sand-50"
                    >
                      <User className="h-4 w-4" aria-hidden />
                      My Account
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-600 transition hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" aria-hidden />
                    Log out
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="flex h-10 items-center gap-2 rounded-full border border-ink-200 px-4 text-sm font-medium text-ink-700 transition hover:border-ink-400"
          >
            <User className="h-4 w-4" aria-hidden />
            <span className="hidden sm:inline">Log in</span>
          </Link>
        )}
      </div>
    </header>
  );
}
