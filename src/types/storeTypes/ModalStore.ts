import { Track } from "../models";
import { AudioInfo } from "../repeated";

type ModalType = "create" | "edit" | "file" | "delete" | "deleteMulti" | null;

export type ModalStore = {
  type: ModalType;
  info: string[] | Track | AudioInfo | null;
  openModal: (type: Exclude<ModalType, null>, info?: string[] | AudioInfo | Track | null) => void;
  closeModal: () => void;
};


