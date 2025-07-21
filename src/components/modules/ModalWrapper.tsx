'use client';

import useModalStore from '@/store/modalStore';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { isAudioInfo, isStringArray, isTrack, ModalStore } from '@/types';
import { JSX, useMemo } from 'react';
import dynamic from 'next/dynamic';

const TrackForm = dynamic(() => import('../widgets/modals/TrackForm'));
const UploadFileForm = dynamic(
  () => import('@/components/widgets/modals/UploadFileForm')
);
const DeleteTrackModal = dynamic(
  () => import('@/components/widgets/modals/DeleteTrackModal')
);
const MultiDeleteModal = dynamic(
  () => import('@/components/widgets/modals/MultiDeleteModal')
);
const ActiveTrack = dynamic(
  () => import('@/components/widgets/tracks/ActiveTrack')
);

type ModalType =
  | 'create'
  | 'edit'
  | 'file'
  | 'delete'
  | 'deleteMulti'
  | 'showActive';

export default function ModalWrapper() {
  const closeModal = useModalStore((state) => state.closeModal);
  const modalType = useModalStore((state) => state.type);
  const defaults = useModalStore((state) => state.info);

  const modalComponents: Record<
    ModalType,
    (() => JSX.Element | null) | undefined
  > = useMemo(
    () => ({
      create: () => <TrackForm type="create" defaults={null} />,
      edit: isTrack(defaults)
        ? () => <TrackForm type="edit" defaults={defaults} />
        : undefined,
      file: isAudioInfo(defaults)
        ? () => <UploadFileForm defaults={defaults} />
        : undefined,
      delete: isTrack(defaults)
        ? () => <DeleteTrackModal defaults={defaults} />
        : undefined,
      deleteMulti: isStringArray(defaults)
        ? () => <MultiDeleteModal defaults={defaults} />
        : undefined,
      showActive: () => <ActiveTrack />,
    }),
    [defaults]
  );

  return modalType ? (
    <div
      className="fixed inset-0 bg-black bg-opacity-10 flex justify-center items-center z-50"
      onClick={closeModal}
    >
      <div
        className="bg-white px-6 pt-12  pb-6 rounded-lg w-[75vw] max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="p-3 rounded-[20px] absolute top-2 right-2 text-xl cursor-pointer bg-blue-400 shadow-[0px_4px_8px_3px_rgba(0,0,0,0.15),_0px_1px_3px_0px_rgba(0,0,0,0.3)]"
          onClick={closeModal}
        >
          <XMarkIcon className="h-5 w-5 text-white" />
        </button>

        {modalType && modalComponents[modalType]?.()}
      </div>
    </div>
  ) : null;
}
