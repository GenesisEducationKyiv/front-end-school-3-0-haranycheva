import { pushFile } from '@/api/tracks/pushFile';
import { useMutation } from '@tanstack/react-query';
import { useInvalidateTracks } from './useInvalidateQueries';

export const useUpdateTrackAudio = () => {
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      pushFile(id, formData),
    onSuccess: useInvalidateTracks()
  });
};
