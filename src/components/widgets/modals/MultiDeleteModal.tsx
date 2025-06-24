import { buttonClass } from "@/style/classes/button";
import { textClass } from "@/style/classes/text";
import { summonToast } from "@/helpers/summonToast";
import useModalStore from "@/store/modalStore";
import { useMultiDeleteTracks } from "@/hooks/queries/useMultiDeleteTracks";

type MultiDeleteModalProps = {
  defaults: string[];
};

export default function MultiDeleteModal({ defaults } : MultiDeleteModalProps) {
  const closeModal = useModalStore((state) => state.closeModal);
  const { mutateAsync: deleteTracks } = useMultiDeleteTracks();

  const handleDelete = async () => {
    await summonToast(deleteTracks, [defaults], {
      loading: "Deleting tracks...",
      success: "Tracks deleted",
    });
    closeModal();
  };

  return (
    <div data-testid="confirm-dialog">
      <h3 className={`${textClass}`}>
        Are you sure that you wanna delete all these tracks?
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
