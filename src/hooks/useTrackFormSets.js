import { summonToast } from '@/helpers/summonToast';
import trackSchema from '@/schemas/createTrackSchemas';
import useModalStore from '@/store/modalStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useGenres } from './useGenres';
import useTrackStore from '@/store/tracksStore';
import { createTrack } from '@/api/tracks/createTrack';
import { editTrack } from '@/api/tracks/editTrack';

export const useTrackFormSets = (type, defaults) => {

  const defaultValues = {
    title: defaults?.title,
    artist: defaults?.artist,
    album: defaults?.album || '',
    genres: defaults?.genres.map((el) => ({ value: el, label: el })),
    coverImage: defaults?.coverImage || '',
  };

  const closeModal = useModalStore((state) => state.closeModal);
  const list = useTrackStore((state) => state.tracks);
  const setTrackList = useTrackStore((state) => state.setTracks);
  const setLoading = useTrackStore((state) => state.setLoading);

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm({
    defaultValues,
    resolver: zodResolver(trackSchema, { async: true }),
  });

  const submit = async (data) => {
    data.genres = data.genres.map(({ value }) => value);
    closeModal();
    setLoading(true);
    const toastMessage =
      type === 'edit'
        ? summonToast(editTrack, [defaults.id, data], {
            loading: 'Editing your track...',
            success: 'Track is edited',
          }).then((result) => {
            setTrackList(
              list.map((track) => (track.id === result.id ? result : track))
            );
          })
        : summonToast(createTrack, [data], {
            loading: 'Creating track...',
            success: 'Track created!',
          }).then((result) => {
            setTrackList([result, ...list]);
            reset();
          });
    toastMessage
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };
  return { submit, register, handleSubmit, control, errors };
};
