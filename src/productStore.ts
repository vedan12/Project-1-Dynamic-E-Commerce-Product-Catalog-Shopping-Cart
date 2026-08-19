import { useSyncExternalStore } from 'react';
import type { Product, Category } from './types';
import { SEED_PRODUCTS } from './products';

const PRODUCTS_KEY = 'thala.products.v1';

function loadProducts(): Product[] {
  try {
    const raw = localStorage.getItem(PRODUCTS_KEY);
    if (!raw) {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(SEED_PRODUCTS));
      return SEED_PRODUCTS;
    }
    const parsed = JSON.parse(raw) as Product[];
    if (!Array.isArray(parsed) || parsed.length === 0) return SEED_PRODUCTS;
    return parsed;
  } catch {
    return SEED_PRODUCTS;
  }
}

let products: Product[] = loadProducts();
const listeners = new Set<() => void>();

function persist() {
  try {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  } catch {
    /* storage unavailable — ignore */
  }
  for (const l of listeners) l();
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getSnapshot() {
  return products;
}

export function useProducts(): Product[] {
  return useSyncExternalStore(subscribe, getSnapshot);
}

export function getProducts(): Product[] {
  return products;
}

export type NewProduct = Omit<Product, 'id'>;

export function addProduct(input: NewProduct): Product {
  const id = `p-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const product: Product = { ...input, id };
  products = [product, ...products];
  persist();
  return product;
}

export function updateProduct(id: string, patch: Partial<NewProduct>): void {
  products = products.map((p) => (p.id === id ? { ...p, ...patch } : p));
  persist();
}

export function deleteProduct(id: string): void {
  products = products.filter((p) => p.id !== id);
  persist();
}

export function resetProducts(): void {
  products = SEED_PRODUCTS;
  persist();
}

export const ADMIN_CATEGORIES: Category[] = ['Footwear', 'Apparel', 'Accessories', 'Equipment'];
