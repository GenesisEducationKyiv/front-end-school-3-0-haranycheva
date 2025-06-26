import { ApiResult, Genre } from '@/types';
import axios from '../axiosSets';
import { err, ok } from 'neverthrow';

export const getGenres = async (): ApiResult<Genre[]> => {
  try {
    const res = await axios.get('genres');
    return ok(res.data);
  } catch (error: any) {
    return err(error);
  }
};
