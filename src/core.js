import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const API_URL = "https://notes-backend-production-5d4d.up.railway.app";  // Always use deployed backend

const core = axios.create({
    baseURL: API_URL,
});

core.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default core;
