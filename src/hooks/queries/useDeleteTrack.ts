import { deleteTrack } from '@/api/tracks/deleteTrack';
import { useMutation } from '@tanstack/react-query';
import { useInvalidateTracks } from './useInvalidateQueries';

export const useDeleteTrack = () => {
  return useMutation({
    mutationFn: (id: string) => deleteTrack(id),
    onSuccess: useInvalidateTracks(),
  });
};
