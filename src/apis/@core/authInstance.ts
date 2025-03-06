import axios, { AxiosInstance } from 'axios';

const authInstance: AxiosInstance = axios.create({
  timeout: 15000,
  withCredentials: true,
});

export default authInstance;
