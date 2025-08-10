import { useQuery } from '@tanstack/react-query';
import { getGenres } from '@/api/genres/getGenres';
import { Genre } from '@/types';

type EditedGenre = {
  value: Genre;
  label: Genre;
};

export const useGenres = () => {
  return useQuery<EditedGenre[]>({
    queryKey: ['genres'],
    queryFn: async () => {
      const result = await getGenres();
      return result.match(
        (data) => data.map((el: Genre) => ({ value: el, label: el })),
        (error) => { throw error; }
      );
    },
  });
};