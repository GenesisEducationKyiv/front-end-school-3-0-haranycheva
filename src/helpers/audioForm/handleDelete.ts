import { deleteFile } from '@/api/tracks/deleteFile';
import { summonToast } from '../summonToast';
import { Track } from '@/types';

export const handleDelete = (
  id: string,
  list: Track[],
  setTrackList: (tracks: Track[]) => void 
): void => {
  summonToast(deleteFile, [id], {
    loading: 'Deleting audio...',
    success: 'Audio deleted!',
  })
    .then((result) => {
      result.match(
        (updatedTrack) => {
          setTrackList(
            list.map((track) =>
              track.id === updatedTrack.id ? updatedTrack : track
            )
          );
        },
        (error) => {
          console.error('Failed to delete file', error);
        }
      );
    })
    .catch(() => {});
};
