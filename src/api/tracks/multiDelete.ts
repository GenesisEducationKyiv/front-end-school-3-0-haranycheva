import { API_ENDPOINTS } from "../apiEndpoints";
import axios from "../axiosSets";

type MultiDeleteResult = {
  success: string[];
  failed: string[];
};


export const multiDelete = async (ids: string[]) : Promise<MultiDeleteResult> => {
    const res = await axios.post(`${API_ENDPOINTS.TRACKS}/delete`, {ids})
    return res.data
};
