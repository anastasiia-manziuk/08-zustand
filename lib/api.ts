import axios from 'axios';
import type { Note, CreateNoteData } from '@/types/note';

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

const BASE_URL = 'https://notehub-public.goit.study/api';
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const fetchNotes = async (
  page = 1,
  search = '',
  perPage = 12,
  tag?: string
): Promise<NotesResponse> => {
  const params: Record<string, unknown> = { page, search, perPage };
  if (tag) params.tag = tag;

  const res = await axios.get<NotesResponse>(`${BASE_URL}/notes`, {
    params,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return res.data;
};

export const createNote = async (data: CreateNoteData): Promise<Note> => {
  const res = await axios.post<Note>(`${BASE_URL}/notes`, data, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return res.data;
};

export const deleteNote = async (id: Note['id']): Promise<Note> => {
  const res = await axios.delete<Note>(`${BASE_URL}/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return res.data;
};

export async function fetchNoteById(noteId: Note['id']) {
  const { data } = await axios.get<Note>(`${BASE_URL}/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return data;
}
