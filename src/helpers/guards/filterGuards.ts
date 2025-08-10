import { Filters } from '../../types/models';

export const isSort = (value: any): value is NonNullable<Filters['sort']> => {
  return ['title', 'artist', 'createdAt', 'album'].includes(value);
};

export const isOrder = (value: any): value is NonNullable<Filters['order']> => {
  return ['asc', 'desc'].includes(value);
};
