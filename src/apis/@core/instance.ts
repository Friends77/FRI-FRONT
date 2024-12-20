import axios, { AxiosInstance } from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const instance: AxiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 15000,
  withCredentials: true,
});

export default instance;
