import { useState } from 'react';
import { Pencil, Trash2, Plus, X, LogOut, LayoutDashboard, ClipboardList } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth, logout } from '../auth';
import { useProducts, addProduct, updateProduct, deleteProduct, ADMIN_CATEGORIES, type NewProduct } from '../productStore';
import { useOrders } from '../orderStore';
import { formatPrice } from '../format';
import type { Product } from '../types';

const emptyForm: NewProduct = {
  name: '',
  price: 0,
  category: 'Footwear',
  image: '',
  blurb: '',
  description: '',
  rating: 4.5,
};

export function Admin() {
  const user = useAuth();
  const navigate = useNavigate();
  const products = useProducts();
  const orders = useOrders();

  const [tab, setTab] = useState<'products' | 'orders'>('products');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<NewProduct>(emptyForm);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const openAddForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setError(null);
    setShowForm(true);
  };

  const openEditForm = (product: Product) => {
    const { id, ...rest } = product;
    void id;
    setForm(rest);
    setEditingId(product.id);
    setError(null);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.name.trim()) return setError('Product name is required.');
    if (!form.image.trim()) return setError('Image URL is required.');
    if (form.price <= 0) return setError('Price must be greater than 0.');

    if (editingId) {
      updateProduct(editingId, form);
    } else {
      addProduct(form);
    }
    closeForm();
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Delete "${name}"? This can't be undone.`)) {
      deleteProduct(id);
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink-900">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-ink-500">Signed in as {user?.name} ({user?.email})</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-full border border-ink-200 px-4 py-2 text-sm font-medium text-ink-700 transition hover:border-ink-400"
        >
          <LogOut className="h-4 w-4" aria-hidden />
          Log out
        </button>
      </div>

      <div className="mt-6 flex gap-2 border-b border-ink-100">
        <button
          onClick={() => setTab('products')}
          className={[
            'flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium transition',
            tab === 'products' ? 'border-ink-900 text-ink-900' : 'border-transparent text-ink-400 hover:text-ink-700',
          ].join(' ')}
        >
          <LayoutDashboard className="h-4 w-4" aria-hidden />
          Products ({products.length})
        </button>
        <button
          onClick={() => setTab('orders')}
          className={[
            'flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium transition',
            tab === 'orders' ? 'border-ink-900 text-ink-900' : 'border-transparent text-ink-400 hover:text-ink-700',
          ].join(' ')}
        >
          <ClipboardList className="h-4 w-4" aria-hidden />
          Orders ({orders.length})
        </button>
      </div>

      {tab === 'products' && (
        <div className="mt-6">
          <div className="flex justify-end">
            <button
              onClick={openAddForm}
              className="flex items-center gap-2 rounded-full bg-ink-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-ink-800"
            >
              <Plus className="h-4 w-4" aria-hidden />
              Add Product
            </button>
          </div>

          <div className="mt-4 overflow-x-auto rounded-2xl border border-ink-100 bg-white shadow-card">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-ink-100 text-xs uppercase text-ink-400">
                <tr>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Rating</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b border-ink-50 last:border-0">
                    <td className="flex items-center gap-3 px-4 py-3">
                      <img src={p.image} alt={p.name} className="h-10 w-10 rounded-lg object-cover" />
                      <span className="font-medium text-ink-900">{p.name}</span>
                    </td>
                    <td className="px-4 py-3 text-ink-600">{p.category}</td>
                    <td className="px-4 py-3 text-ink-600">{formatPrice(p.price)}</td>
                    <td className="px-4 py-3 text-ink-600">{p.rating.toFixed(1)}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEditForm(p)}
                          aria-label={`Edit ${p.name}`}
                          className="rounded-full border border-ink-200 p-2 text-ink-600 transition hover:border-ink-400"
                        >
                          <Pencil className="h-3.5 w-3.5" aria-hidden />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id, p.name)}
                          aria-label={`Delete ${p.name}`}
                          className="rounded-full border border-ink-200 p-2 text-red-500 transition hover:border-red-300"
                        >
                          <Trash2 className="h-3.5 w-3.5" aria-hidden />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'orders' && (
        <div className="mt-6 space-y-4">
          {orders.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-ink-200 bg-sand-50 p-10 text-center text-sm text-ink-500">
              No orders placed yet.
            </div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="rounded-2xl border border-ink-100 bg-white p-5 shadow-card">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-sm font-medium text-ink-900">
                    #{order.id.slice(-6).toUpperCase()} · {order.userName} ({order.userEmail})
                  </div>
                  <span className="text-xs text-ink-400">{new Date(order.createdAt).toLocaleString()}</span>
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
            ))
          )}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 px-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-card">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-ink-900">
                {editingId ? 'Edit Product' : 'Add Product'}
              </h2>
              <button onClick={closeForm} aria-label="Close" className="rounded-full p-1 text-ink-400 hover:text-ink-700">
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-3">
              {error && <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</div>}

              <div>
                <label className="block text-xs font-medium text-ink-500">Name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-1 h-10 w-full rounded-lg border border-ink-200 bg-sand-50 px-3 text-sm focus:border-ink-900 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-ink-500">Price (₹)</label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                    className="mt-1 h-10 w-full rounded-lg border border-ink-200 bg-sand-50 px-3 text-sm focus:border-ink-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-500">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as Product['category'] })}
                    className="mt-1 h-10 w-full rounded-lg border border-ink-200 bg-sand-50 px-3 text-sm focus:border-ink-900 focus:outline-none"
                  >
                    {ADMIN_CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-ink-500">Image URL</label>
                <input
                  required
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="https://..."
                  className="mt-1 h-10 w-full rounded-lg border border-ink-200 bg-sand-50 px-3 text-sm focus:border-ink-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-ink-500">Short blurb</label>
                <input
                  required
                  value={form.blurb}
                  onChange={(e) => setForm({ ...form, blurb: e.target.value })}
                  className="mt-1 h-10 w-full rounded-lg border border-ink-200 bg-sand-50 px-3 text-sm focus:border-ink-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-ink-500">Description</label>
                <textarea
                  required
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-ink-200 bg-sand-50 px-3 py-2 text-sm focus:border-ink-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-ink-500">Rating (0–5)</label>
                <input
                  type="number"
                  step={0.1}
                  min={0}
                  max={5}
                  required
                  value={form.rating}
                  onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                  className="mt-1 h-10 w-full rounded-lg border border-ink-200 bg-sand-50 px-3 text-sm focus:border-ink-900 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={closeForm}
                  className="rounded-full border border-ink-200 px-4 py-2 text-sm font-medium text-ink-700 transition hover:border-ink-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-ink-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-ink-800"
                >
                  {editingId ? 'Save Changes' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
