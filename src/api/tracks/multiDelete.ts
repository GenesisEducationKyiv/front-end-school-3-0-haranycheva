import axios from "../axiosSets";

export const multiDelete = async (ids: string[]) => {
    const res = await axios.post(`tracks/delete`, {ids})
    return res.data
};
