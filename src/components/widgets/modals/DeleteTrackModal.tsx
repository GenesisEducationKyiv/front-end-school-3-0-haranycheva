import { buttonClass } from "@/style/classes/button";
import { textClass } from "@/style/classes/text";
import { summonToast } from "@/helpers/summonToast";

import useModalStore from "@/store/modalStore";

import { Track } from "@/types";
import { useDeleteTrack } from "@/hooks/queries/useDeleteTrack";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

type DeleteTrackModalProps = {
  defaults: Track
}

export default function DeleteTrackModal({ defaults } : DeleteTrackModalProps) {
  const closeModal = useModalStore((state) => state.closeModal);
  const { mutateAsync: deleteTrack } = useDeleteTrack();

  const handleDelete = async () => {
    const { id } = defaults;
    summonToast(() => deleteTrack(id), [], {
      loading: "Deleting track...",
      success: "Track deleted",
    })
    closeModal();
  };

  return (
    <ConfirmDialog
      aprovedFn={handleDelete}
      question="Are you sure that you wanna delete this track?"
    />
  );
}
