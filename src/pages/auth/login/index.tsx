import LoginForm from '@/components/auth/Form/LoginForm';
import SocialLoginForm from '@/components/auth/Form/SocialLoginForm';
import * as Styled from './LoginPage.styled';
import { AUTH_PATH, ROOT_PATH } from '@/constants/routes';
import { useRecoilValue } from 'recoil';
import isLoggedInAtom from '@/recoil/auth/isLoggedIn';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

const LoginPage = () => {
  const navigate = useNavigate();

  const isLoggedIn = useRecoilValue(isLoggedInAtom);

  useEffect(() => {
    if (isLoggedIn) {
      navigate(ROOT_PATH.ROOT);
    }
  }, [navigate, isLoggedIn]);

  return (
    <Styled.Main>
      <Styled.LoginHeader>로그인</Styled.LoginHeader>
      <LoginForm />
      <Styled.LoginOptions>
        <li>
          <Styled.LoginOption to={AUTH_PATH.RESET_PASSWORD}>
            비밀번호 찾기
          </Styled.LoginOption>
        </li>
        <li>
          <Styled.LoginOption to={AUTH_PATH.SIGN_UP}>
            회원가입 하기
          </Styled.LoginOption>
        </li>
      </Styled.LoginOptions>
      <SocialLoginForm />
    </Styled.Main>
  );
};

export default LoginPage;
