import { refresh } from '@/apis/auth';
import { AUTH_PATH } from '@/constants/routes';
import accessTokenAtom from '@/recoil/auth/accessToken';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import { useSetRecoilState } from 'recoil';

export const useRefresh = () => {
  const navigate = useNavigate();

  const [, setCookie] = useCookies(['isLoggedIn']);
  const setAccessToken = useSetRecoilState(accessTokenAtom);

  return useMutation({
    mutationFn: refresh,
    onSuccess: ({ accessToken, refreshTokenExpiration }) => {
      const expires = new Date(refreshTokenExpiration);

      setAccessToken(accessToken);
      setCookie('isLoggedIn', true, {
        expires,
      });
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        const { status } = err;

        // 리프레시 요청에서도 에러가 발생하는 경우는 로그인 페이지로 이동
        if (status === 400 || status === 401) {
          alert('세션이 만료되었습니다. 다시 로그인해 주세요.');
          navigate(AUTH_PATH.LOGIN);
          return;
        }
      }
    },
  });
};
