import { Note } from "../types/note";

const STORAGE_KEY = "zanshin.notes.v1";

export const loadNotes = (): Note[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored) as Note[];
  } catch (error) {
    console.error("Failed to load notes:", error);
    return [];
  }
};

export const saveNotes = (notes: Note[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error("Failed to save notes:", error);
  }
};
