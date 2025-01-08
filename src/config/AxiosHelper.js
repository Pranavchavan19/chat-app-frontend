
import axios from "axios";

export const baseURL= "https://chat-app-backend-x9jj.onrender.com";

export const httpClient = axios.create({
    baseURL: baseURL,
});