import { getCookie, setCookie } from "@/utils/cookie";
import axios, { AxiosInstance } from "axios";
import { refresh } from "@/apis/auth";
import { AUTH_PATH } from "@/constants/routes";
import { getTokenExpDate } from "@/utils/token";

const apiUrl = import.meta.env.VITE_API_URL;

const authInstance: AxiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 15000,
  withCredentials: true,
});

authInstance.interceptors.request.use((config) => {
  const accessToken = getCookie("accessToken");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

authInstance.interceptors.response.use(
  (response) => response,
  async (err) => {
    const {
      config,
      response: { status },
    } = err;

    // 권한이 필요한 api 요청에서 access token 에러가 발생하는 경우
    if (status === 401) {
      try {
        const { accessToken } = await refresh();
        const expirationDate = getTokenExpDate(accessToken);

        setCookie("accessToken", accessToken, {
          expires: expirationDate,
        });
        config.headers.Authorization = `Bearer ${accessToken}`;

        return axios(config);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const { status } = err;

          // 리프레시 요청에서도 에러가 발생하는 경우는 로그인 페이지로 이동
          if (status === 400 || status === 401) {
            window.location.href = AUTH_PATH.LOGIN;
            return;
          }
        }

        return Promise.reject(err);
      }
    }

    return Promise.reject(err);
  }
);

export default authInstance;
