import { summonToast } from '@/helpers/summonToast';
import trackSchema from '@/types/models/track/CreateTrackSchema';
import useModalStore from '@/store/modalStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import useTrackStore from '@/store/tracksStore';
import { createTrack } from '@/api/tracks/createTrack';
import { editTrack } from '@/api/tracks/editTrack';
import { CreateTrackSchema, FormType, Track, type Genre } from '@/types';
import { z } from 'zod';

type FormData = z.infer<typeof CreateTrackSchema>;

export const useTrackFormSets = (type: FormType, defaults: Track | null) => {
  const defaultValues = {
    title: defaults?.title,
    artist: defaults?.artist,
    album: defaults?.album || '',
    genres: defaults?.genres.map((el: Genre) => ({ value: el, label: el })),
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
  } = useForm<FormData>({
    defaultValues,
    resolver: zodResolver(CreateTrackSchema, { async: true }),
  });

  const submit = async (data: FormData) => {
    const payload = {
      ...data,
      genres: data.genres.map(({ value }) => value),
    };
    closeModal();
    setLoading(true);
    try {
      if (type === 'edit') {
        if (!defaults) throw new Error('defaults properties are missing');
        const result = await summonToast(editTrack, [defaults.id, payload], {
          loading: 'Editing your track...',
          success: 'Track is edited',
        });
        setTrackList(
          list.map((track) => (track.id === result.id ? result : track))
        );
        reset();
      } else {
        const result = await summonToast(createTrack, [payload], {
          loading: 'Creating track...',
          success: 'Track created!',
        });
        setTrackList([result, ...list]);
        reset();
      }
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      } else {
        console.error('Unknown error', e);
      }
    } finally {
      setLoading(false);
    }
  };
  return { submit, register, handleSubmit, control, errors };
};
