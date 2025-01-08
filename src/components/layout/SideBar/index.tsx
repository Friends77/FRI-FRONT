import { useRecoilValue } from 'recoil';
import * as Styled from './SideBar.styled';
import isSideBarOpenAtom from '@/recoil/layout/isSideBarOpen';
import SideBarProfile from './SideBarProfile';
import SideBarSearchInput from './SideBarSearchInput';
import isLoggedInAtom from '@/recoil/auth/isLoggedIn';

const SideBar = () => {
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  const isSideBarOpen = useRecoilValue(isSideBarOpenAtom);

  return (
    <Styled.Wrapper $isOpen={isSideBarOpen}>
      <SideBarProfile />
      {isLoggedIn && (
        <>
          <SideBarSearchInput />
          {/* 친구, 채팅방 목록 */}
        </>
      )}
    </Styled.Wrapper>
  );
};

export default SideBar;
