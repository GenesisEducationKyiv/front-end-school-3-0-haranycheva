import { buttonClass } from "@/style/classes/button";
import { textClass } from "@/style/classes/text";
import { summonToast } from "@/helpers/summonToast";

import useModalStore from "@/store/modalStore";

import { Track } from "@/types";
import { useDeleteTrack } from "@/hooks/queries/useDeleteTrack";

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
    <div data-testid="confirm-dialog">
      <h3 className={`${textClass}`}>
        Are you sure that you wanna delete this track?
      </h3>
      <ul className="flex mt-15 gap-10">
        <li>
          <button
            className={`${buttonClass}`}
            onClick={handleDelete}
            type="button"
            data-testid="confirm-delete"
          >
            Delete
          </button>
        </li>
        <li>
          <button
            className={`${buttonClass}`}
            onClick={closeModal}
            type="button"
            data-testid="cancel-delete"
          >
            Cancel
          </button>
        </li>
      </ul>
    </div>
  );
}
