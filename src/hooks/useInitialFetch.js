import useTrackStore from '@/store/tracksStore';
import { useEffect, useState } from 'react';
import { useGetSearchParams } from './useGetSearchParams';
import { getTracks } from '@/api/tracks/getTracks';

export const useInitialFetch = () => {
  const [maxPage, setMaxPage] = useState(null);
  const setTrackList = useTrackStore((state) => state.setTracks);
  const setLoading = useTrackStore((state) => state.setLoading);
  const searchParams = useGetSearchParams();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const data = await getTracks(searchParams);
      setTrackList(data.data);
      setMaxPage(Math.ceil(data.meta.total / data.meta.limit));
      setLoading(false);
    }
    fetchData();
  }, [JSON.stringify(searchParams)]);

  return maxPage;
};
