import { useRecoilValue } from 'recoil';
import * as Styled from './SideBar.styled';
import isSideBarOpenAtom from '@/recoil/layout/isSideBarOpen';
import SideBarHeader from './SideBarHeader';
import SideBarSearchInput from './SideBarSearchInput';
import isLoggedInAtom from '@/recoil/auth/isLoggedIn';
import SideBarChatList from './SideBarChatList';

const SideBar = () => {
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  const isSideBarOpen = useRecoilValue(isSideBarOpenAtom);

  return (
    <Styled.Wrapper $isOpen={isSideBarOpen}>
      <SideBarHeader />
      {isLoggedIn && (
        <>
          <SideBarSearchInput />
          <SideBarChatList />
        </>
      )}
    </Styled.Wrapper>
  );
};

export default SideBar;
