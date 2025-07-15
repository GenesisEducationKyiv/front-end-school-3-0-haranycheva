import { useMutation } from '@tanstack/react-query';
import { createTrack } from '@/api/tracks/createTrack';
import { useInvalidateTracks } from './useInvalidateQueries';

export const useCreateTrack = () => {
  return useMutation({
    mutationFn: createTrack,
    onSuccess: useInvalidateTracks(),
  });
};
