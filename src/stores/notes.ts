import { writable, derived } from 'svelte/store';
import type { Note } from '../types/note';

export const notes = writable<Note[]>([]);
export const isLoading = writable(false);
export const error = writable<string | null>(null);
export const searchQuery = writable('');

export const filteredNotes = derived(
  [notes, searchQuery],
  ([$notes, $searchQuery]) => {
    if (!$searchQuery.trim()) {
      return $notes;
    }
    
    const query = $searchQuery.toLowerCase();
    return $notes.filter(note => 
      note.title.toLowerCase().includes(query) || 
      note.content.toLowerCase().includes(query)
    );
  }
);