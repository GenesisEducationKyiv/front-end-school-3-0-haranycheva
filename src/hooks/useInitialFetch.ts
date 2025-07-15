import { useGetSearchParams } from './useGetSearchParams';
import { useTracks } from './queries/useTracks';

export const useInitialFetch = () => {
  const { search, artist, genre, sort, order, page } = useGetSearchParams();
  const { data, isLoading } = useTracks({
    search,
    artist,
    genre,
    sort,
    order,
    page,
  });
  const maxPage = data ? Math.ceil(data.meta.total / data.meta.limit) : 0;

  return {
    maxPage,
    data: data?.data,
    isLoading
  };
};
