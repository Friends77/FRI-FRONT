import { useRecoilValue } from 'recoil';
import * as Styled from './SideBar.styled';
import isSideBarOpenAtom from '@/recoil/layout/isSideBarOpen';
import SideBarHeader from './SideBarHeader';
import SideBarSearchInput from './SideBarSearchInput';
import isLoggedInAtom from '@/recoil/auth/isLoggedIn';
import SideBarChatList from './SideBarChatList';
import { Suspense } from 'react';
import SideBarChatListSkeleton from './SideBarChatListSkeleton';
import SideBarWithoutAuth from './SideBarWithoutAuth';

const SideBar = () => {
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  const isSideBarOpen = useRecoilValue(isSideBarOpenAtom);

  return (
    <Styled.Wrapper $isOpen={isSideBarOpen}>
      {isLoggedIn ? (
        <>
          <SideBarHeader />
          <SideBarSearchInput />
          <Suspense fallback={<SideBarChatListSkeleton />}>
            <SideBarChatList />
          </Suspense>
        </>
      ) : (
        <SideBarWithoutAuth />
      )}
    </Styled.Wrapper>
  );
};

export default SideBar;
