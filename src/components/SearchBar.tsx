import { copy } from '../lib/i18n';

interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  placeholder: string;
}

export default function SearchBar({
  query,
  onQueryChange,
  placeholder,
}: SearchBarProps) {
  return (
    <div className="relative">
      <input
        type="search"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-line bg-paper px-[13px] py-[8px] pr-10 text-sm text-sumi placeholder-ink-muted/50 outline-none focus:border-gold focus:shadow-soft transition-all"
        aria-label="Search notes"
      />
      {query && (
        <button
          onClick={() => onQueryChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-5 w-5 items-center justify-center rounded hover:bg-paper transition-colors"
          aria-label="Clear search"
          type="button"
        >
          <svg
            className="h-4 w-4 text-ink-muted"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
