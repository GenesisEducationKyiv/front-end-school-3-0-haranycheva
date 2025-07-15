import { useQueryClient } from '@tanstack/react-query';

export const useInvalidateTracks = () => {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: ['tracks'] });
  };
};
