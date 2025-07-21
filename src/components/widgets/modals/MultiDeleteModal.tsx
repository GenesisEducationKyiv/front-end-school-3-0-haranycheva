import { buttonClass } from '@/style/classes/button';
import { textClass } from '@/style/classes/text';
import { summonToast } from '@/helpers/summonToast';
import useModalStore from '@/store/modalStore';
import { useMultiDeleteTracks } from '@/hooks/queries/useMultiDeleteTracks';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';

type MultiDeleteModalProps = {
  defaults: string[];
};

export default function MultiDeleteModal({ defaults }: MultiDeleteModalProps) {
  const closeModal = useModalStore((state) => state.closeModal);
  const { mutateAsync: deleteTracks } = useMultiDeleteTracks();

  const handleDelete = async () => {
    await summonToast(deleteTracks, [defaults], {
      loading: 'Deleting tracks...',
      success: 'Tracks deleted',
    });
    closeModal();
  };

  return (
    <ConfirmDialog
      aprovedFn={handleDelete}
      question="Are you sure that you wanna delete all these tracks?"
    />
  );
}
