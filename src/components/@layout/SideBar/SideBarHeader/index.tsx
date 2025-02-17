import * as Styled from './SideBarHeader.styled';
import { Suspense, useEffect, useState } from 'react';
import Notification from '@/components/@common/SVG/Icon/Notification';
import SideBarProfile from '../SideBarProfile';
import SideBarProfileSkeleton from '../SideBarProfileSkeleton';
import { useRecoilValue } from 'recoil';
import isLoggedInAtom from '@/recoil/auth/isLoggedIn';
import Plus from '@/components/@common/SVG/Icon/Plus';
import { useNavigate } from 'react-router';
import { CHAT_PATH } from '@/constants/routes';
import useGetUnreadAlarmCount from '@/hooks/user/useGetUnreadAlarmCount';
import AlarmPopover from '@/components/user/AlarmPopover';

const SideBarHeader = () => {
  const navigate = useNavigate();
  const isLoggedIn = useRecoilValue(isLoggedInAtom);

  const [hasAlarm, setHasAlarm] = useState(false);
  const [isAlarmOpen, setIsAlarmOpen] = useState(false);

  const { data: unreadAlarmCount } = useGetUnreadAlarmCount();

  useEffect(() => {
    if (unreadAlarmCount && unreadAlarmCount > 0) {
      setHasAlarm(true);
    }
  }, [unreadAlarmCount]);

  const handleCreateChatRoom = () => {
    navigate(CHAT_PATH.CHAT_ROOM_CREATE);
  };

  const handleOpenAlarm = () => {
    setIsAlarmOpen((prevState) => !prevState);
  };

  return (
    <Styled.Wrapper>
      <Suspense fallback={<SideBarProfileSkeleton />}>
        <SideBarProfile />
      </Suspense>
      {isLoggedIn && (
        <Styled.SideBarButtonContainer>
          <Styled.SideBarButton type="button" onClick={handleCreateChatRoom}>
            <Plus title="채팅방 생성" width="32" height="32" />
          </Styled.SideBarButton>
          {isAlarmOpen && <AlarmPopover />}
          <Styled.SideBarButton type="button" onClick={handleOpenAlarm}>
            {hasAlarm && <Styled.NotificationBadge />}
            <Notification title="알림" width="32" height="32" />
          </Styled.SideBarButton>
        </Styled.SideBarButtonContainer>
      )}
    </Styled.Wrapper>
  );
};

export default SideBarHeader;
