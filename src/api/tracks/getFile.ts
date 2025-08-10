import { API_ENDPOINTS } from "../apiEndpoints";
import axios from "../axiosSets";

export const getFile = async (id: string, name:string):  Promise<string | undefined> => {
  try {
    const res = await axios.get(`${API_ENDPOINTS.FILE}/${name}`, {
      responseType: "arraybuffer",
    });
    const audioBlob = new Blob([res.data], { type: "audio/mpeg" });
    const blobUrl = URL.createObjectURL(audioBlob);
    return blobUrl;
  } catch(err) {
    return 
  }
};
