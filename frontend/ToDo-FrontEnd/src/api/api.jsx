import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5106/api"
});

api.interceptors.request.use((config) =>{
    var token = localStorage.getItem("token");
    if(token)
    {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
});

export default api;
