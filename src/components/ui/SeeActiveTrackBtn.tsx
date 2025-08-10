"use client"

import useModalStore from '@/store/modalStore';
import { buttonClass } from '@/style/classes/button';

export const SeeActiveTrackBtn = () => {
  const openModal = useModalStore((state) => state.openModal);
  return (
    <button
      data-testid="create-track-button"
      className={`${buttonClass}`}
      onClick={() => {
        openModal('showActive');
      }}
    >
      See Active Track
    </button>
  );
};

