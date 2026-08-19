export function Footer() {
  return (
    <footer className="bg-brand-500">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-8 text-center sm:grid-cols-4 sm:px-6">
        <div>
          <p className="font-display text-2xl font-bold text-ink-900">2K+</p>
          <p className="text-sm font-medium text-ink-900/70">Reviews</p>
        </div>
        <div>
          <p className="font-display text-2xl font-bold text-ink-900">30K+</p>
          <p className="text-sm font-medium text-ink-900/70">Customers</p>
        </div>
        <div>
          <p className="font-display text-2xl font-bold text-ink-900">High</p>
          <p className="text-sm font-medium text-ink-900/70">Quality</p>
        </div>
        <div>
          <p className="font-display text-2xl font-bold text-ink-900">4.5/5</p>
          <p className="text-sm font-medium text-ink-900/70">Rating</p>
        </div>
      </div>
    </footer>
  );
}
