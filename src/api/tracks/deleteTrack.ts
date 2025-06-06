import axios from '../axiosSets';

export const deleteTrack = async (id: string): Promise<void> => {
  await axios.delete(`tracks/${id}`);
};
