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

  return {
    title: note.title,
    description: note.content?.slice(0, 160),
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
