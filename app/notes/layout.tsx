// app/notes/layout.tsx
import React from 'react';
import styles from './LayoutNotes.module.css';

interface NotesLayoutProps {
  children: React.ReactNode;
  modal?: React.ReactNode;
}

export default function NotesLayout({ children, modal }: NotesLayoutProps) {
  return (
    <div className={styles.container}>
      <div className={styles.notesWrapper}>
        {children}
      </div>

      {modal}
      <div id="modal-root" />
    </div>
  );
}
