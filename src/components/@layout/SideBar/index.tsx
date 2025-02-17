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
import { FormProvider, useForm } from 'react-hook-form';

const SideBar = () => {
  const isLoggedIn = useRecoilValue(isLoggedInAtom);

  const isSideBarOpen = useRecoilValue(isSideBarOpenAtom);

  const methods = useForm<{ keyword: string }>({
    defaultValues: {
      keyword: '',
    },
  });

  return (
    <Styled.Wrapper $isOpen={isSideBarOpen}>
      {isLoggedIn ? (
        <>
          <SideBarHeader />
          <FormProvider {...methods}>
            <SideBarSearchInput />
            <Styled.Container>
              <Suspense fallback={<SideBarChatListSkeleton />}>
                <SideBarFriendList />
                <SideBarChatList />
              </Suspense>
            </Styled.Container>
          </FormProvider>
        </>
      ) : (
        <SideBarWithoutAuth />
      )}
    </Styled.Wrapper>
  );
};

export default SideBar;
