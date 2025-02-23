import * as Styled from './SideBarHeader.styled';
import { Suspense } from 'react';
import Notification from '@/components/@common/SVG/Icon/Notification';
import SideBarProfile from '../SideBarProfile';
import SideBarProfileSkeleton from '../SideBarProfileSkeleton';
import Plus from '@/components/@common/SVG/Icon/Plus';
import { useNavigate } from 'react-router';
import { CHAT_PATH } from '@/constants/routes';

const SideBarHeader = () => {
  const navigate = useNavigate();

  const handleCreateChatRoom = () => {
    navigate(CHAT_PATH.CHAT_ROOM_CREATE);
  };

  return (
    <Styled.Wrapper>
      <Suspense fallback={<SideBarProfileSkeleton />}>
        <SideBarProfile />
      </Suspense>
      <Styled.SideBarButtonContainer>
        <Styled.SideBarButton type="button" onClick={handleCreateChatRoom}>
          <Plus title="채팅방 생성" width="32" height="32" />
        </Styled.SideBarButton>
        <Styled.SideBarButton type="button">
          {/* 알림이 있는 경우 && <Styled.NotificationBadge /> */}
          <Notification title="알림" width="32" height="32" />
        </Styled.SideBarButton>
      </Styled.SideBarButtonContainer>
    </Styled.Wrapper>
  );
};

export default SideBarHeader;
