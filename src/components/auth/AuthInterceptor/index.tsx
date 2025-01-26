import AuthAxios from '@/apis/@core/authInstance';
import { AUTH_ERROR_MSG } from '@/constants/message';
import { AUTH_PATH } from '@/constants/routes';
import { useRefresh } from '@/hooks/auth/useRefresh';
import accessTokenAtom from '@/recoil/auth/accessToken';
import axios from 'axios';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface IAuthInterceptorProps {
  children: React.ReactNode;
}

/**
 * @AuthInterceptor
 *  @사용목적
 *      1) AuthInstance의 interceptor 설정
 *  @주요기능
 *      1) API 요청 헤더에 토큰 추가
 *      2) 401에러가 뜨는 경우 토큰 재발급(refresh) 요청
 *      3) 토큰 재발급 실패 시 로그인 페이지로 이동
 */
const AuthInterceptor = ({ children }: IAuthInterceptorProps) => {
  const accessToken = useRecoilValue(accessTokenAtom);
  const { mutateAsync: refresh } = useRefresh();

  const requestInterceptor = AuthAxios.interceptors.request.use((config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  });

  const responseInterceptor = AuthAxios.interceptors.response.use(
    (response) => response,
    async (err) => {
      const {
        config,
        response: { status, data },
      } = err;

      // 권한이 필요한 api 요청에서 access token 에러가 발생하는 경우
      if (status === 401) {
        if (data?.code === -11002) {
          return Promise.reject(err);
        }

        try {
          const { accessToken } = await refresh();
          config.headers.Authorization = `Bearer ${accessToken}`;

          return axios(config);
        } catch (err) {
          alert(AUTH_ERROR_MSG.SESSION_EXPIRED);
          window.location.href = `${BASE_URL}${AUTH_PATH.LOGIN}`;
        }
      }

      return Promise.reject(err);
    },
  );

  // 언마운트될 때 interceptor 제거
  useEffect(() => {
    return () => {
      AuthAxios.interceptors.request.eject(requestInterceptor);
      AuthAxios.interceptors.response.eject(responseInterceptor);
    };
  }, [responseInterceptor, requestInterceptor]);

  return <>{children}</>;
};

export default AuthInterceptor;
