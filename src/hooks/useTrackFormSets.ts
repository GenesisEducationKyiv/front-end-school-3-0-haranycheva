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
import { useMemo } from 'react';
import { handleEdit } from '@/helpers/trackForm/handleEdit';
import { handleCreate } from '@/helpers/trackForm/handleCreate';

type FormData = z.infer<typeof CreateTrackSchema>;

export const useTrackFormSets = (type: FormType, defaults: Track | null) => {
  const defaultValues = useMemo(
    () => ({
      title: defaults?.title ?? '',
      artist: defaults?.artist ?? '',
      album: defaults?.album ?? '',
      genres: defaults?.genres?.map((el) => ({ value: el, label: el })) ?? [],
      coverImage: defaults?.coverImage ?? '',
    }),
    [defaults]
  );

  const { tracks: list, setTracks: setTrackList, setLoading } = useTrackStore();
  const closeModal = useModalStore((state) => state.closeModal);

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
        handleEdit(defaults.id, payload, list, setTrackList);
      } else {
        handleCreate(payload, list, setTrackList);
      }
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      } else {
        console.error('Unknown error', e);
      }
    } finally {
      reset();
      setLoading(false);
    }
  };
  return { submit, register, handleSubmit, control, errors };
};
