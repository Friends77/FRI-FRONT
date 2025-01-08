import { useRecoilValue } from 'recoil';
import * as Styled from './SideBar.styled';
import isSideBarOpenAtom from '@/recoil/layout/isSideBarOpen';
import SideBarProfile from './SideBarProfile';
import { useLogout } from '@/hooks/auth/useLogout';

const SideBar = () => {
  const isSideBarOpen = useRecoilValue(isSideBarOpenAtom);

  const { mutate } = useLogout();

  return (
    <Styled.Wrapper $isOpen={isSideBarOpen}>
      <SideBarProfile />
      <button
        onClick={() => {
          mutate();
        }}
      >
        logout
      </button>
    </Styled.Wrapper>
  );
};

export default SideBar;
