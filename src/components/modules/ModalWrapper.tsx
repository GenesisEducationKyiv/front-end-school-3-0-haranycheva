"use client";

import useModalStore from "@/store/modalStore";
import { XCircleIcon } from "@heroicons/react/24/outline";
import UploadFileForm from "@/components/widgets/modals/UploadFileForm";
import DeleteTrackModal from "@/components/widgets/modals/DeleteTrackModal";
import MultiDeleteModal from "@/components/widgets/modals/MultiDeleteModal";
import TrackForm from "../widgets/modals/TrackForm";

export default function ModalWrapper() {
  const closeModal = useModalStore((state) => state.closeModal);
  const modalType = useModalStore((state) => state.type);
  const defaults = useModalStore((state) => state.info);

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

        {modalType === "create" ? <TrackForm type={"create"} /> : null}
        {modalType === "edit" ? <TrackForm type={"edit"} defaults={defaults} /> : null}
        {modalType === "file" ? <UploadFileForm defaults={defaults} /> : null}
        {modalType === "delete" ? (
          <DeleteTrackModal defaults={defaults} />
        ) : null}
        {modalType === "deleteMulti" ? (
          <MultiDeleteModal defaults={defaults} />
        ) : null}
      </div>
    </div>
  ) : null;
}
