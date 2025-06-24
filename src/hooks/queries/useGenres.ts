import { useQuery } from '@tanstack/react-query';
import { getGenges } from '@/api/genres/getGenres';
import { Genre } from '@/types';

type EditedGenre = {
  value: Genre;
  label: Genre;
};

export const useGenres = () => {
  return useQuery<EditedGenre[]>({
    queryKey: ['genres'],
    queryFn: async () => {
      const result = await getGenges();
      return result.match(
        (data) => data.map((el: Genre) => ({ value: el, label: el })),
        (error) => { throw error; }
      );
    },
  });
};