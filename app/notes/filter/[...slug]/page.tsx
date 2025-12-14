import NotesClient from './Notes.client';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import type { Metadata } from 'next';



interface Props {
  params: Promise<{ slug?: string[] }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}



export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { slug = [] } = await params;

  const rawTag = slug[0] ?? 'all';
  const tagName = rawTag === 'all' ? 'All Notes' : rawTag;

  return {
    title: `Filtered notes: ${tagName}`,
    description: `Viewing notes filtered by ${tagName}`,
    openGraph: {
      title: `Filtered notes: ${tagName}`,
      description: `Viewing notes filtered by ${tagName}`,
      url: `https://08-zustand-taupe-one.vercel.app/notes/filter/${slug.join('/')}`,
      images: [
        { url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg' },
      ],
    },
  };
};




export default async function FilterPage({ params, searchParams }: Props) {
  const { slug = [] } = await params;
  const sp = (await searchParams) ?? {};

  const rawTag = slug[0];
  const tag = rawTag === 'all' ? undefined : rawTag;

  const page = Number(sp.page ?? 1) || 1;
  const search = typeof sp.search === 'string' ? sp.search : '';

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', { tag, page, search }],
    queryFn: () => fetchNotes(page, search, 12, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient
        key={tag ?? 'all'}
        tag={tag}
        initialPage={page}
        initialSearch={search}
      />
    </HydrationBoundary>
  );
}
