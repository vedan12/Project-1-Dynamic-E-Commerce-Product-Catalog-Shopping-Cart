import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ChevronLeft } from 'lucide-react';
import { formatPrice } from '../format';
import type { Cart as CartType } from '../useCart';

interface CartPageProps {
  cart: CartType;
}

export function CartPage({ cart }: CartPageProps) {
  const navigate = useNavigate();
  const {
    items,
    increment,
    decrement,
    remove,
    subtotal,
    couponInput,
    setCouponInput,
    appliedCoupon,
    couponError,
    applyCoupon,
    discount,
    taxes,
    total,
  } = cart;

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center sm:px-6">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-ink-100">
          <ShoppingBag className="h-7 w-7 text-ink-400" aria-hidden />
        </div>
        <p className="font-display text-xl font-medium text-ink-900">Your cart is empty</p>
        <p className="mt-1 text-sm text-ink-500">Add a few things you love — they'll show up here.</p>
        <Link
          to="/shop"
          className="mt-6 rounded-full bg-ink-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-ink-800"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="grid gap-10 md:grid-cols-[1fr_360px]">
        <div>
          <h1 className="font-display text-3xl font-semibold text-ink-900">Shopping Cart</h1>

          <div className="mt-6 overflow-hidden rounded-2xl border border-ink-100">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-sand-100 text-left text-ink-600">
                  <th className="px-4 py-3 font-medium">Product</th>
                  <th className="px-4 py-3 font-medium">Quantity</th>
                  <th className="px-4 py-3 font-medium">Price</th>
                  <th className="px-4 py-3 font-medium">Remove</th>
                </tr>
              </thead>
              <tbody>
                {items.map(({ product, quantity }) => (
                  <tr key={product.id} className="border-t border-ink-100">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-14 w-14 rounded-lg object-cover"
                        />
                        <span className="font-medium text-ink-900">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center rounded-full border border-ink-200 w-fit">
                        <button
                          onClick={() => decrement(product.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-full text-ink-600 hover:bg-ink-100"
                          aria-label={`Decrease ${product.name} quantity`}
                        >
                          <Minus className="h-3.5 w-3.5" aria-hidden />
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-ink-900">{quantity}</span>
                        <button
                          onClick={() => increment(product.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-full text-ink-600 hover:bg-ink-100"
                          aria-label={`Increase ${product.name} quantity`}
                        >
                          <Plus className="h-3.5 w-3.5" aria-hidden />
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-semibold text-ink-900">
                      {formatPrice(product.price * quantity)}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => remove(product.id)}
                        className="text-ink-400 transition hover:text-error-500"
                        aria-label={`Remove ${product.name}`}
                      >
                        <Trash2 className="h-4 w-4" aria-hidden />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={() => navigate('/shop')}
            className="mt-6 flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-ink-600 transition hover:bg-ink-100 hover:text-ink-900"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
            Continue Shopping
          </button>
        </div>

        <aside className="h-fit rounded-2xl border border-ink-100 bg-white p-5 shadow-card">
          <h3 className="font-display text-lg font-semibold text-ink-900">Enter Coupon Code</h3>
          <div className="mt-3 flex gap-2">
            <input
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              placeholder="COUPON CODE"
              className="h-10 flex-1 rounded-lg border border-ink-200 bg-sand-50 px-3 text-sm focus:border-ink-900 focus:outline-none"
            />
            <button
              onClick={applyCoupon}
              className="rounded-lg bg-ink-900 px-4 text-sm font-medium text-white transition hover:bg-ink-800"
            >
              Apply
            </button>
          </div>
          {appliedCoupon && (
            <p className="mt-2 text-xs font-medium text-emerald-600">
              "{appliedCoupon}" applied
            </p>
          )}
          {couponError && <p className="mt-2 text-xs font-medium text-error-500">{couponError}</p>}
          <p className="mt-1 text-xs text-ink-400">Try THALA10 or DHONI7</p>

          <dl className="mt-5 space-y-2 border-t border-ink-100 pt-4 text-sm">
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

          <button
            onClick={() => navigate('/payment')}
            className="mt-5 w-full rounded-full bg-brand-500 py-3 text-sm font-semibold text-ink-900 transition hover:bg-brand-400 active:scale-[0.99]"
          >
            Pay Now {formatPrice(total)}
          </button>
        </aside>
      </div>
    </main>
  );
}
