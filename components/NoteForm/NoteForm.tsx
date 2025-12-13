import { useId } from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import type { FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';

import type { CreateNoteData } from '@/types/note';

import css from './NoteForm.module.css';

interface NoteFormProps {
  onCancel: () => void;
  //onSubmit: (data: CreateNoteData) => void | Promise<void>;
}

const INITIAL_VALUES: CreateNoteData = {
  title: '',
  content: '',
  tag: 'Todo',
};

const validationSchema = Yup.object({
  title: Yup.string().min(3, 'Min 3 characters').max(50, 'Max 50 characters').required('Required'),
  content: Yup.string().max(500, 'Max 500 characters'),
  tag: Yup.string().oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping']).required('Required'),
});

export default function NoteForm({ onCancel }: NoteFormProps) {
  const fieldId = useId();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: CreateNoteData) => createNote(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] as const });
    },
  });

  const handleSubmit = async (values: CreateNoteData, helpers: FormikHelpers<CreateNoteData>) => {
    try {
      await mutation.mutateAsync(values);
      helpers.resetForm();
      onCancel();
    } finally {
      helpers.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <fieldset className={css.fieldset}>
            <label htmlFor={`${fieldId}-title`} className={css.label}>
              Title
            </label>
            <Field type="text" name="title" id={`${fieldId}-title`} className={css.input} />
            <ErrorMessage name="title" component="span" className={css.error} />
          </fieldset>

          <fieldset className={css.fieldset}>
            <label htmlFor={`${fieldId}-content`} className={css.label}>
              Content
            </label>
            <Field
              as="textarea"
              name="content"
              id={`${fieldId}-content`}
              rows={8}
              className={css.textarea}
            />
            <ErrorMessage name="content" component="span" className={css.error} />
          </fieldset>

          <fieldset className={css.fieldset}>
            <label htmlFor={`${fieldId}-tag`} className={css.label}>
              Tag
            </label>
            <Field as="select" name="tag" id={`${fieldId}-tag`} className={css.select}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </fieldset>

          <div className={css.actions}>
            <button type="button" className={css.cancelButton} onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className={css.submitButton} disabled={isSubmitting}>
              Create note
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
