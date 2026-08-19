import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-sand-100 to-sand-50">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-24 md:grid-cols-2 md:items-center">
          <div>
            <span className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-ink-900 font-display text-3xl font-bold text-brand-500">
              7
            </span>
            <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink-900 sm:text-6xl">
              7!! Thala For a <span className="text-brand-500">Reason!</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-600 sm:text-lg">
              Gear built the way Thala plays — calm, dependable, and ready
              when it counts. Shop cricket footwear, apparel, and equipment
              picked for everyday performance.
            </p>
            <Link
              to="/shop"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-ink-800 active:scale-[0.98]"
            >
              Shop Now
            </Link>
          </div>
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/163452/basketball-dunk-blue-game-163452.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
              alt="Athlete in action"
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-card-hover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-2xl font-semibold text-ink-900 sm:text-3xl">
          Shop by category
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { name: 'Footwear', img: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&h=400&w=400' },
            { name: 'Apparel', img: 'https://images.pexels.com/photos/8007401/pexels-photo-8007401.jpeg?auto=compress&cs=tinysrgb&h=400&w=400' },
            { name: 'Accessories', img: 'https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&h=400&w=400' },
            { name: 'Equipment', img: 'https://images.pexels.com/photos/3628912/pexels-photo-3628912.jpeg?auto=compress&cs=tinysrgb&h=400&w=400' },
          ].map((c) => (
            <Link
              key={c.name}
              to="/shop"
              state={{ category: c.name }}
              className="group relative aspect-square overflow-hidden rounded-2xl bg-sand-100 shadow-card"
            >
              <img
                src={c.img}
                alt={c.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 bg-ink-900/70 py-2 text-center text-sm font-semibold text-white">
                {c.name}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
