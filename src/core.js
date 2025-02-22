import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

// Deployed API URL (Production)
const DEPLOYED_API_URL = "https://notes-backend-beige.vercel.app/";

// Local API URL (Development)
const LOCAL_API_URL = "http://127.0.0.1:8000";

// Check if backend is reachable; if not, use localhost
const API_URL = window.location.hostname === "localhost" ? LOCAL_API_URL : DEPLOYED_API_URL;

console.log(`Using API URL: ${API_URL}`);  // Debugging to see which URL is used

const core = axios.create({
    baseURL: API_URL.trim(), // Trim to remove accidental whitespace
});

// ✅ Attach Authorization Header
core.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default core;
