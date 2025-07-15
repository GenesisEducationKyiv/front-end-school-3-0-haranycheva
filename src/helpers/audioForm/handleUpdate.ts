import { Track } from '@/types';
import { summonToast } from '../summonToast';
import { pushFile } from '@/api/tracks/pushFile';
import { UseMutateAsyncFunction } from '@tanstack/react-query';
import { Result } from 'neverthrow';

type updateAudioArgs = { id: string; formData: FormData };
type updateAudioFn = UseMutateAsyncFunction<
  Result<Track, Error>,
  unknown,
  updateAudioArgs,
  unknown
>;

export const handleUpdate = async (
  id: string,
  formData: globalThis.FormData,
  updateAudio: updateAudioFn
): Promise<void> => {
  await summonToast(() => updateAudio({ id, formData }), [], {
    loading: 'Uploading audio...',
    success: 'Audio uploaded!',
  });
};
