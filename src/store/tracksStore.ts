import { TrackStore } from '@/types';
import { Track } from '@/types/models/track/Track';
import { create } from 'zustand';

const useTrackStore = create<TrackStore>((set) => ({
  tracks: [],
  loading: true,
  setTracks: (tracks: Track[]) => set({ tracks }),
  setLoading: (loading: boolean) => set({ loading }),
}));

export default useTrackStore;
