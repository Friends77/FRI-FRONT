import { AUTH_PATH } from '@/constants/routes';
import * as Styled from './WithoutAuth.styled';

const WithoutAuth = () => {
  return (
    <Styled.Container>
      <Styled.Text>
        친구목록, 채팅방을 보려면
        <br />
        로그인이 필요해요
      </Styled.Text>
      <Styled.LoginBtn to={AUTH_PATH.LOGIN}>로그인하기</Styled.LoginBtn>
    </Styled.Container>
  );
};

export default WithoutAuth;
