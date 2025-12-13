type Tag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: Tag;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNoteData {
  title: string;
  content: string;
  tag: Tag;
}

export interface UpdateNoteData {
  title?: string;
  content?: string;
  tag?: Tag;
}
