import { logout } from '@/apis/auth';
import accessTokenAtom from '@/recoil/auth/accessToken';
import isLoggedInAtom from '@/recoil/auth/isLoggedIn';
import { useMutation } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';
import { useRecoilState, useSetRecoilState } from 'recoil';

export const useLogout = () => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom);
  const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);
  const [, , removeCookie] = useCookies(['isLoggedIn']);

  return useMutation({
    mutationFn: () => logout(accessToken || ''),
    onSuccess: () => {
      removeCookie('isLoggedIn');
      setAccessToken(null);
      setIsLoggedIn(false);
    },
  });
};
