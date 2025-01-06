import NavBar from '@/components/layout/NavBar';
import { Outlet } from 'react-router';
import * as Styled from './WithNavBarLayout.styled';

const WithNavBarLayout = () => {
  return (
    <Styled.Wrapper>
      <NavBar />
      <Styled.Content>
        <Outlet />
      </Styled.Content>
    </Styled.Wrapper>
  );
};

export default WithNavBarLayout;
