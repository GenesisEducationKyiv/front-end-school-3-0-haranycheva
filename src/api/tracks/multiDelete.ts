import axios from "../axiosSets";

type MultiDeleteResult = {
  success: string[];
  failed: string[];
};


export const multiDelete = async (ids: string[]) : Promise<MultiDeleteResult> => {
    const res = await axios.post(`tracks/delete`, {ids})
    return res.data
};
