import { deleteFile } from '@/api/tracks/deleteFile';
import { queryClient } from '@/components/widgets/MyQueryProvider';
import { useMutation } from '@tanstack/react-query';

export const useDeleteTrackAudio = () => {
  return useMutation({
    mutationFn: (id: string) => deleteFile(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tracks'] });
    },
  });
};
