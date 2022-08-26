import axios, { AxiosRequestConfig } from "axios";

const baseURL = "https://randomuser.me/api"; // I'm not using process.env just because it's a test

const headers: AxiosRequestConfig["headers"] = {};

const API = axios.create({ baseURL, headers });

API.interceptors.request.use((config) => {
    if (config.headers === undefined) {
        config.headers = {};
    }

    config.headers["Content-Type"] = "application/json";

    return config;
});

export default API;
