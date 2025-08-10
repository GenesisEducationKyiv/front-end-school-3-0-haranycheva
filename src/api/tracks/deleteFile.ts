import axios from "../axiosSets";
import { ok, err } from "neverthrow";
import type { ApiResult, Track } from "@/types";
import { API_ENDPOINTS } from "../apiEndpoints";

export const deleteFile = async (id: string): ApiResult<Track> => {
  try {
    const res = await axios.delete<Track>(`${API_ENDPOINTS.TRACKS}/${id}/file`);
    return ok(res.data);
  } catch (error: any) {
    return err(error);
  }
};
