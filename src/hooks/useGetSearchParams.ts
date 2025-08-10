import { getSafeParam } from '@/helpers/getParams';
import { Filters, isOrder, isSort } from '@/types';
import { O, pipe } from '@mobily/ts-belt';
import { useSearchParams } from 'next/navigation';

export const useGetSearchParams = (): Filters => {
  const searchParams = useSearchParams();

  const get = (key: keyof Filters) => getSafeParam(searchParams, key, '');

  const search = get('search');
  const artist = get('artist');
  const genre = get('genre');

  const sort = getSafeParam<NonNullable<Filters['sort']>>(
    searchParams,
    'sort',
    'title',
    isSort
  );
  const order = getSafeParam<NonNullable<Filters['order']>>(
    searchParams,
    'order',
    'asc',
    isOrder
  );

  const page = pipe(
    searchParams.get('page'),
    O.fromNullable,
    O.map(Number),
    O.filter((num) => !isNaN(num) && num > 0),
    O.getWithDefault<number>(1)
  );

  return { search, artist, genre, sort, order, page };
};
