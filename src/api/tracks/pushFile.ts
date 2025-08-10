import { ApiResult, Track } from '@/types';
import axios from '../axiosSets';
import { ok, err } from 'neverthrow';
import { API_ENDPOINTS } from '../apiEndpoints';

export const pushFile = async (id: string, data: FormData): ApiResult<Track> => {
  try {
    const res = await axios.post<Track>(`${API_ENDPOINTS.TRACKS}/${id}/upload`, data);
    return ok(res.data);
  } catch (error: any) {
    return err(error);
  }
};
