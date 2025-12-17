import type { Metadata } from 'next';
import CreateNoteClient from './CreateNote';

export const metadata: Metadata = {
  title: 'Create note',
  description: 'Create a new note',
  openGraph: {
    title: 'Create note',
    description: 'Create a new note',
    url: 'https://08-zustand-taupe-one.vercel.app/notes/action/create',
    images: [
  {
    url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
  },
],
  },
};

export default function CreateNotePage() {
  return <CreateNoteClient />;
}
