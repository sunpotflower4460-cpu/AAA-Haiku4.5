import { Note } from '../types/note';
import { formatDate } from '../lib/date';
import { copy } from '../lib/i18n';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export default function NoteCard({
  note,
  onEdit,
  onDelete,
  onToggleFavorite,
}: NoteCardProps) {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(copy.confirmDelete)) {
      onDelete(note.id);
    }
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(note.id);
  };

  const title = note.title || copy.untitledNote;
  const preview = note.body ? note.body.substring(0, 60).replace(/\n/g, ' ') : '（本文なし）';

  return (
    <div
      onClick={() => onEdit(note)}
      className="group relative flex cursor-pointer items-start gap-[13px] rounded-lg border border-line bg-paper px-[21px] py-[21px] shadow-soft transition-all hover:shadow-lg active:scale-95"
    >
      {/* Left accent line if favorite */}
      {note.isFavorite && (
        <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg bg-gold" />
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h2 className="truncate font-serif text-lg font-semibold text-sumi">
          {title}
        </h2>
        <p className="mt-1 line-clamp-2 text-sm text-ink-muted">{preview}</p>
        <p className="mt-2 text-xs text-ink-muted/70">{formatDate(note.updatedAt)}</p>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 gap-2 opacity-0 transition-opacity group-hover:opacity-100">
        <button
          onClick={handleToggleFavorite}
          className="inline-flex h-8 w-8 items-center justify-center rounded hover:bg-paper transition-colors"
          aria-label="Toggle favorite"
          title="お気に入り"
        >
          <svg
            className={`h-5 w-5 ${
              note.isFavorite ? 'fill-gold text-gold' : 'text-ink-muted'
            }`}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2l-2.81 6.63L2 9.24l5.46 4.73L5.82 21 12 17.27z" />
          </svg>
        </button>
        <button
          onClick={handleDelete}
          className="inline-flex h-8 w-8 items-center justify-center rounded hover:bg-red-100 transition-colors"
          aria-label="Delete note"
          title="削除"
        >
          <svg
            className="h-5 w-5 text-vermilion"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
