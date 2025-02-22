import { logout } from '@/apis/auth';
import { AUTH_PATH } from '@/constants/routes';
import accessTokenAtom from '@/recoil/auth/accessToken';

import { useMutation } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';
import { useRecoilValue } from 'recoil';

export const useLogout = () => {
  const accessToken = useRecoilValue(accessTokenAtom);

  const [, , removeCookie] = useCookies(['isLoggedIn', 'refreshToken']);

  return useMutation({
    mutationFn: () => logout(accessToken!),
    onSuccess: () => {
      removeCookie('isLoggedIn');
      removeCookie('refreshToken');

      window.location.href = AUTH_PATH.LOGIN;
    },
  });
};
