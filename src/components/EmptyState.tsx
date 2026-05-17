import { copy } from '../lib/i18n';

interface EmptyStateProps {
  onNewNote: () => void;
}

export default function EmptyState({ onNewNote }: EmptyStateProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-[21px] text-center">
      {/* Subtle circle motif */}
      <div className="mb-[34px] h-[89px] w-[89px] rounded-full border-2 border-dashed border-gold/30 flex items-center justify-center">
        <div className="h-[55px] w-[55px] rounded-full border border-gold/20" />
      </div>

      {/* Text */}
      <h2 className="text-2xl font-serif font-semibold text-sumi">
        {copy.emptyTitle}
      </h2>
      <p className="mt-2 text-sm text-ink-muted">{copy.emptySubtitle}</p>

      {/* Action button */}
      <button
        onClick={onNewNote}
        className="mt-[34px] rounded-lg bg-gold px-[21px] py-[13px] text-sm font-medium text-white shadow-soft transition-all hover:shadow-lg active:scale-95"
      >
        {copy.emptyAction}
      </button>
    </div>
  );
}
