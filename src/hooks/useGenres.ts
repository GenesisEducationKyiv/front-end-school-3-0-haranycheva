import { getGenges } from '@/api/genres/getGenres';
import { type Genre } from '@/types';
import { useEffect, useState } from 'react';

type EditedGenre = {
  value: string;
  label: string;
};

export const useGenres = (): [EditedGenre[], boolean] => {
  const [genres, setGenres] = useState<EditedGenre[]>([]);
  const [loadingGenres, setLoadingGenres] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoadingGenres(true);
      const result = await getGenges();

      result.match(
        (data) => {
          const editedData = data.map((el: Genre) => ({
            value: el,
            label: el,
          }));
          setGenres(editedData);
        },
        (error) => {
          console.error('Failed to fetch genres:', error);
        }
      );

      setLoadingGenres(false);
    }

    fetchData();
  }, []);

  return [genres, loadingGenres];
};
