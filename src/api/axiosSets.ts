import axios from "axios"

axios.defaults.baseURL= `${process.env.NEXT_PUBLIC_BASE_URL}/api/`

export default axios