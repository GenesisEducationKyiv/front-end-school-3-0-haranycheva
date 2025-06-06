import { ModalStore } from '@/types';
import { create } from 'zustand';

const useModalStore = create<ModalStore>(set => ({
  type: null,
  info: null,
  openModal: (type, info = null) => set({ type, info }),
  closeModal: () => set({ type: null, info: null }),
}));

export default useModalStore;
