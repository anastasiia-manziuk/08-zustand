'use client';

import React, { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useQuery, HydrationBoundary, DehydratedState } from '@tanstack/react-query';

import css from './Notes.module.css';

import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import { fetchNotes } from '@/lib/api';
import type { NotesResponse } from '@/lib/api';
import Link from 'next/link';

export type NotesClientProps = {
  dehydratedState?: DehydratedState;
  tag?: string;
  initialPage?: number;
  initialSearch?: string;
};

export default function NotesClient({
  dehydratedState,
  tag,
  initialPage = 1,
  initialSearch = '',
}: NotesClientProps) {
  const [search, setSearch] = useState(initialSearch);
  const [debouncedSearch] = useDebounce(search, 300);
  const [page, setPage] = useState(initialPage);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const { data, isLoading } = useQuery<NotesResponse>({
    queryKey: ['notes', tag ?? 'all', debouncedSearch, page],
    queryFn: () => fetchNotes(page, debouncedSearch, 12, tag),
    placeholderData: prev => prev,
  });

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox search={search} onChange={handleSearchChange} />

          {data?.totalPages && data.totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={data.totalPages}
              onPageChange={setPage}
            />
          )}

          <Link href="/notes/action/create" className={css.button}>
            Create note +
          </Link>
        </header>

        {isLoading && <strong className={css.loading}>Loading notes...</strong>}

        {!isLoading && data?.notes?.length ? (
          <NoteList notes={data.notes} />
        ) : (
          !isLoading && <p>No notes found</p>
        )}
      </div>
    </HydrationBoundary>
  );
}

