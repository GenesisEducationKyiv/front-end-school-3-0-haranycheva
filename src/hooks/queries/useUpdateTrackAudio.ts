import { pushFile } from '@/api/tracks/pushFile';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateTrackAudio = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      pushFile(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tracks'] });
    },
  });
};
