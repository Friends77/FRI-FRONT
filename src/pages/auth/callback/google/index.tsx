import { useSocialLogin } from '@/hooks/auth/useSocialLogin';
import { SocialType } from '@/types/auth';

import { useEffect } from 'react';
import { useLocation } from 'react-router';

const GoogleLoginCallback = () => {
  const location = useLocation();

  const { mutate: sendSocialToken } = useSocialLogin();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    const code = searchParams.get('code');

    if (code) {
      sendSocialToken({ code, provider: SocialType.GOOGLE });
    }
  }, [location.search, sendSocialToken]);

  return <></>;
};

export default GoogleLoginCallback;
