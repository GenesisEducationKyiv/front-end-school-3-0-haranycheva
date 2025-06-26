import useModalStore from '@/store/modalStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CreateTrackSchema, FormType, Track, type Genre } from '@/types';
import { z } from 'zod';
import { useMemo } from 'react';
import { useCreateTrack } from './queries/useCreateTrack';
import { useEditTrack } from './queries/useEditTrack';
import { createTrackWithToast } from '@/helpers/trackForm/createTrackWithToast';
import { editTrackWithToast } from '@/helpers/trackForm/editTrackWithToast';

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

    if (type === 'edit') {
      if (!defaults) throw new Error('defaults properties are missing');
      editTrackWithToast(defaults.id, payload, editTrack)
    } else if (type === 'create'){
      createTrackWithToast(payload, createTrack)
    }
    closeModal();
    reset();
};
  return { submit, register, handleSubmit, control, errors };
};
