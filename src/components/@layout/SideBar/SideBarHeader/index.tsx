import * as Styled from './SideBarHeader.styled';
import { Suspense, useEffect } from 'react';
import Notification from '@/components/@common/SVG/Icon/Notification';
import SideBarProfile from '../SideBarProfile';
import SideBarProfileSkeleton from '../SideBarProfileSkeleton';
import { useRecoilState } from 'recoil';
import Plus from '@/components/@common/SVG/Icon/Plus';
import { useNavigate } from 'react-router';
import { CHAT_PATH } from '@/constants/routes';
import useGetUnreadAlarmCount from '@/hooks/user/useGetUnreadAlarmCount';
import AlarmPopover from '@/components/user/Alarm/AlarmPopover';
import hasAlarmAtom from '@/recoil/user/hasAlarm';
import isOpenAlarmAtom from '@/recoil/user/isOpenAlarm/atom';

const SideBarHeader = () => {
  const navigate = useNavigate();

  const [hasAlarm, setHasAlarm] = useRecoilState(hasAlarmAtom);

  const [isAlarmOpen, setIsAlarmOpen] = useRecoilState(isOpenAlarmAtom);

  const { data: unreadAlarmCount } = useGetUnreadAlarmCount();

  useEffect(() => {
    if (unreadAlarmCount && unreadAlarmCount > 0) {
      setHasAlarm(true);
    }
  }, [unreadAlarmCount]);

  const handleCreateChatRoom = () => {
    navigate(CHAT_PATH.CHAT_ROOM_CREATE);
  };

  const handleToggleAlarm = () => {
    setIsAlarmOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (!isAlarmOpen) {
      setHasAlarm(false);
    }
  }, [isAlarmOpen]);

  return (
    <Styled.Wrapper>
      <Suspense fallback={<SideBarProfileSkeleton />}>
        <SideBarProfile />
      </Suspense>

      <Styled.SideBarButtonContainer>
        <Styled.SideBarButton type="button" onClick={handleCreateChatRoom}>
          <Plus title="채팅방 생성" width="32" height="32" />
        </Styled.SideBarButton>
        {isAlarmOpen && <AlarmPopover />}
        <Styled.SideBarButton type="button" onClick={handleToggleAlarm}>
          {hasAlarm && <Styled.NotificationBadge />}
          <Notification title="알림" width="32" height="32" />
        </Styled.SideBarButton>
      </Styled.SideBarButtonContainer>
    </Styled.Wrapper>
  );
};

export default SideBarHeader;
