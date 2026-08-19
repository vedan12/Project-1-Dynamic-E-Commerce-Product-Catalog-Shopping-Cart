import { useCallback, useEffect, useMemo, useState } from 'react';
import type { CartItem, Product } from './types';

const STORAGE_KEY = 'thala.cart.v1';
const VALID_COUPONS: Record<string, number> = {
  THALA10: 0.1,
  DHONI7: 0.07,
};

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item) =>
        item &&
        typeof item.quantity === 'number' &&
        item.product &&
        typeof item.product.id === 'string' &&
        item.quantity > 0,
    );
  } catch {
    return [];
  }
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(loadCart);
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage full or unavailable — ignore */
    }
  }, [items]);

  const add = useCallback((product: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i,
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((i) => i.product.id !== productId)
        : prev.map((i) =>
            i.product.id === productId ? { ...i, quantity } : i,
          ),
    );
  }, []);

  const increment = useCallback((productId: string) => {
    setItems((prev) =>
      prev.map((i) =>
        i.product.id === productId
          ? { ...i, quantity: i.quantity + 1 }
          : i,
      ),
    );
  }, []);

  const decrement = useCallback((productId: string) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.product.id === productId
            ? { ...i, quantity: i.quantity - 1 }
            : i,
        )
        .filter((i) => i.quantity > 0),
    );
  }, []);

  const remove = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const clear = useCallback(() => {
    setItems([]);
    setAppliedCoupon(null);
    setCouponInput('');
    setCouponError(null);
  }, []);

  const applyCoupon = useCallback(() => {
    const code = couponInput.trim().toUpperCase();
    if (!code) return;
    if (VALID_COUPONS[code]) {
      setAppliedCoupon(code);
      setCouponError(null);
    } else {
      setAppliedCoupon(null);
      setCouponError('Invalid coupon code');
    }
  }, [couponInput]);

  const { totalItems, subtotal } = useMemo(() => {
    return items.reduce(
      (acc, item) => {
        acc.totalItems += item.quantity;
        acc.subtotal += item.quantity * item.product.price;
        return acc;
      },
      { totalItems: 0, subtotal: 0 },
    );
  }, [items]);

  const discount = appliedCoupon ? Math.round(subtotal * VALID_COUPONS[appliedCoupon]) : 0;
  const taxes = Math.round((subtotal - discount) * 0.04);
  const total = Math.max(0, subtotal - discount + taxes);

  return {
    items,
    add,
    increment,
    decrement,
    setQuantity,
    remove,
    clear,
    totalItems,
    subtotal,
    couponInput,
    setCouponInput,
    appliedCoupon,
    couponError,
    applyCoupon,
    discount,
    taxes,
    total,
  };
}

export type Cart = ReturnType<typeof useCart>;
