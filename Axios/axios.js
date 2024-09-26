import axios from "axios";

const instance = axios.create({
    baseURL:`https://billbackend-e41n.onrender.com/api/v1/user`,
    // baseURL:"http://localhost:5001/api/v1/user",

    withCredentials:true
})
export default instance