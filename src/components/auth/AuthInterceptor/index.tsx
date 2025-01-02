import AuthAxios from '@/apis/@core/authInstance';
import { refresh } from '@/apis/auth';
import { AUTH_PATH } from '@/constants/routes';
import accessTokenAtom from '@/recoil/auth/accessToken';
import axios from 'axios';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import { useRecoilState } from 'recoil';

interface IAuthInterceptorProps {
  children: React.ReactNode;
}

/**
 * @AuthInterceptor
 *  @사용목적
 *      1) AuthInstance의 interceptor 설정
 *  @주요기능
 *      1) API 요청 헤더에 토큰 추가
 *      2) 401에러가 뜨는 경우 refresh 요청
 */
const AuthInterceptor = ({ children }: IAuthInterceptorProps) => {
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom);
  const [, setCookie] = useCookies(['isLoggedIn']);

  const responseInterceptor = AuthAxios.interceptors.request.use((config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  });

  const requestInterceptor = AuthAxios.interceptors.response.use(
    (response) => response,
    async (err) => {
      const {
        config,
        response: { status },
      } = err;

      // 권한이 필요한 api 요청에서 access token 에러가 발생하는 경우
      if (status === 401) {
        try {
          const { accessToken, refreshTokenExpiration } = await refresh();
          const expires = new Date(refreshTokenExpiration);

          setAccessToken(accessToken);
          setCookie('isLoggedIn', true, {
            expires,
          });
          config.headers.Authorization = `Bearer ${accessToken}`;

          return axios(config);
        } catch (err) {
          if (axios.isAxiosError(err)) {
            const { status } = err;

            // 리프레시 요청에서도 에러가 발생하는 경우는 로그인 페이지로 이동
            if (status === 400 || status === 401) {
              alert('세션이 만료되었습니다. 다시 로그인해 주세요.');
              navigate(AUTH_PATH.LOGIN);
              return;
            }
          }

          return Promise.reject(err);
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
