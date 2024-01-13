import axios from "axios";
import { getToken } from "../auth";

export const BASE_URL = 'http://localhost:9092/api/v1';

///Local axios
export const myAxios = axios.create({
    baseURL:BASE_URL
});

///private axios with JWT Token
export const privateAxios = axios.create({
    baseURL:BASE_URL
});

//
privateAxios.interceptors.request.use((config) => {

    const token = getToken();

    //authenticate with token
    if (token)
    {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;

}, error => Promise.reject(error));