import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:5000/bank/user"
})

export default api