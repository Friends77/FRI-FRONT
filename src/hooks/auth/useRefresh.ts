import { refresh } from '@/apis/auth';
import accessTokenAtom from '@/recoil/auth/accessToken';
import { useMutation } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';
import { useSetRecoilState } from 'recoil';

export const useRefresh = () => {
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
  });
};
