import { useRecoilValue, useSetRecoilState } from 'recoil';
import * as Styled from './SideBar.styled';
import isSideBarOpenAtom from '@/recoil/layout/isSideBarOpen';
import SideBarHeader from './SideBarHeader';
import SideBarSearchInput from './SideBarSearchInput';
import isLoggedInAtom from '@/recoil/auth/isLoggedIn';
import SideBarChatList from './SideBarChatList';
import { Suspense, useEffect } from 'react';
import SideBarChatListSkeleton from './SideBarChatListSkeleton';
import SideBarWithoutAuth from './SideBarWithoutAuth';
import SideBarFriendList from './SideBarFriendList';
import { FormProvider, useForm } from 'react-hook-form';
import useGetMyChatList from '@/hooks/chat/useGetMyChatList';
import socketConnectedAtom from '@/recoil/chat/socketConnected';
import { useGetSecondaryToken } from '@/hooks/chat/useGetSecondaryToken';
import useAlarmWebSocket from '@/hooks/user/useAlarmWebSocket';
import chatRoomListAtom from '@/recoil/chat/roomList';

const SideBar = () => {
  const isLoggedIn = useRecoilValue(isLoggedInAtom);

  const isSideBarOpen = useRecoilValue(isSideBarOpenAtom);

  const { data: tokenResponse } = useGetSecondaryToken(!!isLoggedIn);

  const setSocketConnected = useSetRecoilState(socketConnectedAtom);

  useEffect(() => {
    if (tokenResponse) {
      setSocketConnected(true);
    }
  }, [tokenResponse]);

  // useChatWebSocket(tokenResponse);
  useAlarmWebSocket(tokenResponse);

  const methods = useForm<{ keyword: string }>();

  const { data: chatListResponse } = useGetMyChatList();

  const setChatRoomList = useSetRecoilState(chatRoomListAtom);

  useEffect(() => {
    if (chatListResponse) {
      setChatRoomList(chatListResponse);
    }
  }, [chatListResponse]);

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
