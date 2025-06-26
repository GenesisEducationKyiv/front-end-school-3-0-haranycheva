import axios from "../axiosSets";

export const getActiveTrack = async() => {
    const res = await axios.get("/active-track")
    return res.data
};
