import { Track } from "@/types";
import { summonToast } from "../summonToast";
import { pushFile } from "@/api/tracks/pushFile";


export const handleUpdate = (
  id: string,
  list: Track[],
  formData: globalThis.FormData,
  setTrackList: (tracks: Track[]) => void 
): void => {
      summonToast(pushFile, [id, formData], {
        loading: 'Updating audio...',
        success: 'Audio updated!',
      }).then((result) => {
        result.match(
          (updatedTrack) => {
            setTrackList(
              list.map((track) =>
                track.id === updatedTrack.id ? updatedTrack : track
              )
            );
          },
          (error) => {
            console.error('Failed to update file', error);
          }
        );
      });
};
