import NavBar from '@/components/@layout/NavBar';
import { Outlet } from 'react-router';
import * as Styled from './WithNavBarLayout.styled';
import { useRecoilValue } from 'recoil';
import isSideBarOpenAtom from '@/recoil/layout/isSideBarOpen';
import SideBar from '../SideBar';

const WithNavBarLayout = () => {
  const isSideBarOpen = useRecoilValue(isSideBarOpenAtom);

  return (
    <Styled.Wrapper>
      <NavBar />
      <SideBar />
      <Styled.Content $isSideBarOpen={isSideBarOpen}>
        <Outlet />
      </Styled.Content>
    </Styled.Wrapper>
  );
};

export default WithNavBarLayout;
