'use client';

import { useId } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useNoteStore } from '@/lib/store/noteStore';
import { createNote } from '@/lib/api';
import type { CreateNoteData } from '@/types/note';

import css from './NoteForm.module.css';

interface NoteFormProps {
  onCancel: () => void;
}

export default function NoteForm({ onCancel }: NoteFormProps) {
  const fieldId = useId();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { draft, setDraft, clearDraft } = useNoteStore();

  const mutation = useMutation({
    mutationFn: (data: CreateNoteData) => createNote(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      router.back();
    },
    onError: (error) => {
      console.error('Failed to create note', error);
    },
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setDraft({
      ...draft,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: CreateNoteData = {
      title: draft.title.trim(),
      content: draft.content.trim(),
      tag: draft.tag,
    };

    if (data.title.length < 3) {
      return;
    }

    mutation.mutate(data);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <fieldset className={css.fieldset}>
        <label htmlFor={`${fieldId}-title`} className={css.label}>
          Title
        </label>
        <input
          id={`${fieldId}-title`}
          name="title"
          type="text"
          className={css.input}
          value={draft.title}
          onChange={handleChange}
          required
          minLength={3}
          maxLength={50}
        />
      </fieldset>

      <fieldset className={css.fieldset}>
        <label htmlFor={`${fieldId}-content`} className={css.label}>
          Content
        </label>
        <textarea
          id={`${fieldId}-content`}
          name="content"
          rows={8}
          className={css.textarea}
          value={draft.content}
          onChange={handleChange}
          maxLength={500}
        />
      </fieldset>

      <fieldset className={css.fieldset}>
        <label htmlFor={`${fieldId}-tag`} className={css.label}>
          Tag
        </label>
        <select
          id={`${fieldId}-tag`}
          name="tag"
          className={css.select}
          value={draft.tag}
          onChange={handleChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </fieldset>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={mutation.isPending}
        >
          Create note
        </button>
      </div>
    </form>
  );
}
