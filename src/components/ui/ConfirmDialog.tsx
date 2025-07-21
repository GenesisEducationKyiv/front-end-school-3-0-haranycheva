import useModalStore from '@/store/modalStore';
import { buttonClass } from '@/style/classes/button';
import { textClass } from '@/style/classes/text';

type ConfirmDialogProps = {
    aprovedFn: () => void, 
    question: string
}

export const ConfirmDialog = ({ aprovedFn, question =  "Are you sure?" }: ConfirmDialogProps) => {
  const closeModal = useModalStore((state) => state.closeModal);
  return (
    <div data-testid="confirm-dialog">
      <h3 className={`${textClass}`}>
        {question}
      </h3>
      <ul className="flex mt-15 gap-10">
        <li>
          <button
            className={`${buttonClass}`}
            onClick={aprovedFn}
            type="button"
            data-testid="confirm-delete"
          >
            Yes
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
};
