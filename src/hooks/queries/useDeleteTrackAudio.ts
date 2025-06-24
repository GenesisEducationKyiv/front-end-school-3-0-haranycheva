import { deleteFile } from '@/api/tracks/deleteFile';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteTrackAudio = () => {
     const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteFile(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tracks'] });
    },
  });
};
