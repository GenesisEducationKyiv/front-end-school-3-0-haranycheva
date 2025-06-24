import { pushFile } from '@/api/tracks/pushFile';
import { queryClient } from '@/components/widgets/MyQueryProvider';
import { useMutation } from '@tanstack/react-query';

export const useUpdateTrackAudio = () => {
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      pushFile(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tracks'] });
    },
  });
};
