import { useRecoilValue } from 'recoil';
import * as Styled from './SideBar.styled';
import isSideBarOpenAtom from '@/recoil/layout/isSideBarOpen';

const SideBar = () => {
  const isSideBarOpen = useRecoilValue(isSideBarOpenAtom);

  return <Styled.Wrapper $isOpen={isSideBarOpen}>SideBar</Styled.Wrapper>;
};

export default SideBar;
