import { editTrack } from '@/api/tracks/editTrack';
import { summonToast } from '../summonToast';
import { Track, TrackData } from '@/types';

export const handleEdit = async (
  id: string,
  payload: TrackData,
  list: Track[],
  setTrackList: (tracks: Track[]) => void
): Promise<void> => {
  const result = await summonToast(editTrack, [id, payload], {
    loading: 'Editing your track...',
    success: 'Track is edited',
  });
  setTrackList(list.map((track) => (track.id === result.id ? result : track)));
};
