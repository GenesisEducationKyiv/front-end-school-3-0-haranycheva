'use client';

import useModalStore from '@/store/modalStore';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { isAudioInfo, isStringArray, isTrack, ModalStore } from '@/types';
import { JSX, useMemo } from 'react';
import dynamic from 'next/dynamic';

const TrackForm = dynamic(() => import('../widgets/modals/TrackForm'));
const UploadFileForm = dynamic(() => import('@/components/widgets/modals/UploadFileForm'));
const DeleteTrackModal = dynamic(() => import('@/components/widgets/modals/DeleteTrackModal'));
const MultiDeleteModal = dynamic(() => import('@/components/widgets/modals/MultiDeleteModal'));

type ModalType = "create" | "edit" | "file" | "delete" | "deleteMulti"

export default function ModalWrapper() {
  const closeModal = useModalStore((state) => state.closeModal);
  const modalType = useModalStore((state) => state.type);
  const defaults = useModalStore((state) => state.info);


 const modalComponents: Record<ModalType, (() => JSX.Element | null) | undefined> = useMemo(() => ({
    create: () => <TrackForm type="create" defaults={null} />,
    edit: isTrack(defaults) ? () => <TrackForm type="edit" defaults={defaults} /> : undefined,
    file: isAudioInfo(defaults) ? () => <UploadFileForm defaults={defaults} /> : undefined,
    delete: isTrack(defaults) ? () => <DeleteTrackModal defaults={defaults} /> : undefined,
    deleteMulti: isStringArray(defaults) ? () => <MultiDeleteModal defaults={defaults} /> : undefined,
  }), [defaults]);

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
          className="absolute top-2 right-2 text-xl cursor-pointer"
          onClick={closeModal}
        >
          <XCircleIcon className="h-8 w-8 text-blue-400" />
        </button>

        {modalType && modalComponents[modalType]?.()}
      </div>
    </div>
  ) : null;
}
