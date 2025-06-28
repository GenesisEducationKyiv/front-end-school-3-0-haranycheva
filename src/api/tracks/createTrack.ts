import { ApiResult, Track, TrackData } from "@/types";
import axios from "../axiosSets";
import { API_ENDPOINTS } from "../apiEndpoints";

export const createTrack = async (data: TrackData): Promise<Track> => {
    const res = await axios.post(API_ENDPOINTS.TRACKS, data)
    return res.data
};
