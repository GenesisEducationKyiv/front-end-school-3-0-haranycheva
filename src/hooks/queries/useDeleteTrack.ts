import { queryClient } from '@/components/widgets/MyQueryProvider';
import { deleteTrack } from '@/api/tracks/deleteTrack';
import { useMutation } from '@tanstack/react-query';

export const useDeleteTrack = () => {
  return useMutation({
    mutationFn: (id: string) => deleteTrack(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tracks'] });
    },
  });
};
