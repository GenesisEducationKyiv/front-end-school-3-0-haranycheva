import { summonToast } from '../summonToast';
import { Track, TrackData } from '@/types';
import { createTrack } from '@/api/tracks/createTrack';

export const handleCreate = async (
  payload: TrackData,
  list: Track[],
  setTrackList: (tracks: Track[]) => void
): Promise<void> => {
        const result = await summonToast(createTrack, [payload], {
          loading: 'Creating track...',
          success: 'Track created!',
        });
        setTrackList([result, ...list]);
};
