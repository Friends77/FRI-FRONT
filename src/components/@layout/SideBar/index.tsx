import { useRecoilValue } from 'recoil';
import * as Styled from './SideBar.styled';
import isSideBarOpenAtom from '@/recoil/layout/isSideBarOpen';
import SideBarHeader from './SideBarHeader';
import SideBarSearchInput from './SideBarSearchInput';
import SideBarChatList from './SideBarChatList';
import { Suspense } from 'react';
import SideBarChatListSkeleton from './SideBarChatListSkeleton';
import SideBarWithoutAuth from './SideBarWithoutAuth';
import SideBarFriendList from './SideBarFriendList';
import { FormProvider, useForm } from 'react-hook-form';
import useChatWebSocket from '@/hooks/chat/useChatWebSocket';
import useChatListMessageHandler from '@/hooks/chat/useChatListMessageHandler';
import isLoggedInAtom from '@/recoil/auth/isLoggedIn';
import useAlarmWebSocket from '@/hooks/user/useAlarmWebSocket';

const SideBar = () => {
  const isLoggedIn = useRecoilValue(isLoggedInAtom);

  const isSideBarOpen = useRecoilValue(isSideBarOpenAtom);

  useChatWebSocket();
  useAlarmWebSocket();
  useChatListMessageHandler();

  const methods = useForm<{ keyword: string }>();

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
