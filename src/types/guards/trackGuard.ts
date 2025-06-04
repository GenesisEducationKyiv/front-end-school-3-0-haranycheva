import { Track } from "../models";

export const isTrack = (val: unknown): val is Track => {
    return !!val && typeof val === 'object' && 'id' in val && 'artist' in val && 'title' in val;
  };