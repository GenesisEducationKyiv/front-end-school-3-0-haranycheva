import { useQuery } from '@tanstack/react-query';
import { getTracks } from '@/api/tracks/getTracks';
import { Filters } from '@/types';

export const useTracks = (filters: Filters) => {
  return useQuery({
    queryKey: ['tracks', filters],
    queryFn: async () => {
      const result = await getTracks(filters);
      return result.match(
        (data) => data,
        (error) => {
          throw error;
        }
      );
    },
  });
};
