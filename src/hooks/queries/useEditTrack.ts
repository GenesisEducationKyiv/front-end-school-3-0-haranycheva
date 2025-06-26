import { editTrack } from '@/api/tracks/editTrack';
import { TrackData } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { useInvalidateTracks } from './useInvalidateQueries';

export const useEditTrack = () => {
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: TrackData }) =>
      editTrack(id, payload),
    onSuccess: useInvalidateTracks(),
  });
};
