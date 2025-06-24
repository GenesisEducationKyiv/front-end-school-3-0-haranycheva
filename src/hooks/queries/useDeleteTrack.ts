import { deleteTrack } from '@/api/tracks/deleteTrack';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteTrack = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTrack(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tracks'] });
    },
  });
};
