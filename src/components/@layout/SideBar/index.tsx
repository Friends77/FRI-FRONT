import { useRecoilValue } from 'recoil';
import * as Styled from './SideBar.styled';
import isSideBarOpenAtom from '@/recoil/layout/isSideBarOpen';
import SideBarProfile from './SideBarProfile';
import SideBarSearchInput from './SideBarSearchInput';
import isLoggedInAtom from '@/recoil/auth/isLoggedIn';
import { useLogout } from '@/hooks/auth/useLogout';

const SideBar = () => {
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  const isSideBarOpen = useRecoilValue(isSideBarOpenAtom);

  const { mutate } = useLogout();
  return (
    <Styled.Wrapper $isOpen={isSideBarOpen}>
      <SideBarProfile />
      {isLoggedIn && (
        <>
          <SideBarSearchInput />
          {/* 친구, 채팅방 목록 */}
          <button
            onClick={() => {
              mutate();
            }}
          >
            logout
          </button>
        </>
      )}
    </Styled.Wrapper>
  );
};

export default SideBar;
