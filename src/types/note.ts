export interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

export interface CreateNoteRequest {
  title: string;
  content: string;
}

export interface UpdateNoteRequest {
  title: string;
  content: string;
}