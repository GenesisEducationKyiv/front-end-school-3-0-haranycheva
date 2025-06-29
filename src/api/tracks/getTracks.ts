import { type ApiResult, Filters, Track } from '@/types';
import axios from '../axiosSets';
import { err, ok } from 'neverthrow';
import { API_ENDPOINTS } from '../apiEndpoints';

export type TrackData = {
  data: Track[];
  meta: {
    limit: number;
    page: number;
    total: number;
    totalPages: number;
  };
};

export const getTracks = async (query: Filters): ApiResult<TrackData> => {
  try {
    let url = '';
    Object.entries(query).forEach(([key, value]) => {
      if (value) {
        url += `&${key}=${value}`;
      }
    });

    console.log(process.env);
    

    const res = await axios.get(`${API_ENDPOINTS.TRACKS}?limit=12${url}`);
    return ok(res.data);
  } catch (error: any) {
    return err(error);
  }
};
