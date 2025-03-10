import { AUTH_PATH } from '@/constants/routes';
import { useRefresh } from '@/hooks/auth/useRefresh';
import accessTokenAtom from '@/recoil/auth/accessToken';
import isLoggedInAtom from '@/recoil/auth/isLoggedIn';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import { useRecoilState } from 'recoil';

interface ITokenRefresherProps {
  children: React.ReactNode;
}

/**
 * @TokenRefresher
 *  @사용목적
 *      1) 서비스 접근 시 토큰 재발급
 *  @주요기능
 *      1) 서비스 접근 시 토큰 재발급
 *      2) 토큰 재발급(refresh) 요청 동안 로딩 처리
 *      3) 토큰 재발급 실패 시 로그인 페이지로 이동
 */
const TokenRefresher = ({ children }: ITokenRefresherProps) => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInAtom);

  const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom);

  const [isLoading, setIsLoading] = useState(isLoggedIn && !accessToken);

  const { mutateAsync } = useRefresh();

  const [, , removeCookie] = useCookies(['isLoggedIn', 'refreshToken']);

  useEffect(() => {
    if (!isLoading) return;

    const refresh = async () => {
      try {
        await mutateAsync();
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          removeCookie('isLoggedIn');
          removeCookie('refreshToken');
          navigate(AUTH_PATH.LOGIN, { replace: true });
        }
        console.log('Refresh Result:', err);
      } finally {
        setIsLoading(false);
      }
    };

    refresh();
  }, [
    isLoading,
    mutateAsync,
    navigate,
    removeCookie,
    setAccessToken,
    setIsLoggedIn,
  ]);

  if (isLoading) {
    return <div>Loading...😂</div>;
  }

  return <>{children}</>;
};

export default TokenRefresher;
