import { useMemo, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CategoryBar } from '../components/CategoryBar';
import { ProductCard } from '../components/ProductCard';
import { EmptyState } from '../components/EmptyState';
import { CATEGORIES } from '../products';
import { useProducts } from '../productStore';
import type { Category } from '../types';
import type { Cart } from '../useCart';

interface ShopProps {
  cart: Cart;
  search: string;
  setSearch: (v: string) => void;
}

export function Shop({ cart, search, setSearch }: ShopProps) {
  const location = useLocation();
  const PRODUCTS = useProducts();
  const [activeCategory, setActiveCategory] = useState<'All' | Category>('All');

  useEffect(() => {
    const stateCategory = (location.state as { category?: Category } | null)?.category;
    if (stateCategory) setActiveCategory(stateCategory);
  }, [location.state]);

  const counts = useMemo(() => {
    const base: Record<string, number> = { All: PRODUCTS.length };
    for (const c of CATEGORIES) {
      if (c === 'All') continue;
      base[c] = PRODUCTS.filter((p) => p.category === c).length;
    }
    return base;
  }, [PRODUCTS]);

  const quantityById = useMemo(() => {
    const map: Record<string, number> = {};
    for (const { product, quantity } of cart.items) {
      map[product.id] = quantity;
    }
    return map;
  }, [cart.items]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      const matchesCategory =
        activeCategory === 'All' || p.category === activeCategory;
      const matchesSearch =
        q === '' ||
        p.name.toLowerCase().includes(q) ||
        p.blurb.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory, PRODUCTS]);

  const handleClearFilters = () => {
    setSearch('');
    setActiveCategory('All');
  };

  return (
    <main className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6">
      <div className="mb-8 flex flex-col gap-4">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">
            {activeCategory === 'All' ? 'All Products' : activeCategory}
          </h2>
          <p className="hidden text-sm text-ink-500 sm:block">
            {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
          </p>
        </div>
        <CategoryBar active={activeCategory} onSelect={setActiveCategory} counts={counts} />
      </div>

      {filtered.length === 0 ? (
        <EmptyState query={search || activeCategory} onClear={handleClearFilters} />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              inCart={quantityById[product.id] ?? 0}
              onAdd={cart.add}
            />
          ))}
        </div>
      )}
    </main>
  );
}
