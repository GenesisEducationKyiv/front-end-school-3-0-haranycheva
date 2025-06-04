import { SelectedStore } from '@/types';
import { create } from 'zustand';

const useSelectedStore = create<SelectedStore>(set => ({
  selected: [],
  ableSelect: false,
  setAbleSelect: (ableSelect) => set({ableSelect, selected: []}),
  setSelected: (selected) => set({selected})
}));

export default useSelectedStore;
