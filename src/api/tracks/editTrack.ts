import { Track, TrackData } from "@/types";
import axios from "../axiosSets";
import { API_ENDPOINTS } from "../apiEndpoints";

export const editTrack = async (id: string, track: TrackData) : Promise<Track> => {
    const res = await axios.put(`${API_ENDPOINTS.TRACKS}/${id}`, track)
    return res.data
};
