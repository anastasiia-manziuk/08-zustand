import React from 'react';
import styles from '@/app/notes/LayoutNotes.module.css';

interface Props {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export default function NotesLayout({ children, sidebar }: Props) {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        {sidebar}
      </aside>
      <div className={styles.notesWrapper}>
        {children}
      </div>
    </div>
  );
}
