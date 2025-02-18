import useGetAlarmList from '@/hooks/user/useGetAlarmList';
import * as Styled from './AlarmPopover.styled';
import ProfileImage from '@/components/@common/ProfileImage';
import { useEffect } from 'react';
import { AlarmType } from '@/types/user';
import useRejectFriendRequest from '@/hooks/user/useRejectFriendRequest';
import useAcceptFriendRequest from '@/hooks/user/useAcceptFriendRequest';
import useAcceptChatRoomInvitation from '@/hooks/chat/useAcceptChatRoomInvitation';
import useRejectChatRoomInvitation from '@/hooks/chat/useRejectChatRoomInvitation';
import { useRecoilState } from 'recoil';
import alarmListAtom from '@/recoil/user/alarmList';

const AlarmPopover = () => {
  const { data: alarmListResponse } = useGetAlarmList();

  const [alarmList, setAlarmList] = useRecoilState(alarmListAtom);

  const { mutate: acceptFriendRequest } = useAcceptFriendRequest();

  const { mutate: rejectFriendRequest } = useRejectFriendRequest();

  const { mutate: acceptChatRoomInvitation } = useRejectChatRoomInvitation();

  const { mutate: rejectChatRoomInvitation } = useAcceptChatRoomInvitation();

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
    if (alarmListResponse) {
      setAlarmList(alarmListResponse.content);
    }
  }, [alarmListResponse]);

  return (
    <Styled.AlarmPopoverContainer>
      <Styled.AlarmTriangleIcon title="알림" width="25" height="20" />
      <Styled.Header>전체 알림</Styled.Header>
      {alarmList.length > 0 ? (
        <Styled.AlarmList>
          {alarmList.map((alarm) => (
            <Styled.AlarmItem key={alarm.id}>
              {/* TODO: timestamp로 요청  */}
              <Styled.Time>방금 전</Styled.Time>
              <Styled.ContentContainer>
                <ProfileImage size={40} />
                <div>
                  <Styled.Content>
                    <Styled.Nickname>{alarm.nickname}</Styled.Nickname>
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
          ))}
        </Styled.AlarmList>
      ) : (
        <Styled.EmptyText>받은 알림이 없어요</Styled.EmptyText>
      )}
      {/* <Styled.AlarmItem>
          <Styled.Time>방금 전</Styled.Time>
          <Styled.ContentContainer>
            <ProfileImage size={40} />
            <div>
              <Styled.Content>
                <Styled.Nickname>
                  지오니지오니지오니지오니지오니지오니지오
                </Styled.Nickname>
                님이 친구 추가 요청을 보냈어요
              </Styled.Content>
              <Styled.ButtonContainer>
                <Styled.RejectButton type="button">거절</Styled.RejectButton>
                <Styled.AcceptButton type="button">수락</Styled.AcceptButton>
              </Styled.ButtonContainer>
            </div>
          </Styled.ContentContainer>
        </Styled.AlarmItem> */}
    </Styled.AlarmPopoverContainer>
  );
};

export default AlarmPopover;
