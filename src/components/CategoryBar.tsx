import type { Category } from '../types';
import { CATEGORIES } from '../products';

interface CategoryBarProps {
  active: 'All' | Category;
  onSelect: (category: 'All' | Category) => void;
  counts: Record<string, number>;
}

export function CategoryBar({ active, onSelect, counts }: CategoryBarProps) {
  return (
    <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 py-1 sm:mx-0 sm:px-0">
      {CATEGORIES.map((category) => {
        const isActive = active === category;
        const count = counts[category] ?? 0;
        return (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className={[
              'flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition active:scale-[0.98]',
              isActive
                ? 'border-ink-900 bg-ink-900 text-sand-50'
                : 'border-ink-200 bg-white/60 text-ink-700 hover:border-ink-400 hover:bg-white',
            ].join(' ')}
          >
            {category}
            <span
              className={[
                'rounded-full px-1.5 py-0.5 text-xs font-semibold',
                isActive ? 'bg-white/20 text-sand-50' : 'bg-ink-100 text-ink-500',
              ].join(' ')}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
