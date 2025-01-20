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
import SideBarFriendList from './SideBarFriendList';
import SideBarFriendListSkeleton from './SideBarFriendListSkeleton';

const SideBar = () => {
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  const isSideBarOpen = useRecoilValue(isSideBarOpenAtom);

  return (
    <Styled.Wrapper $isOpen={isSideBarOpen}>
      {isLoggedIn ? (
        <>
          <SideBarHeader />
          <SideBarSearchInput />
          <Styled.Container>
            <Suspense fallback={<SideBarFriendListSkeleton />}>
              <SideBarFriendList />
            </Suspense>
            <Suspense fallback={<SideBarChatListSkeleton />}>
              <SideBarChatList />
            </Suspense>
          </Styled.Container>
        </>
      ) : (
        <SideBarWithoutAuth />
      )}
    </Styled.Wrapper>
  );
};

export default SideBar;
