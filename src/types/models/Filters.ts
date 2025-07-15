export type Filters = {
  search?: string;
  artist?: string;
  genre?: string;
  sort?: 'title' | 'artist' | 'createdAt' | 'album';
  order?: 'asc' | 'desc';
  page?: number;
};
