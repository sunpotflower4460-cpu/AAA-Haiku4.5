import { copy } from '../lib/i18n';

interface EmptyStateProps {
  onNewNote: () => void;
}

export default function EmptyState({ onNewNote }: EmptyStateProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-[21px] text-center">
      {/* Subtle enso (circle) motif - breathing animation */}
      <div className="mb-[34px] relative">
        <div className="h-[89px] w-[89px] rounded-full border-2 border-dashed border-gold/25 flex items-center justify-center animate-breath">
          <div className="absolute h-[55px] w-[55px] rounded-full border border-gold/15" />
          {/* Inner breathing circle */}
          <div className="absolute h-[34px] w-[34px] rounded-full border-2 border-gold/10 animate-pulse-subtle" />
        </div>
      </div>

      {/* Text */}
      <h2 className="text-3xl font-serif font-semibold text-sumi leading-tight">
        {copy.emptyTitle}
      </h2>
      <p className="mt-[13px] text-sm text-ink-muted/70 leading-relaxed max-w-xs">
        {copy.emptySubtitle}
      </p>

      {/* Action button - inviting but not intrusive */}
      <button
        onClick={onNewNote}
        className="mt-[34px] rounded-md bg-gold px-[34px] py-[13px] text-sm font-medium text-white shadow-soft transition-all hover:shadow-lg hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
      >
        {copy.emptyAction}
      </button>
    </div>
  );
}
