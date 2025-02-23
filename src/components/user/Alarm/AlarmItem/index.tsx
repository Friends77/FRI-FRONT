import { formatTimeAgo } from '@/utils/date';
import * as Styled from './AlarmItem.styled';
import { AlarmType, IAlarmItem } from '@/types/user';
import ProfileImage from '@/components/@common/ProfileImage';
import useAcceptFriendRequest from '@/hooks/user/useAcceptFriendRequest';
import useRejectFriendRequest from '@/hooks/user/useRejectFriendRequest';
import useAcceptChatRoomInvitation from '@/hooks/chat/useAcceptChatRoomInvitation';
import useRejectChatRoomInvitation from '@/hooks/chat/useRejectChatRoomInvitation';
import { forwardRef, useEffect, useState } from 'react';
import { IUserProfile } from '@/types/@common';
import useGetProfile from '@/hooks/@common/useGetProfile';
import ProfileDialog from '@/components/@common/Modal/ProfileDialog';
import { useNavigate } from 'react-router';
import { CHAT_PATH } from '@/constants/routes';

interface IAlarmItemProps {
  alarm: IAlarmItem;
}

const AlarmItem = forwardRef<HTMLLIElement, IAlarmItemProps>(
  ({ alarm }: IAlarmItemProps, ref) => {
    const navigate = useNavigate();

    const { mutate: acceptFriendRequest } = useAcceptFriendRequest();

    const { mutate: rejectFriendRequest } = useRejectFriendRequest();

    const { mutate: acceptChatRoomInvitation } = useAcceptChatRoomInvitation({
      onSuccessHandler: () => {
        navigate(`${CHAT_PATH.CHAT_ROOM_PATH}/${alarm.invitedChatRoomId}`);
      },
    });

    const { mutate: rejectChatRoomInvitation } = useRejectChatRoomInvitation();

    const [isOpenProfile, setIsOpenProfile] = useState(false);

    const [selectedProfileId, setSelectedProfileId] = useState<number | null>(
      null,
    );

    const [selectedProfile, setSelectedProfile] = useState<IUserProfile | null>(
      null,
    );

    const { data: userProfile } = useGetProfile(selectedProfileId);

    const handleOpenProfile = (memberId: number) => {
      setSelectedProfileId(memberId);
      setIsOpenProfile(true);
    };

    const handleCloseProfile = () => {
      setSelectedProfileId(null);
      setSelectedProfile(null);
      setIsOpenProfile(false);
    };

    const handleAccept = (type: AlarmType, alarmId: number) => {
      if (type === AlarmType.FRIEND_REQUEST) {
        acceptFriendRequest(alarmId);
      }

      if (type === AlarmType.CHAT_ROOM_INVITATION) {
        acceptChatRoomInvitation(alarmId);
      }
    };

    const handleReject = (type: AlarmType, alarmId: number) => {
      if (type === AlarmType.FRIEND_REQUEST) {
        rejectFriendRequest(alarmId);
      }

      if (type === AlarmType.CHAT_ROOM_INVITATION) {
        rejectChatRoomInvitation(alarmId);
      }
    };

    useEffect(() => {
      if (userProfile) {
        setSelectedProfile(userProfile);
      }
    }, [userProfile]);

    return (
      <>
        {isOpenProfile && selectedProfile && (
          <ProfileDialog
            profile={selectedProfile}
            onClose={handleCloseProfile}
          />
        )}
        <Styled.AlarmItem ref={ref}>
          <Styled.Time>{formatTimeAgo(alarm.createdAt)}</Styled.Time>
          <Styled.ContentContainer>
            {alarm.type === AlarmType.FRIEND_REQUEST ? (
              <Styled.ShowProfileButton
                type="button"
                onClick={() => handleOpenProfile(alarm.senderId)}
              >
                <ProfileImage
                  size={40}
                  src={alarm.senderProfileImage}
                  alt={alarm.nickname}
                />
              </Styled.ShowProfileButton>
            ) : (
              <ProfileImage
                size={40}
                src={alarm.senderProfileImage}
                alt={alarm.nickname}
              />
            )}

            <div>
              <Styled.Content>
                <Styled.Nickname>
                  {alarm.nickname}
                  {`(${alarm.id})`}
                </Styled.Nickname>
                {alarm.type === AlarmType.FRIEND_REQUEST
                  ? '님이 친구 추가 요청을 보냈어요'
                  : '에서 나를 초대했어요'}
              </Styled.Content>
              <Styled.ButtonContainer>
                <Styled.RejectButton
                  type="button"
                  onClick={() => handleReject(alarm.type, alarm.id)}
                >
                  거절
                </Styled.RejectButton>
                <Styled.AcceptButton
                  type="button"
                  onClick={() => handleAccept(alarm.type, alarm.id)}
                >
                  수락
                </Styled.AcceptButton>
              </Styled.ButtonContainer>
            </div>
          </Styled.ContentContainer>
        </Styled.AlarmItem>
      </>
    );
  },
);

export default AlarmItem;
