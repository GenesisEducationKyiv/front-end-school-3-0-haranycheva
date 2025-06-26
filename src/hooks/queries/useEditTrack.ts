import { editTrack } from '@/api/tracks/editTrack';
import { TrackData } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useEditTrack = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: TrackData }) =>
      editTrack(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tracks'] });
    },
  });
};
