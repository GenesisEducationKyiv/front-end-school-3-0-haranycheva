import { Filters } from '../models';

export const isSort = (value: any): value is Filters['sort'] => {
  return ['title', 'artist', 'createdAt', 'album'].includes(value);
};

export const isOrder = (value: any): value is Filters['order'] => {
  return ['asc', 'desc'].includes(value);
};
