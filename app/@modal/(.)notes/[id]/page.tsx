import NotePreview from '@/app/@modal/(.)notes/[id]/NotePreview.client';
import { fetchNoteById } from '@/lib/api';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

interface NoteProp {
  params: Promise<{ id: string }>;
}

export default async function InterceptedNote({ params }: NoteProp) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotePreview id={id} />
    </HydrationBoundary>
  );
}
