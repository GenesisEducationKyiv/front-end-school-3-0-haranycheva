import useModalStore from '@/store/modalStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CreateTrackSchema, FormType, Track, type Genre } from '@/types';
import { z } from 'zod';
import { useMemo } from 'react';
import { useCreateTrack } from './queries/useCreateTrack';
import { useEditTrack } from './queries/useEditTrack';
import { summonToast } from '@/helpers/summonToast';

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

  const { mutateAsync: createTrack } = useCreateTrack();
  const { mutateAsync: editTrack } = useEditTrack ();
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

  try {
    if (type === 'edit') {
      if (!defaults) throw new Error('defaults properties are missing');
      await summonToast(() => editTrack({ id: defaults.id, payload }), [], {
        loading: 'Updating track...',
        success: 'Track updated',
      });
    } else if (type === 'create'){
      await summonToast(() => createTrack(payload), [], {
        loading: 'Creating track...',
        success: 'Track created',
      });
    }
    closeModal();
    reset();
  } catch (e) {
    console.error('Submit error', e);
  }
};
  return { submit, register, handleSubmit, control, errors };
};
