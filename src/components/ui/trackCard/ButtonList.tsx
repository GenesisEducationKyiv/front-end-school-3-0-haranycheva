"use client";

import useModalStore from "@/store/modalStore";
import { AudioInfo, Track } from "@/types";
import { ActionButton } from "./ActionButton";
import { Track } from "@/types";

type ButtonListProps = {
  track: Track;
  audioFile: string | undefined
}

export default function ButtonList({ track, audioFile } : ButtonListProps) {
  const openModal = useModalStore((state) => state.openModal);

  const handleDelete = () => {
    openModal("delete", track);
  };

  const handleEdit = () => {
    openModal("edit", track);
  };

  const handleFileInteraction = () => {
    openModal("file", {id: track.id, audioFile});
  };

  return (
    <ul className="list-none flex justify-end gap-1">
      <li>
        <ActionButton iconName="upload" actionOnClick={handleFileInteraction} id={track.id}/>
      </li>
      <li>
        <ActionButton iconName="delete" actionOnClick={handleDelete} id={track.id}/>
      </li>
      <li>
        <ActionButton iconName="edit" actionOnClick={handleEdit} id={track.id}/>
      </li>
    </ul>
  );
}
