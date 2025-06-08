import { getParam, getValidatedParam } from '@/helpers/getParams';
import { Filters, isOrder, isSort } from '@/types';
import { O, pipe } from '@mobily/ts-belt';
import { useSearchParams } from 'next/navigation';

export const useGetSearchParams = (): Filters => {
  const searchParams = useSearchParams();

  const search = getParam(searchParams, 'search', '');
  const artist = getParam(searchParams, 'artist', '');
  const genre = getParam(searchParams, 'genre', '');

 const sort = getValidatedParam<NonNullable<Filters['sort']>>(
  searchParams,
  'sort',
  isSort,
  'title'
);
const order = getValidatedParam<NonNullable<Filters['order']>>(
  searchParams,
  'order',
  isOrder,
  'asc'
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

