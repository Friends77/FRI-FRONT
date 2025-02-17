import AlarmTriangle from '@/components/@common/SVG/Icon/AlarmTriangle';
import * as Styled from './AlarmPopover.styled';
import useGetAlarmList from '@/hooks/user/useGetAlarmList';
import { useEffect, useState } from 'react';
import { IAlarmItem } from '@/types/user';
import ProfileImage from '@/components/@common/ProfileImage';
import PrimaryButton from '@/components/@common/Button/PrimaryButton';

const AlarmPopover = () => {
  // const { data: alarmListResponse } = useGetAlarmList();
  const [alarmList, setAlarmList] = useState<IAlarmItem[]>([]);

  // useEffect(() => {
  //   if (alarmListResponse) {
  //     setAlarmList(alarmListResponse.content);
  //   }
  // }, [alarmListResponse]);

  return (
    <Styled.AlarmPopoverContainer>
      <Styled.AlarmTriangleIcon title="알림" width="25" height="20" />
      <Styled.Header>전체 알림</Styled.Header>
      <Styled.AlarmList>
        {/* {alarmList.length > 0
          ? alarmList.map((alarm) => (
              <Styled.AlarmItem>
                <Styled.Time>방금 전</Styled.Time>
                <Styled.ContentContainer>
                  <ProfileImage size={40} />
                  <Styled.Content>
                    닉네임의최대길이가어님이 친구 추가 요청을 보냈어요
                  </Styled.Content>
                  <Styled.ButtonContainer>
                    <Styled.RejectButton>거절</Styled.RejectButton>
                    <Styled.AcceptButton>수락</Styled.AcceptButton>
                  </Styled.ButtonContainer>
                </Styled.ContentContainer>
              </Styled.AlarmItem>
            ))
          : '텅'} */}
        <Styled.AlarmItem>
          <Styled.Time>방금 전</Styled.Time>
          <Styled.ContentContainer>
            <ProfileImage size={40} />
            <div>
              <Styled.Content>
                닉네임의최대길이가어님이 친구 추가 요청을 보냈어요
              </Styled.Content>
              <Styled.ButtonContainer>
                <Styled.RejectButton type="button">거절</Styled.RejectButton>
                <Styled.AcceptButton type="button">수락</Styled.AcceptButton>
              </Styled.ButtonContainer>
            </div>
          </Styled.ContentContainer>
        </Styled.AlarmItem>
      </Styled.AlarmList>
    </Styled.AlarmPopoverContainer>
  );
};

export default AlarmPopover;
