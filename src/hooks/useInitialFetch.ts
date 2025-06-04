import useTrackStore from '@/store/tracksStore';
import { useEffect, useState } from 'react';
import { useGetSearchParams } from './useGetSearchParams';
import { getTracks } from '@/api/tracks/getTracks';
import { Filters } from '@/types';

export const useInitialFetch = () => {
  const [maxPage, setMaxPage] = useState(0);
  const setTrackList = useTrackStore((state) => state.setTracks);
  const setLoading = useTrackStore((state) => state.setLoading);
  const searchParams = useGetSearchParams();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const data = await getTracks(searchParams);
      data.match(
        (res) => {
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
  }, [JSON.stringify(searchParams)]);

  return maxPage;
};
