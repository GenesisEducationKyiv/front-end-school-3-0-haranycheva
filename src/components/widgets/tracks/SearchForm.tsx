'use client';

import React, { useEffect, useCallback, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import debounce from 'lodash.debounce';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useGenres } from '@/hooks/queries/useGenres';
import { useGetSearchParams } from '@/hooks/useGetSearchParams';

type FormValues = {
  search: string;
  artist: string;
  genre: string;
  sort: string;
  order: string;
};

const SearchForm = () => {
  const params = useGetSearchParams();

  const { register, control, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      search: params.search ?? '',
      artist: params.artist ?? '',
      genre: params.genre ?? '',
      sort: params.sort ?? '',
      order: params.order ?? '',
    },
  });

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: genres = [], isLoading: loadingGenres } = useGenres();

  const updateURL = useCallback(
    (values: FormValues) => {
      const params = new URLSearchParams(searchParams.toString());
      let filterChanged = false;

      (
        ['search', 'artist', 'genre', 'sort', 'order'] as (keyof FormValues)[]
      ).forEach((key) => {
        const newValue = values[key];
        const oldValue = searchParams.get(key) || '';
        if (newValue !== oldValue) {
          filterChanged = true;
        }
        if (newValue) {
          params.set(key, newValue);
        } else {
          params.delete(key);
        }
      });

      if (filterChanged) params.set('page', '1');

      const newUrl = `${pathname}?${params.toString()}`;
      router.push(newUrl);
    },
    [pathname, router, searchParams]
  );

  const debouncedUpdateURL = useMemo(
    () => debounce(updateURL, 500),
    [updateURL]
  );

  useEffect(() => {
    const subscription = watch((values) => {
      debouncedUpdateURL({
        search: values.search ?? '',
        artist: values.artist ?? '',
        genre: values.genre ?? '',
        sort: values.sort ?? '',
        order: values.order ?? '',
      });
    });
    return () => {
      subscription.unsubscribe();
      debouncedUpdateURL.cancel();
    };
  }, [watch, debouncedUpdateURL]);

  return (
    <div className="mx-auto">
      <form
        className="flex flex-wrap gap-4 p-4 items-end justify-start"
        onSubmit={handleSubmit(() => {})}
      >
        <input
          {...register('search')}
          type="text"
          placeholder="Search by title"
          className="border p-2 rounded w-full sm:w-48 focus:outline-none"
          autoComplete="off"
          data-testid="search-input"
        />
        <input
          {...register('artist')}
          type="text"
          placeholder="Search by artist"
          className="border p-2 rounded w-full sm:w-48 focus:outline-none"
          autoComplete="off"
          data-testid="filter-artist"
        />
        <Controller
          name="genre"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              className="border p-2 rounded w-full sm:w-40 focus:outline-none"
              data-testid="filter-genre"
              disabled={loadingGenres}
              data-loading={loadingGenres}
              aria-disabled={loadingGenres}
            >
              {loadingGenres ? (
                <option value="">loading...</option>
              ) : (
                <>
                  <option value="">All genres</option>
                  {genres.map(({ value }) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </>
              )}
            </select>
          )}
        />
        <Controller
          name="sort"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              data-testid="sort-select"
              className="border p-2 rounded w-full sm:w-32 focus:outline-none"
            >
              <option value="title">Title</option>
              <option value="artist">Artist</option>
              <option value="createdAt">Date</option>
              <option value="album">Album</option>
            </select>
          )}
        />
        <Controller
          name="order"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              className="border p-2 rounded w-full sm:w-28 focus:outline-none"
            >
              <option value="asc">Asc</option>
              <option value="desc">Desc</option>
            </select>
          )}
        />
      </form>
    </div>
  );
};

export default SearchForm;
