import { deleteFile } from '@/api/tracks/deleteFile';
import { useMutation } from '@tanstack/react-query';
import { useInvalidateTracks } from './useInvalidateQueries';

export const useDeleteTrackAudio = () => {
  return useMutation({
    mutationFn: (id: string) => deleteFile(id),
    onSuccess: useInvalidateTracks()
  });
};
