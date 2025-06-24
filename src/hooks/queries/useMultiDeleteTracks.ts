import { useMutation, useQueryClient } from '@tanstack/react-query';
import { multiDelete } from '@/api/tracks/multiDelete';

export const useMultiDeleteTracks = () => {
 const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (ids: string[]) => multiDelete(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tracks'],
      });
    },
  });
};
