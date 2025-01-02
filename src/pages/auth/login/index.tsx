import LoginForm from '@/components/auth/Form/LoginForm';
import SocialLoginForm from '@/components/auth/Form/SocialLoginForm';
import * as Styled from './LoginPage.styled';
import { AUTH_PATH } from '@/constants/routes';

const LoginPage = () => {
  return (
    <Styled.Main>
      <Styled.LoginHeader>로그인</Styled.LoginHeader>
      <LoginForm />
      <Styled.LoginOptions>
        <Styled.LoginOption to={AUTH_PATH.RESET_PASSWORD}>
          비밀번호 찾기
        </Styled.LoginOption>
        <Styled.LoginOption to={AUTH_PATH.SIGN_UP}>
          회원가입 하기
        </Styled.LoginOption>
      </Styled.LoginOptions>
      <SocialLoginForm />
    </Styled.Main>
  );
};

export default LoginPage;
