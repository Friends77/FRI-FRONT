import { useGoogleLogin } from '@react-oauth/google';
import { useId } from 'react';

const SocialLoginForm = () => {
  const stateId = useId();
  const googleCallbackURL = import.meta.env.VITE_GOOGLE_CALLBACK_URL;

  const handleGoogleLogin = useGoogleLogin({
    flow: 'auth-code',
    ux_mode: 'redirect',
    redirect_uri: googleCallbackURL,
  });

  const handleNaverLogin = () => {
    const naverClientId = import.meta.env.VITE_NAVER_CLIENT_ID;
    const naverCallbackURL = import.meta.env.VITE_NAVER_CALLBACK_URL;
    const naverLoginUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naverClientId}&state=${stateId}&redirect_uri=${naverCallbackURL}`;

    window.location.href = naverLoginUrl;
  };

  return (
    <>
      <button type="button" onClick={handleGoogleLogin}>
        구글 로그인
      </button>
      <button type="button" onClick={handleNaverLogin}>
        네이버 로그인
      </button>
    </>
  );
};

export default SocialLoginForm;
