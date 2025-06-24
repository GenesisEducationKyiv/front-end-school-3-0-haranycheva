// useCreateTrack.ts
import { useMutation } from '@tanstack/react-query';
import { createTrack } from '@/api/tracks/createTrack';
import { queryClient } from '@/components/widgets/MyQueryProvider';

export const useCreateTrack = () => {
  return useMutation({
    mutationFn: createTrack,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tracks'] });
    },
  });
};
