import { editTrack } from '@/api/tracks/editTrack';
import { queryClient } from '@/components/widgets/MyQueryProvider';
import { useMutation } from '@tanstack/react-query';

export const useEditTrack = () => {
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      editTrack(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tracks'] });
    },
  });
};
