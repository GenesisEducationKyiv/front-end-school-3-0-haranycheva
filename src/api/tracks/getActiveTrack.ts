import { API_ENDPOINTS } from "../apiEndpoints";
import axios from "../axiosSets";

export const getActiveTrack = async() => {
    const res = await axios.get(API_ENDPOINTS.ACTIVE_TRACK)
    return res.data
};
