import { TrackData } from "@/types";
import axios from "../axiosSets";

export const createTrack = async (data: TrackData) => {
    const res = await axios.post("tracks", data)
    return res.data
};
