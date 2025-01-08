import { useRecoilValue } from 'recoil';
import * as Styled from './SideBar.styled';
import isSideBarOpenAtom from '@/recoil/layout/isSideBarOpen';
import SideBarProfile from './SideBarProfile';
import { useLogout } from '@/hooks/auth/useLogout';
import SideBarSearchInput from './SideBarSearchInput';

const SideBar = () => {
  const isSideBarOpen = useRecoilValue(isSideBarOpenAtom);

  const { mutate } = useLogout();

  return (
    <Styled.Wrapper $isOpen={isSideBarOpen}>
      <SideBarProfile />
      <SideBarSearchInput />
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
