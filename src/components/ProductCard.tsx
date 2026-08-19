import { Star, Plus, Check } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { formatPrice } from '../format';

interface ProductCardProps {
  product: Product;
  inCart: number;
  onAdd: (product: Product) => void;
}

export function ProductCard({ product, inCart, onAdd }: ProductCardProps) {
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    onAdd(product);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1100);
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <Link to={`/product/${product.id}`} className="relative block aspect-square overflow-hidden bg-sand-100">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-ink-700 backdrop-blur">
          {product.category}
        </span>
        {inCart > 0 && (
          <span className="absolute right-3 top-3 flex h-7 min-w-[1.75rem] items-center justify-center rounded-full bg-ink-900 px-1.5 text-xs font-semibold text-white shadow">
            {inCart} in cart
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 flex items-center gap-1 text-xs text-ink-500">
          <Star className="h-3.5 w-3.5 fill-warning-400 text-warning-400" aria-hidden />
          <span className="font-medium text-ink-700">{product.rating.toFixed(1)}</span>
        </div>

        <Link to={`/product/${product.id}`}>
          <h3 className="font-display text-lg font-medium leading-snug text-ink-900 hover:text-brand-600">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-ink-500">
          {product.blurb}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3 pt-1">
          <span className="text-xl font-semibold text-ink-900">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={handleAdd}
            className={[
              'flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition active:scale-[0.97]',
              justAdded
                ? 'bg-brand-500 text-ink-900'
                : 'bg-ink-900 text-white hover:bg-ink-800',
            ].join(' ')}
            aria-label={`Add ${product.name} to cart`}
          >
            {justAdded ? (
              <>
                <Check className="h-4 w-4" aria-hidden />
                Added
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" aria-hidden />
                Add
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
