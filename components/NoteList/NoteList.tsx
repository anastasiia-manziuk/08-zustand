import Link from 'next/link';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import css from './NoteList.module.css';
import type { Note } from '@/types/note';
import { deleteNote } from '@/lib/api';

interface NoteListProps {
  notes: Note[];
}
export default function NoteList({ notes }: NoteListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const deleteNoteMutation = useMutation({
    mutationFn: (id: Note['id']) => deleteNote(id),
    onMutate: id => {
      setDeletingId(id);
    },
    onSettled: () => {
      setDeletingId(null);
      queryClient.invalidateQueries({ queryKey: ['notes'] as const });
    },
  });

  return (
    <ul className={css.list}>
      {notes.map(note => (
        <li className={css.listItem} key={note.id}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button
              className={css.button}
              type="button"
              disabled={deletingId === note.id}
              onClick={() => deleteNoteMutation.mutate(note.id)}
            >
              {deletingId === note.id ? 'Deleting...' : 'Delete'}
            </button>
            <Link href={`/notes/${note.id}`}>View details</Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
