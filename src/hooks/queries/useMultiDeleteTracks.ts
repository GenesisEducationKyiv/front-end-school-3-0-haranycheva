import { useMutation, useQueryClient } from '@tanstack/react-query';
import { multiDelete } from '@/api/tracks/multiDelete';
import { queryClient } from '@/components/widgets/MyQueryProvider';

export const useMultiDeleteTracks = () => {

  return useMutation({
    mutationFn: (ids: string[]) => multiDelete(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tracks'],
      });
    },
  });
};
