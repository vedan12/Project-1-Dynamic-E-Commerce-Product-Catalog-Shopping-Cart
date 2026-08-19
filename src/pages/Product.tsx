import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Star, ShoppingBag, Minus, Plus } from 'lucide-react';
import { useProducts } from '../productStore';
import { formatPrice } from '../format';
import type { Cart } from '../useCart';

interface ProductPageProps {
  cart: Cart;
}

export function ProductPage({ cart }: ProductPageProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const PRODUCTS = useProducts();

  const product = PRODUCTS.find((p) => p.id === id);
  const related = PRODUCTS.filter((p) => p.id !== id).slice(0, 8);

  if (!product) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
        <p className="font-display text-xl text-ink-900">Product not found.</p>
        <Link to="/shop" className="mt-4 inline-block text-brand-600 hover:underline">
          Back to shop
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) cart.add(product);
    navigate('/cart');
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <p className="mb-6 text-sm text-ink-500">
        <Link to="/" className="hover:text-brand-600">Home</Link> {' > '}
        <Link to="/shop" className="hover:text-brand-600">Thala For A Reason</Link> {' > '}
        <span className="text-ink-700">{product.name}</span>
      </p>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="overflow-hidden rounded-3xl bg-sand-100">
          <img src={product.image} alt={product.name} className="aspect-square w-full object-cover" />
        </div>

        <div>
          <h1 className="font-display text-3xl font-semibold text-ink-900">{product.name}</h1>
          <div className="mt-2 flex items-center gap-1 text-sm text-ink-600">
            <Star className="h-4 w-4 fill-warning-400 text-warning-400" aria-hidden />
            <span className="font-medium">{product.rating.toFixed(1)}</span>
          </div>
          <p className="mt-4 text-ink-500">{product.description}</p>

          <div className="mt-6 flex items-baseline gap-4">
            <span className="text-3xl font-bold text-ink-900">{formatPrice(product.price)}</span>
            <span className="font-semibold text-emerald-600">Save 12%</span>
          </div>
          <p className="text-xs text-ink-400">Inclusive of all taxes</p>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center rounded-full border border-ink-200">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="flex h-10 w-10 items-center justify-center rounded-full text-ink-600 transition hover:bg-ink-100"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" aria-hidden />
              </button>
              <span className="w-8 text-center text-sm font-medium text-ink-900">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-ink-600 transition hover:bg-ink-100"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" aria-hidden />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-ink-900 transition hover:bg-brand-400 active:scale-[0.98]"
            >
              <ShoppingBag className="h-4 w-4" aria-hidden />
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="mb-4 font-display text-xl font-semibold text-ink-900">You may also like</h2>
        <div className="no-scrollbar flex gap-4 overflow-x-auto pb-2">
          {related.map((p) => (
            <Link
              key={p.id}
              to={`/product/${p.id}`}
              className="w-32 shrink-0 overflow-hidden rounded-xl border border-ink-100 bg-white shadow-card transition hover:-translate-y-1"
            >
              <img src={p.image} alt={p.name} className="aspect-square w-full object-cover" />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
