import { useRecoilValue } from 'recoil';
import * as Styled from './SideBar.styled';
import isSideBarOpenAtom from '@/recoil/layout/isSideBarOpen';
import Header from './Header';
import SearchInput from './SearchInput';
import ChatList from './ChatList';
import { Suspense } from 'react';
import ChatListSkeleton from './ChatListSkeleton';
import WithoutAuth from './WithoutAuth';
import FriendList from './FriendList';
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
          <Header />
          <FormProvider {...methods}>
            <SearchInput />
            <Styled.Container>
              <Suspense fallback={<ChatListSkeleton />}>
                <FriendList />
                <ChatList />
              </Suspense>
            </Styled.Container>
          </FormProvider>
        </>
      ) : (
        <WithoutAuth />
      )}
    </Styled.Wrapper>
  );
};

export default SideBar;
