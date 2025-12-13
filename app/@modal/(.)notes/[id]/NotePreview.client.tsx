'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import css from './NotePreview.client.module.css';

export default function NotePreviewClient({ id }: { id: string }) {
  const router = useRouter();

  const { data: note, isLoading, error } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return (
      <Modal onClose={() => router.back()}>
        <div className={css.container ?? ''}>Loading...</div>
      </Modal>
    );
  }

  if (error || !note) {
    return (
      <Modal onClose={() => router.back()}>
        <div className={css.container ?? ''}>Error loading note</div>
      </Modal>
    );
  }

  return (
    <Modal onClose={() => router.back()}>
      <div className={css.container ?? ''}>
        <h2>{note.title}</h2>
        <p>{note.content}</p>

        <button className="backBtn" onClick={() => router.back()}>
          Close
        </button>
      </div>
    </Modal>
  );
}
