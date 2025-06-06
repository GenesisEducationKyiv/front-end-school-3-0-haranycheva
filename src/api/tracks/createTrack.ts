import { ApiResult, Track, TrackData } from "@/types";
import axios from "../axiosSets";

export const createTrack = async (data: TrackData): Promise<Track> => {
    const res = await axios.post("tracks", data)
    return res.data
};
