import { Track, TrackData } from "@/types";
import axios from "../axiosSets";

export const editTrack = async (id: string, track: TrackData) : Promise<Track> => {
    const res = await axios.put(`tracks/${id}`, track)
    return res.data
};
