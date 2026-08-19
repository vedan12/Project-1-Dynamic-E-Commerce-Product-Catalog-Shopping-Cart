import { Link } from 'react-router-dom';

export function About() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-brand-600">
        Our story
      </p>
      <h1 className="font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
        About Thala For A Reason
      </h1>
      <p className="mt-5 max-w-2xl leading-relaxed text-ink-600">
        Thala For A Reason started as a small kit stall for local cricket
        clubs and grew into a full sports store — footwear, apparel,
        equipment, and accessories chosen for players who show up every
        week, not just on match day. Every product on this site is picked
        the way Thala captains: calm, consistent, dependable.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        <div className="rounded-2xl border border-ink-100 bg-white p-5 shadow-card">
          <p className="font-display text-2xl font-bold text-ink-900">2019</p>
          <p className="mt-1 text-sm text-ink-500">Founded</p>
        </div>
        <div className="rounded-2xl border border-ink-100 bg-white p-5 shadow-card">
          <p className="font-display text-2xl font-bold text-ink-900">30K+</p>
          <p className="mt-1 text-sm text-ink-500">Customers served</p>
        </div>
        <div className="rounded-2xl border border-ink-100 bg-white p-5 shadow-card">
          <p className="font-display text-2xl font-bold text-ink-900">4.5/5</p>
          <p className="mt-1 text-sm text-ink-500">Average rating</p>
        </div>
      </div>
      <Link
        to="/shop"
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-ink-800"
      >
        Shop the collection
      </Link>
    </main>
  );
}
