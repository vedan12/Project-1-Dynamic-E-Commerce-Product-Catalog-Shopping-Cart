import { useMemo } from 'react';
import { useAuth, logout } from '../auth';
import { useOrders } from '../orderStore';
import { formatPrice } from '../format';
import { useNavigate } from 'react-router-dom';
import { LogOut, PackageCheck } from 'lucide-react';

export function Account() {
  const user = useAuth();
  const orders = useOrders();
  const navigate = useNavigate();

  const myOrders = useMemo(
    () => orders.filter((o) => o.userId === user?.id),
    [orders, user],
  );

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink-900">My Account</h1>
          <p className="mt-1 text-sm text-ink-500">{user.name} · {user.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-full border border-ink-200 px-4 py-2 text-sm font-medium text-ink-700 transition hover:border-ink-400"
        >
          <LogOut className="h-4 w-4" aria-hidden />
          Log out
        </button>
      </div>

      <h2 className="mt-10 font-display text-lg font-semibold text-ink-900">Order History</h2>

      {myOrders.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-dashed border-ink-200 bg-sand-50 p-10 text-center text-sm text-ink-500">
          No orders yet. Head to the shop and grab something.
        </div>
      ) : (
        <div className="mt-4 space-y-4">
          {myOrders.map((order) => (
            <div key={order.id} className="rounded-2xl border border-ink-100 bg-white p-5 shadow-card">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-sm font-medium text-ink-900">
                  <PackageCheck className="h-4 w-4 text-emerald-500" aria-hidden />
                  Order #{order.id.slice(-6).toUpperCase()}
                </div>
                <span className="text-xs text-ink-400">
                  {new Date(order.createdAt).toLocaleString()}
                </span>
              </div>
              <ul className="mt-3 space-y-1 text-sm text-ink-600">
                {order.items.map((item) => (
                  <li key={item.productId} className="flex justify-between">
                    <span>{item.name} × {item.quantity}</span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex justify-between border-t border-ink-100 pt-3 text-sm font-semibold text-ink-900">
                <span>Total ({order.method})</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
