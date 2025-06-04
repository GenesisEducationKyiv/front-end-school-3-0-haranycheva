import axios from "../axiosSets";
import { ok, err } from "neverthrow";
import type { ApiResult, Track } from "@/types";

export const deleteFile = async (id: string): ApiResult<Track> => {
  try {
    const res = await axios.delete<Track>(`tracks/${id}/file`);
    return ok(res.data);
  } catch (error: any) {
    return err(error);
  }
};
