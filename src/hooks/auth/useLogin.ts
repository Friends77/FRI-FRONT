import { login } from '@/apis/auth';
import { ROOT_PATH } from '@/constants/routes';
import accessTokenAtom from '@/recoil/auth/accessToken';
import isLoggedInAtom from '@/recoil/auth/isLoggedIn';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import { useSetRecoilState } from 'recoil';

interface UseLoginParams {
  /** 로그인 중 발생한 에러처리를 위한 함수 */
  loginErrorHandler: () => void;
}

export const useLogin = ({ loginErrorHandler }: UseLoginParams) => {
  const navigate = useNavigate();

  const setAccessToken = useSetRecoilState(accessTokenAtom);

  const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);

  const [, setCookie] = useCookies(['isLoggedIn']);

  return useMutation({
    mutationFn: login,
    onSuccess: ({ accessToken, refreshTokenExpiration }) => {
      const expires = new Date(refreshTokenExpiration);

      setAccessToken(accessToken);
      setIsLoggedIn(true);
      setCookie('isLoggedIn', true, {
        expires,
      });
      navigate(ROOT_PATH.ROOT);
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        const { status } = err;

        if (status === 401 || status === 404) {
          loginErrorHandler();
        }
      }
    },
  });
};
