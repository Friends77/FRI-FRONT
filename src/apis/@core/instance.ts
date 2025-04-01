import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  timeout: 15000,
  withCredentials: true,
});

export default instance;
