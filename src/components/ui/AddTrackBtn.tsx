"use client";
import { buttonClass } from "@/style/classes/button";
import useModalStore from "@/store/modalStore";
import useSelectedStore from "@/store/selectedStore";

export default function AddTrackBtn() {
  const openModal = useModalStore((state) => state.openModal);
  const setAbleSelect = useSelectedStore((state) => state.setAbleSelect);
  return (
    <button
      data-testid="create-track-button"
      className={`${buttonClass}`}
      onClick={() => {
        openModal("create");
        setAbleSelect(false);
      }}
    >
      Create Track
    </button>
  );
}
