import { Link } from 'react-router-dom';
import { CATEGORIES } from '../products';
import { useProducts } from '../productStore';
import type { Category } from '../types';

export function Brands() {
  const PRODUCTS = useProducts();
  const FALLBACK_IMAGE =
    'https://images.pexels.com/photos/1078958/pexels-photo-1078958.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
  const lines: Category[] = ['Footwear', 'Apparel', 'Accessories', 'Equipment'];
  const brandTiles: { name: Category; image: string }[] = lines.map((name) => ({
    name,
    image: PRODUCTS.find((p) => p.category === name)?.image ?? FALLBACK_IMAGE,
  }));

  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
        Shop by Brand Line
      </h1>
      <p className="mt-3 max-w-xl text-ink-600">
        Every product on Thala For A Reason falls under one of these lines.
        Tap a line to jump straight to it in the shop.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {brandTiles.map((b) => (
          <Link
            key={b.name}
            to={`/shop?category=${b.name}`}
            state={{ category: b.name }}
            className="group relative flex h-40 items-end overflow-hidden rounded-2xl shadow-card"
          >
            <img
              src={b.image}
              alt={b.name}
              className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 to-transparent" />
            <div className="relative flex w-full items-center justify-between px-5 py-4">
              <span className="font-display text-xl font-semibold text-white">{b.name}</span>
              <span className="text-sm text-white/80">
                {PRODUCTS.filter((p) => p.category === b.name).length} items
              </span>
            </div>
          </Link>
        ))}
      </div>

      <p className="mt-8 text-sm text-ink-400">
        {CATEGORIES.length - 1} lines · {PRODUCTS.length} products total
      </p>
    </main>
  );
}
