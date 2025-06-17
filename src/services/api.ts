import type { Note, CreateNoteRequest, UpdateNoteRequest } from '../types/note';

const API_BASE_URL = 'https://684eae11f0c9c9848d28c9cd.mockapi.io/api';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new ApiError(response.status, `HTTP error! status: ${response.status}`);
  }
  return response.json();
}

// Transform API response to our Note interface
function transformNote(note: any): Note {
  return {
    id: note.id,
    title: note.title,
    content: note.content,
    createdAt: note.createdAt || new Date().toISOString(),
    updatedAt: note.updatedAt || new Date().toISOString()
  };
}

export const notesApi = {
  async getNotes(search?: string): Promise<Note[]> {
    const response = await fetch(`${API_BASE_URL}/notes`);
    const notesRaw = await handleResponse<any[]>(response);

    let notes = notesRaw.map(transformNote);

    if (search) {
      notes = notes.filter(note =>
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.content.toLowerCase().includes(search.toLowerCase())
      );
    }

    return notes;
  },

  async createNote(note: CreateNoteRequest): Promise<Note> {
    const response = await fetch(`${API_BASE_URL}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: note.title,
        content: note.content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }),
    });

    const createdNote = await handleResponse<any>(response);
    return transformNote(createdNote);
  },

  async updateNote(id: number | string, note: UpdateNoteRequest): Promise<Note> {
    const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: note.title,
        content: note.content,
        updatedAt: new Date().toISOString()
      }),
    });

    const updatedNote = await handleResponse<any>(response);
    return transformNote(updatedNote);
  },

  async deleteNote(id: number | string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new ApiError(response.status, `HTTP error! status: ${response.status}`);
    }
  },
};
