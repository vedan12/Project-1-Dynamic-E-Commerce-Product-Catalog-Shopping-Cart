import { Search as SearchIcon } from 'lucide-react';

interface EmptyStateProps {
  query: string;
  onClear: () => void;
}

export function EmptyState({ query, onClear }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-200 bg-white/50 px-6 py-20 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-ink-100">
        <SearchIcon className="h-7 w-7 text-ink-400" aria-hidden />
      </div>
      <p className="font-display text-lg font-medium text-ink-900">
        Nothing matches yet
      </p>
      <p className="mt-1 max-w-sm text-sm text-ink-500">
        We couldn't find products for "{query}". Try a different search or browse
        all categories.
      </p>
      <button
        onClick={onClear}
        className="mt-6 rounded-full bg-ink-900 px-5 py-2.5 text-sm font-medium text-sand-50 transition hover:bg-ink-800 active:scale-[0.98]"
      >
        Clear filters
      </button>
    </div>
  );
}
