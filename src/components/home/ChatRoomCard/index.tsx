import Tag from '@/components/@common/Tag';
import * as Styled from './ChatRoomCard.styled';
import ProfileImage from '@/components/@common/ProfileImage';
import { ParticipantCount } from '@/components/@layout/SideBar/ChatRoomItem/ChatRoomItem.styled';
import { v4 as uuidv4 } from 'uuid';
import { useCallback } from 'react';
import { CHAT_PATH } from '@/constants/routes';
import { useNavigate } from 'react-router';
import { useRecoilValue } from 'recoil';
import isLoggedInAtom from '@/recoil/auth/isLoggedIn';
import { ALERT_MESSAGE } from '@/constants/message';
import { IInterestTag } from '@/types/@common';
import { COMMON_CONSTANT } from '@/constants/@common';
import { HOME_CONSTANT } from '@/constants/home';

export interface IChatRoomCardProps {
  id: number;
  title: string;
  imageUrl: string;
  categoryIdList: IInterestTag[];
  participantCount: number;
  participantProfileList: string[];
  description: string;
}

const ChatRoomCard = (chatRoom: IChatRoomCardProps) => {
  const navigate = useNavigate();

  const isLoggedIn = useRecoilValue(isLoggedInAtom);

  // 참여 유저 4명 자르기
  const participantList = [...chatRoom.participantProfileList].slice(
    0,
    COMMON_CONSTANT.CHAT_MAX_PARTICIPANT_COUNT,
  );

  // 채팅방으로 이동
  const handleChatRoomClick = useCallback(
    (roomId: number) => {
      if (!isLoggedIn) {
        alert(ALERT_MESSAGE.LOGIN_REQUIRED);
        navigate('/login');
      } else {
        const path = CHAT_PATH.CHAT_ROOM.replace(':roomId', roomId.toString());
        navigate(path);
      }
    },
    [isLoggedIn, navigate],
  );

  return (
    <Styled.Wrapper onClick={() => handleChatRoomClick(chatRoom.id)}>
      <Styled.ChatRoomThumbnail src={chatRoom.imageUrl} />
      <Styled.ChatRoomInfoContainer>
        <Styled.ChatRoomTitle>{chatRoom.title}</Styled.ChatRoomTitle>
        <Styled.ChatRoomSubtitle>
          {chatRoom.description}
        </Styled.ChatRoomSubtitle>
        <Styled.ChatRoomTagSection>
          {chatRoom.categoryIdList
            .slice(0, HOME_CONSTANT.MAX_CHAT_TAGS)
            .map((category) => {
              return (
                <li key={category.id}>
                  <Tag icon={category.image} label={category.name} />
                </li>
              );
            })}
        </Styled.ChatRoomTagSection>
        <Styled.ChatRoomParticipantList>
          {participantList.map((imageUrl, idx) => (
            <Styled.ParticipantItem key={uuidv4()} $index={idx}>
              <ProfileImage
                src={imageUrl}
                alt="참여 유저 프로필 이미지"
                size={24}
              />
            </Styled.ParticipantItem>
          ))}
          {chatRoom.participantCount >
            COMMON_CONSTANT.CHAT_MAX_PARTICIPANT_COUNT && (
            <Styled.ParticipantItem
              $index={COMMON_CONSTANT.CHAT_MAX_PARTICIPANT_COUNT}
            >
              <ParticipantCount>
                {chatRoom.participantCount -
                  COMMON_CONSTANT.CHAT_MAX_PARTICIPANT_COUNT}
              </ParticipantCount>
            </Styled.ParticipantItem>
          )}
        </Styled.ChatRoomParticipantList>
      </Styled.ChatRoomInfoContainer>
    </Styled.Wrapper>
  );
};

export default ChatRoomCard;
