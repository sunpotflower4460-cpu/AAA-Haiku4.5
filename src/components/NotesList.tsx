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
      {/* Header with more breathing room */}
      <div className="shrink-0 border-b border-line px-[21px] pt-[34px] pb-[21px] text-center">
        <h1 className="text-5xl font-serif font-semibold text-sumi tracking-tight">
          {copy.appName}
        </h1>
        <p className="mt-[13px] text-xs tracking-wide text-ink-muted/70 uppercase letter-spacing-1">
          {copy.appSubtitle}
        </p>
        <p className="mt-[8px] text-xs text-ink-muted/50 leading-relaxed">
          {copy.tagline}
        </p>
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
            <div className="flex h-full items-center justify-center px-[21px]">
              <p className="text-center text-ink-muted">
                「{searchQuery}」に該当するメモは見つかりません。
              </p>
            </div>
          ) : (
            <EmptyState onNewNote={onNewNote} />
          )
        ) : (
          <div className="space-y-[13px] p-[21px] pb-[89px] animate-fade-in">
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

      {/* Floating Action Button - enhanced */}
      <button
        onClick={onNewNote}
        className="fixed bottom-[34px] right-[21px] z-40 flex h-[55px] w-[55px] items-center justify-center rounded-full bg-gold text-white shadow-soft transition-all hover:shadow-lg hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        aria-label={copy.newNote}
        title={copy.newNote}
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
