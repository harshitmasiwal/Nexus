import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://localhost:4000",
    withCredentials: true, // ✅ important
    headers : {
        'Content-Type': 'application/json'
    }
});

export default axiosClient;

