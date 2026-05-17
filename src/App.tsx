import { useState, useEffect } from 'react';
import { Note } from './types/note';
import { loadNotes, saveNotes } from './lib/storage';
import AppShell from './components/AppShell';
import NotesList from './components/NotesList';
import NoteEditor from './components/NoteEditor';

type Screen = 'list' | 'editor';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [screen, setScreen] = useState<Screen>('list');
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  // Load notes on mount
  useEffect(() => {
    const loaded = loadNotes();
    setNotes(loaded);
  }, []);

  // Save notes whenever they change
  useEffect(() => {
    if (notes.length > 0 || screen === 'list') {
      saveNotes(notes);
    }
  }, [notes, screen]);

  const handleNewNote = () => {
    const newNote: Note = {
      id: Math.random().toString(36).substring(2, 11),
      title: '',
      body: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isFavorite: false,
    };
    setSelectedNote(newNote);
    setScreen('editor');
  };

  const handleEditNote = (note: Note) => {
    setSelectedNote(note);
    setScreen('editor');
  };

  const handleSaveNote = (updatedNote: Note) => {
    const existingIndex = notes.findIndex((n) => n.id === updatedNote.id);
    if (existingIndex >= 0) {
      // Update existing note
      const updated = [...notes];
      updated[existingIndex] = updatedNote;
      setNotes(updated);
    } else {
      // Add new note
      setNotes([updatedNote, ...notes]);
    }
    setScreen('list');
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((n) => n.id !== id));
    setScreen('list');
  };

  const handleToggleFavorite = (id: string) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, isFavorite: !note.isFavorite } : note
      )
    );
  };

  return (
    <AppShell>
      {screen === 'list' ? (
        <NotesList
          notes={notes}
          onNewNote={handleNewNote}
          onEditNote={handleEditNote}
          onDeleteNote={handleDeleteNote}
          onToggleFavorite={handleToggleFavorite}
        />
      ) : (
        <NoteEditor
          note={selectedNote}
          onSave={handleSaveNote}
          onDelete={handleDeleteNote}
          onBack={() => setScreen('list')}
          onToggleFavorite={handleToggleFavorite}
        />
      )}
    </AppShell>
  );
}

export default App;
