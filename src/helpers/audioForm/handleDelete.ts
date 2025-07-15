import { UseMutateAsyncFunction } from '@tanstack/react-query';
import { summonToast } from '../summonToast';
import { Track } from '@/types';
import { Result } from 'neverthrow';

type DeleteAudioFn = UseMutateAsyncFunction<
  Result<Track, Error>,
  unknown,
  string,
  unknown
>;

export const handleDelete = async (
  id: string,
  deleteAudio: DeleteAudioFn
): Promise<void> => {
  await summonToast(() => deleteAudio(id), [], {
    loading: 'Removing audio...',
    success: 'Audio removed!',
  });
};
