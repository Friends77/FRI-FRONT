import { useGoogleLogin } from '@react-oauth/google';
import { useId } from 'react';
import * as Styled from './SocialLoginForm.styled';
import GoogleLogin from '@/components/@common/SVG/Icon/GoogleLogin';
import NaverLogin from '@/components/@common/SVG/Icon/NaverLogin';

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
      <Styled.SocialLoginFormHeader>
        SNS 연동 로그인
      </Styled.SocialLoginFormHeader>
      <Styled.SocialLoginFormContent>
        <li>
          <button type="button" onClick={handleGoogleLogin}>
            <GoogleLogin title="구글 로그인" width="48" height="48" />
          </button>
        </li>
        <li>
          <button type="button" onClick={handleNaverLogin}>
            <NaverLogin title="네이버 로그인" width="48" height="48" />
          </button>
        </li>
      </Styled.SocialLoginFormContent>
    </>
  );
};

export default SocialLoginForm;
