import { buttonClass } from '@/style/classes/button';
import { summonToast } from '@/helpers/summonToast';
import { deleteFile } from '@/api/tracks/deleteFile';
import { pushFile } from '@/api/tracks/pushFile';
import useModalStore from '@/store/modalStore';
import useTrackStore from '@/store/tracksStore';
import { ArrowUpTrayIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AudioInfo, DefaultsProps, Track } from '@/types';
import { handleDelete } from '@/helpers/audioForm/handleDelete';
import { handleUpdate } from '@/helpers/audioForm/handleUpdate';

type FormData = {
  audio?: FileList;
};

type UploadFileFormProps = {
  defaults: AudioInfo;
};

export default function UploadFileForm({ defaults }: UploadFileFormProps) {
  const { register, handleSubmit, watch } = useForm<FormData>({});
  const [audioSrc, setAudioSrc] = useState(defaults?.audioFile ?? "");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const closeModal = useModalStore((state) => state.closeModal);
  const list = useTrackStore((state) => state.tracks);
  const setTrackList = useTrackStore((state) => state.setTracks);

  const watchFile = watch('audio');

  const onSubmit = async (data: FormData) => {
    if (!defaults) return;

    const file = data.audio?.[0];

    if (file) {
      const formData = new FormData();
      formData.append('audio', file);
      closeModal();
      handleUpdate(defaults.id, list, formData, setTrackList);
    } else if (!file && defaults?.audioFile) {
      closeModal();
      handleDelete(defaults.id, list, setTrackList);
    }
  };

  useEffect(() => {
    const file = watchFile?.[0];
    let blobUrl: string | null = null;

    if (file) {
      blobUrl = URL.createObjectURL(file);
      setAudioSrc(blobUrl);
    }

    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [watchFile]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        type="file"
        accept="audio/*"
        {...register('audio')}
        ref={(e: HTMLInputElement | null) => {
          register('audio').ref(e);
          fileInputRef.current = e;
        }}
        className="hidden"
      />

      <ul className="list-none flex gap-5">
        <li>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`${buttonClass} px-8`}
          >
            <ArrowUpTrayIcon className="h-5 w-5 text-almond" />
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => setAudioSrc('')}
            className={`${buttonClass} px-8 bg-red-900 hover:bg-red-950`}
          >
            <TrashIcon className="h-5 w-5 text-almond" />
          </button>
        </li>
      </ul>

      <div>
        <p className="text-xl sm:text-xl font-bold text-blue-500 ml-3   ">
          Audio
        </p>
        {audioSrc ? (
          <audio controls src={audioSrc} className="mt-2 w-[80%]" />
        ) : (
          <p className="text-xl sm:text-xl text-blue-500 ">no track audio</p>
        )}
      </div>
      <button type="submit" className={`${buttonClass}`}>
        Submit
      </button>
    </form>
  );
}
