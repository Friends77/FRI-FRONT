import { useSocialLogin } from '@/hooks/auth/useSocialLogin';

import { useEffect } from 'react';
import { useLocation } from 'react-router';

const GoogleLoginCallback = () => {
  const location = useLocation();

  const { mutate: sendSocialToken } = useSocialLogin();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    const code = searchParams.get('code');

    if (code) {
      sendSocialToken({ code, provider: 'GOOGLE' });
    }
  }, [location.search, sendSocialToken]);

  return <></>;
};

export default GoogleLoginCallback;
