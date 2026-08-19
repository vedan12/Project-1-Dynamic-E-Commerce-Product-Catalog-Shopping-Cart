import { useSyncExternalStore } from 'react';
import type { CartItem } from './types';

const ORDERS_KEY = 'thala.orders.v1';

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  taxes: number;
  total: number;
  method: string;
  createdAt: string;
}

function loadOrders(): Order[] {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Order[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

let orders: Order[] = loadOrders();
const listeners = new Set<() => void>();

function persist() {
  try {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
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
  return orders;
}

export function useOrders(): Order[] {
  return useSyncExternalStore(subscribe, getSnapshot);
}

export function addOrder(params: {
  userId: string;
  userEmail: string;
  userName: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  taxes: number;
  total: number;
  method: string;
}): Order {
  const order: Order = {
    id: `ord-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    userId: params.userId,
    userEmail: params.userEmail,
    userName: params.userName,
    items: params.items.map((i) => ({
      productId: i.product.id,
      name: i.product.name,
      price: i.product.price,
      quantity: i.quantity,
    })),
    subtotal: params.subtotal,
    discount: params.discount,
    taxes: params.taxes,
    total: params.total,
    method: params.method,
    createdAt: new Date().toISOString(),
  };
  orders = [order, ...orders];
  persist();
  return order;
}
