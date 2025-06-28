import { ApiResult, Genre } from '@/types';
import axios from '../axiosSets';
import { err, ok } from 'neverthrow';
import { API_ENDPOINTS } from '../apiEndpoints';

export const getGenres = async (): ApiResult<Genre[]> => {
  try {
    const res = await axios.get(API_ENDPOINTS.GENRES);
    return ok(res.data);
  } catch (error: any) {
    return err(error);
  }
};
