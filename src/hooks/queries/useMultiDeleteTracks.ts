import { useMutation } from '@tanstack/react-query';
import { multiDelete } from '@/api/tracks/multiDelete';
import { useInvalidateTracks } from './useInvalidateQueries';

export const useMultiDeleteTracks = () => {
  return useMutation({
    mutationFn: (ids: string[]) => multiDelete(ids),
    onSuccess: useInvalidateTracks()
  });
};
