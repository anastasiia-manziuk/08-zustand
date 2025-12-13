import NotesClient from './Notes.client';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';

type Params = Record<string, string | string[] | undefined>;

interface Props {
  params: Promise<{ slug: string[] }>;
  searchParams?: Params | Promise<Params>;
}

export default async function FilterPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const sp = await (searchParams ?? {});

  const slugArr = Array.isArray(slug) ? slug : slug ? [slug] : [];
  const rawTag = slugArr[0];
  const tag = rawTag === 'all' ? undefined : rawTag;

  const page = Number(sp?.page ?? 1) || 1;
  const search = typeof sp?.search === 'string' ? sp.search : '';

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['notes', { tag, page, search }],
    queryFn: () => fetchNotes(page, search, 12, tag),
  });

  const dehydratedState = dehydrate(queryClient);


  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient
        key={tag ?? 'all'}
        tag={tag}
        initialPage={page}
        initialSearch={search}
      />
    </HydrationBoundary>
  );
}
