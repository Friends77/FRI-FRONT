import { useSocialLogin } from '@/hooks/auth/useSocialLogin';
import { SocialType } from '@/types/auth';

import { useEffect } from 'react';
import { useLocation } from 'react-router';

const NaverLoginCallback = () => {
  const location = useLocation();

  const { mutate: sendSocialToken } = useSocialLogin();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    const code = searchParams.get('code');

    const state = searchParams.get('state');

    if (code && state) {
      sendSocialToken({ code, provider: SocialType.NAVER });
    }
  }, [location.search, sendSocialToken]);

  return <></>;
};

export default NaverLoginCallback;
