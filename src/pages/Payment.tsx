import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Bitcoin, Landmark, MoreHorizontal, CircleCheck } from 'lucide-react';
import { formatPrice } from '../format';
import type { Cart } from '../useCart';
import { useAuth } from '../auth';
import { addOrder } from '../orderStore';

interface PaymentPageProps {
  cart: Cart;
}

const METHODS = [
  { key: 'card', label: 'Card', icon: CreditCard },
  { key: 'crypto', label: 'Crypto', icon: Bitcoin },
  { key: 'bank', label: 'Bank', icon: Landmark },
  { key: 'more', label: 'More', icon: MoreHorizontal },
];

export function PaymentPage({ cart }: PaymentPageProps) {
  const navigate = useNavigate();
  const user = useAuth();
  const [method, setMethod] = useState('card');
  const [paid, setPaid] = useState(false);
  const { subtotal, discount, taxes, total, items } = cart;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      addOrder({
        userId: user.id,
        userEmail: user.email,
        userName: user.name,
        items,
        subtotal,
        discount,
        taxes,
        total,
        method,
      });
    }
    setPaid(true);
    cart.clear();
  };

  if (items.length === 0 && !paid) {
    navigate('/shop');
    return null;
  }

  if (paid) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center sm:px-6">
        <CircleCheck className="h-16 w-16 text-emerald-500" aria-hidden />
        <h1 className="mt-4 font-display text-2xl font-semibold text-ink-900">Payment successful</h1>
        <p className="mt-2 text-ink-500">
          Thanks for shopping with Thala. Your order is on its way.
        </p>
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => navigate('/shop')}
            className="rounded-full bg-ink-900 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-ink-800"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => navigate('/account')}
            className="rounded-full border border-ink-200 px-6 py-2.5 text-sm font-medium text-ink-700 transition hover:border-ink-400"
          >
            View Order
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="grid gap-10 md:grid-cols-[1fr_360px]">
        <form onSubmit={handlePay} className="rounded-2xl border border-ink-100 bg-white p-6 shadow-card">
          <p className="text-xs uppercase tracking-wide text-ink-400">Checkout</p>

          <div className="mt-4">
            <h3 className="font-display text-lg font-semibold text-ink-900">Contact Details</h3>
            <label htmlFor="email" className="mt-3 block text-xs font-medium text-ink-500">Email ID</label>
            <input
              id="email"
              type="email"
              required
              placeholder="you@example.com"
              className="mt-1 h-10 w-full rounded-lg border border-ink-200 bg-sand-50 px-3 text-sm focus:border-ink-900 focus:outline-none"
            />
          </div>

          <h3 className="mt-6 font-display text-lg font-semibold text-ink-900">Payment</h3>
          <div className="mt-3 rounded-xl border border-ink-100 p-4">
            <div className="flex flex-wrap justify-center gap-3">
              {METHODS.map(({ key, label, icon: Icon }) => (
                <button
                  type="button"
                  key={key}
                  onClick={() => setMethod(key)}
                  className={[
                    'flex w-20 flex-col items-center gap-1 rounded-lg border px-3 py-3 text-xs font-medium transition',
                    method === key
                      ? 'border-ink-900 bg-ink-900 text-white'
                      : 'border-ink-200 text-ink-600 hover:border-ink-400',
                  ].join(' ')}
                >
                  <Icon className="h-5 w-5" aria-hidden />
                  {label}
                </button>
              ))}
            </div>

            {method === 'card' && (
              <div className="mt-4">
                <label htmlFor="card-num" className="block text-xs font-medium text-ink-500">Card Number</label>
                <input
                  id="card-num"
                  required
                  placeholder="1234 5678 9012 3456"
                  className="mt-1 h-10 w-full rounded-lg border border-ink-200 bg-sand-50 px-3 text-sm focus:border-ink-900 focus:outline-none"
                />
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div>
                    <label className="block text-xs font-medium text-ink-500">Expiry</label>
                    <input placeholder="MM / YY" className="mt-1 h-10 w-full rounded-lg border border-ink-200 bg-sand-50 px-3 text-sm focus:border-ink-900 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-ink-500">CVC</label>
                    <input placeholder="***" className="mt-1 h-10 w-full rounded-lg border border-ink-200 bg-sand-50 px-3 text-sm focus:border-ink-900 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-ink-500">Country</label>
                    <input placeholder="India" className="mt-1 h-10 w-full rounded-lg border border-ink-200 bg-sand-50 px-3 text-sm focus:border-ink-900 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-ink-500">ZIP</label>
                    <input placeholder="xxxx" className="mt-1 h-10 w-full rounded-lg border border-ink-200 bg-sand-50 px-3 text-sm focus:border-ink-900 focus:outline-none" />
                  </div>
                </div>
              </div>
            )}

            {method === 'crypto' && (
              <div className="mt-4">
                <label htmlFor="wallet" className="block text-xs font-medium text-ink-500">Wallet Address</label>
                <input
                  id="wallet"
                  required
                  placeholder="0x..."
                  className="mt-1 h-10 w-full rounded-lg border border-ink-200 bg-sand-50 px-3 text-sm focus:border-ink-900 focus:outline-none"
                />
                <p className="mt-2 text-xs text-ink-400">We'll send a payment request to this address.</p>
              </div>
            )}

            {method === 'bank' && (
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="acc" className="block text-xs font-medium text-ink-500">Account Number</label>
                  <input
                    id="acc"
                    required
                    placeholder="000123456789"
                    className="mt-1 h-10 w-full rounded-lg border border-ink-200 bg-sand-50 px-3 text-sm focus:border-ink-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="ifsc" className="block text-xs font-medium text-ink-500">IFSC Code</label>
                  <input
                    id="ifsc"
                    required
                    placeholder="ABCD0123456"
                    className="mt-1 h-10 w-full rounded-lg border border-ink-200 bg-sand-50 px-3 text-sm focus:border-ink-900 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {method === 'more' && (
              <div className="mt-4">
                <label htmlFor="alt" className="block text-xs font-medium text-ink-500">
                  UPI ID or preferred contact
                </label>
                <input
                  id="alt"
                  required
                  placeholder="yourname@upi"
                  className="mt-1 h-10 w-full rounded-lg border border-ink-200 bg-sand-50 px-3 text-sm focus:border-ink-900 focus:outline-none"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-brand-500 py-3 text-sm font-semibold text-ink-900 transition hover:bg-brand-400 active:scale-[0.99]"
          >
            Pay Now {formatPrice(total)}
          </button>
        </form>

        <aside className="h-fit rounded-2xl border border-ink-100 bg-white p-5 shadow-card">
          <h1 className="font-display text-lg font-semibold text-ink-900">Order Summary</h1>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between text-ink-600">
              <dt>Sub Total</dt>
              <dd className="font-medium text-ink-900">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-ink-600">
              <dt>Taxes</dt>
              <dd className="font-medium text-ink-900">{formatPrice(taxes)}</dd>
            </div>
            <div className="flex justify-between text-ink-600">
              <dt>Discount</dt>
              <dd className="font-medium text-ink-900">-{formatPrice(discount)}</dd>
            </div>
            <div className="flex justify-between border-t border-ink-100 pt-2 text-base">
              <dt className="font-semibold text-ink-900">Total</dt>
              <dd className="font-semibold text-ink-900">{formatPrice(total)}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </main>
  );
}
