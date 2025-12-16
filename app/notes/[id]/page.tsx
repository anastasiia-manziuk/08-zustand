import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';

interface NoteProp {
  params: Promise<{ id: string }>;
}

export async function generateMetadata(
  { params }: NoteProp
): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(id);

  const title = note.title;
  const description = note.content?.slice(0, 160);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/notes/${id}`,
      images: [
        'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      ],
    },
  };
}

export default async function NotePage({ params }: NoteProp) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}

