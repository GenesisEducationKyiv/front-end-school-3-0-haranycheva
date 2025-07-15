import { Track } from "../models";

export type SelectedStore = {
  selected: string[];              
  ableSelect: boolean;
  setAbleSelect: (ableSelect: boolean) => void;
  setSelected: (selected: string[]) => void;
};


