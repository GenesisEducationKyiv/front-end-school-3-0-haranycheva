// useCreateTrack.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTrack } from '@/api/tracks/createTrack';

export const useCreateTrack = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTrack,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tracks'] });
    },
  });
};
