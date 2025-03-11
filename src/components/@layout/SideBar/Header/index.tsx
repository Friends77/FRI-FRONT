import * as Styled from './Header.styled';
import { Suspense, useEffect } from 'react';
import Notification from '@/components/@common/SVG/Icon/Notification';
import Profile from '../Profile';
import ProfileSkeleton from '../ProfileSkeleton';
import { useRecoilState } from 'recoil';
import Plus from '@/components/@common/SVG/Icon/Plus';
import { useNavigate } from 'react-router';
import { CHAT_PATH } from '@/constants/routes';
import useGetUnreadAlarmCount from '@/hooks/user/useGetUnreadAlarmCount';
import AlarmPopover from '@/components/user/Alarm/AlarmPopover';
import hasAlarmAtom from '@/recoil/user/hasAlarm';
import isOpenAlarmAtom from '@/recoil/user/isOpenAlarm/atom';

const Header = () => {
  const navigate = useNavigate();

  const [hasAlarm, setHasAlarm] = useRecoilState(hasAlarmAtom);

  const [isAlarmOpen, setIsAlarmOpen] = useRecoilState(isOpenAlarmAtom);

  const { data: unreadAlarmCount } = useGetUnreadAlarmCount();

  useEffect(() => {
    if (unreadAlarmCount && unreadAlarmCount > 0) {
      setHasAlarm(true);
    }
  }, [setHasAlarm, unreadAlarmCount]);

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
  }, [isAlarmOpen, setHasAlarm]);

  return (
    <Styled.Wrapper>
      <Suspense fallback={<ProfileSkeleton />}>
        <Profile />
      </Suspense>

      <Styled.ButtonContainer>
        <Styled.Button type="button" onClick={handleCreateChatRoom}>
          <Plus title="채팅방 생성" width="32" height="32" />
        </Styled.Button>
        {isAlarmOpen && <AlarmPopover />}
        <Styled.Button type="button" onClick={handleToggleAlarm}>
          {hasAlarm && <Styled.NotificationBadge />}
          <Notification title="알림" width="32" height="32" />
        </Styled.Button>
      </Styled.ButtonContainer>
    </Styled.Wrapper>
  );
};

export default Header;
