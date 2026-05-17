import { useState, useEffect, useCallback } from 'react';
import { Note } from '../types/note';
import { copy } from '../lib/i18n';

interface NoteEditorProps {
  note: Note | null;
  onSave: (note: Note) => void;
  onSaveAndNavigate: (note: Note) => void;
  onDelete: (id: string) => void;
  onBack: () => void;
  onToggleFavorite: (id: string) => void;
}

export default function NoteEditor({
  note,
  onSave,
  onSaveAndNavigate,
  onDelete,
  onBack,
  onToggleFavorite,
}: NoteEditorProps) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [showSavedStatus, setShowSavedStatus] = useState(false);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setBody(note.body);
      setIsFavorite(note.isFavorite);
    }
  }, [note]);

  // Use useCallback to prevent stale closure issues
  const handleSaveInternal = useCallback(() => {
    if (note) {
      const updated: Note = {
        ...note,
        title,
        body,
        updatedAt: new Date().toISOString(),
        isFavorite,
      };
      onSave(updated);
      setShowSavedStatus(true);
      setTimeout(() => setShowSavedStatus(false), 2000);
    }
  }, [note, title, body, isFavorite, onSave]);

  const handleDelete = () => {
    const message = copy.confirmDelete;
    if (window.confirm(message) && note) {
      onDelete(note.id);
    }
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (note) {
      onToggleFavorite(note.id);
    }
  };

  // Auto-save on content change
  useEffect(() => {
    const timer = setTimeout(handleSaveInternal, 500);
    return () => clearTimeout(timer);
  }, [handleSaveInternal]);

  return (
    <div className="flex h-full flex-col bg-washi">
      {/* Header */}
      <div className="shrink-0 flex items-center justify-between border-b border-line px-[21px] py-[21px] gap-[13px]">
        <button
          onClick={onBack}
          className="inline-flex h-10 w-10 items-center justify-center rounded hover:bg-paper transition-colors"
          aria-label={copy.back}
        >
          <svg
            className="h-6 w-6 text-sumi"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Save status indicator */}
        {showSavedStatus && (
          <span className="text-xs text-gold animate-fade-out">
            {copy.saved}
          </span>
        )}

        <div className="flex-1" />

        <button
          onClick={handleToggleFavorite}
          className="inline-flex h-10 w-10 items-center justify-center rounded hover:bg-paper transition-colors"
          aria-label={copy.favorite}
        >
          <svg
            className={`h-6 w-6 ${
              isFavorite ? 'fill-gold text-gold' : 'text-ink-muted'
            }`}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2l-2.81 6.63L2 9.24l5.46 4.73L5.82 21 12 17.27z" />
          </svg>
        </button>

        <button
          onClick={handleDelete}
          className="inline-flex h-10 w-10 items-center justify-center rounded hover:bg-red-100 transition-colors"
          aria-label={copy.delete}
        >
          <svg
            className="h-6 w-6 text-vermilion"
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

      {/* Title Input */}
      <div className="shrink-0 border-b border-line px-[21px] py-[21px]">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={copy.noTitle}
          className="w-full bg-transparent font-serif text-2xl font-semibold text-sumi placeholder-ink-muted/50 outline-none"
        />
      </div>

      {/* Body Input */}
      <div className="flex-1 overflow-hidden px-[21px] py-[34px]">
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={copy.writeHere}
          className="h-full w-full resize-none bg-transparent text-base text-sumi placeholder-ink-muted/50 outline-none leading-relaxed-jp transition-none"
        />
      </div>
    </div>
  );
}
