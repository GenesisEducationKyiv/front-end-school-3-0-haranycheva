import { API_ENDPOINTS } from '../apiEndpoints';
import axios from '../axiosSets';

export const deleteTrack = async (id: string): Promise<void> => {
  await axios.delete(`${API_ENDPOINTS.TRACKS}/${id}`);
};
