import {
  ArrowUpTrayIcon,
  TrashIcon,
  PencilSquareIcon,
  CursorArrowRaysIcon,
} from '@heroicons/react/24/outline';

type ActionButtonProps = {
  iconName: 'delete' | 'edit' | 'upload' | undefined;
  actionOnClick: () => void;
  id: string;
};

const icons = {
  delete: TrashIcon,
  edit: PencilSquareIcon,
  upload: ArrowUpTrayIcon,
};

export const ActionButton = ({
  iconName,
  actionOnClick,
  id,
}: ActionButtonProps) => {
  const IconComponent =
    iconName && icons[iconName] ? icons[iconName] : CursorArrowRaysIcon;

  return (
    <button
      onClick={actionOnClick}
      type="button"
      className="cursor-pointer p-1 pb-0 bg-blue-500 rounded-[5px]"
      data-testid={`${iconName ?? 'action'}-track-${id}`}
    >
      <IconComponent className="h-5 w-5 text-almond" />
    </button>
  );
};
