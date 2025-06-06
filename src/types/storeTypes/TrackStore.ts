import { Track } from "../models";


export interface TrackStore{
  tracks: Track[] | [];
  loading: boolean;
  setTracks: (tracks: Track[]) => void;
  setLoading: (loading: boolean) => void;
}