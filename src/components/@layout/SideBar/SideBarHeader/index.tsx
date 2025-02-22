import * as Styled from './SideBarHeader.styled';
import { Suspense } from 'react';
import Notification from '@/components/@common/SVG/Icon/Notification';
import SideBarProfile from '../SideBarProfile';
import SideBarProfileSkeleton from '../SideBarProfileSkeleton';
import { useRecoilValue } from 'recoil';
import isLoggedInAtom from '@/recoil/auth/isLoggedIn';
import Plus from '@/components/@common/SVG/Icon/Plus';
import { useNavigate } from 'react-router';
import { CHAT_PATH } from '@/constants/routes';
import { useLogout } from '@/hooks/auth/useLogout';

const SideBarHeader = () => {
  const { mutate: logout } = useLogout();

  const navigate = useNavigate();

  const isLoggedIn = useRecoilValue(isLoggedInAtom);

  const handleCreateChatRoom = () => {
    navigate(CHAT_PATH.CHAT_ROOM_CREATE);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <Styled.Wrapper>
      <Suspense fallback={<SideBarProfileSkeleton />}>
        <SideBarProfile />
      </Suspense>
      {isLoggedIn && (
        <Styled.SideBarButtonContainer>
          <button type="button" onClick={handleLogout}>
            로그아웃
          </button>
          <Styled.SideBarButton type="button" onClick={handleCreateChatRoom}>
            <Plus title="채팅방 생성" width="32" height="32" />
          </Styled.SideBarButton>
          <Styled.SideBarButton type="button">
            {/* 알림이 있는 경우 && <Styled.NotificationBadge /> */}
            <Notification title="알림" width="32" height="32" />
          </Styled.SideBarButton>
        </Styled.SideBarButtonContainer>
      )}
    </Styled.Wrapper>
  );
};

export default SideBarHeader;
