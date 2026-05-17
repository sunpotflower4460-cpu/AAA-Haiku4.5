import { useState, useMemo } from 'react';
import { Note } from '../types/note';
import { copy } from '../lib/i18n';
import SearchBar from './SearchBar';
import NoteCard from './NoteCard';
import EmptyState from './EmptyState';

interface NotesListProps {
  notes: Note[];
  onNewNote: () => void;
  onEditNote: (note: Note) => void;
  onDeleteNote: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export default function NotesList({
  notes,
  onNewNote,
  onEditNote,
  onDeleteNote,
  onToggleFavorite,
}: NotesListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter and sort notes
  const filteredNotes = useMemo(() => {
    let result = notes;

    // Search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (note) =>
          note.title.toLowerCase().includes(query) ||
          note.body.toLowerCase().includes(query)
      );
    }

    // Sort: favorites first, then by updatedAt desc
    result.sort((a, b) => {
      if (a.isFavorite !== b.isFavorite) {
        return a.isFavorite ? -1 : 1;
      }
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

    return result;
  }, [notes, searchQuery]);

  return (
    <div className="flex h-full flex-col bg-washi">
      {/* Header */}
      <div className="shrink-0 border-b border-line px-[21px] py-[34px] text-center">
        <h1 className="text-4xl font-bold text-sumi">{copy.appName}</h1>
        <p className="mt-2 text-sm text-ink-muted">{copy.appSubtitle}</p>
        <p className="mt-1 text-xs text-ink-muted">{copy.tagline}</p>
      </div>

      {/* Search Bar */}
      <div className="shrink-0 border-b border-line px-[21px] py-[21px]">
        <SearchBar
          query={searchQuery}
          onQueryChange={setSearchQuery}
          placeholder={copy.searchPlaceholder}
        />
      </div>

      {/* Notes List or Empty State */}
      <div className="flex-1 overflow-auto">
        {filteredNotes.length === 0 ? (
          searchQuery ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-center text-ink-muted">
                「{searchQuery}」に該当するメモは見つかりません。
              </p>
            </div>
          ) : (
            <EmptyState onNewNote={onNewNote} />
          )
        ) : (
          <div className="space-y-[13px] p-[21px] pb-[34px]">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={onEditNote}
                onDelete={onDeleteNote}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <button
        onClick={onNewNote}
        className="fixed bottom-[34px] right-[21px] z-40 flex h-[55px] w-[55px] items-center justify-center rounded-full bg-gold text-white shadow-soft transition-all hover:shadow-lg active:scale-95"
        aria-label={copy.newNote}
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    </div>
  );
}
