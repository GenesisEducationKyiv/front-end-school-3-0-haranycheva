import useTrackStore from '@/store/tracksStore';
import { useEffect, useState } from 'react';
import { useGetSearchParams } from './useGetSearchParams';
import { getTracks } from '@/api/tracks/getTracks';
import { Filters } from '@/types';

export const useInitialFetch = () => {
  const [maxPage, setMaxPage] = useState(0);
  const setTrackList = useTrackStore((state) => state.setTracks);
  const setLoading = useTrackStore((state) => state.setLoading);
  const { search, artist, genre, sort, order, page } = useGetSearchParams();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const data = await getTracks({
        search,
        artist,
        genre,
        sort,
        order,
        page,
      });
      data.match(
        (res) => {
          console.log(res)
          setTrackList(res.data);
          setMaxPage(Math.ceil(res.meta.total / res.meta.limit));
        },
        (error) => {
          console.error('Failed to fetch tracks:', error);
        }
      );
      setLoading(false);
    }
    fetchData();
  }, [search, artist, genre, sort, order, page, setLoading, setTrackList]);

  return maxPage;
};
