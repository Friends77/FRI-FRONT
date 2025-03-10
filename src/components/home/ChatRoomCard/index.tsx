import Tag from '@/components/@common/Tag';
import * as Styled from './ChatRoomCard.styled';
import ProfileImage from '@/components/@common/ProfileImage';
import { ParticipantCount } from '@/components/@layout/SideBar/SideBarChatRoomItem/SideBarChatRoomItem.styled';
import { v4 as uuidv4 } from 'uuid';
import { useCallback } from 'react';
import { CHAT_PATH } from '@/constants/routes';
import { useNavigate } from 'react-router';
import { useRecoilValue } from 'recoil';
import isLoggedInAtom from '@/recoil/auth/isLoggedIn';
import { AUTH_ERROR_MSG } from '@/constants/message';

export interface IChatRoomCardProps {
  id: number;
  title: string;
  imageUrl: string;
  categoryIdList: {
    id: number;
    name: string;
    type: 'SUBJECT' | 'REGION';
    image: string;
  }[];
  participantCount: number;
  participantProfileList: string[];
  description: string;
}

const ChatRoomCard = (chatRoom: IChatRoomCardProps) => {
  const navigate = useNavigate();

  const isLoggedIn = useRecoilValue(isLoggedInAtom);

  // 참여 유저 4명 자르기
  const participantList = [...chatRoom.participantProfileList].slice(0, 4);

  // 채팅방으로 이동
  const handleChatRoomClick = useCallback(
    (roomId: number) => {
      if (!isLoggedIn) {
        alert(AUTH_ERROR_MSG.LOGIN_REQUIRED);
        navigate('/login');
      } else {
        const path = CHAT_PATH.CHAT_ROOM.replace(':roomId', roomId.toString());
        navigate(path);
      }
    },
    [navigate],
  );

  return (
    <Styled.Wrapper onClick={() => handleChatRoomClick(chatRoom.id)}>
      <Styled.ImageContainer>
        <Styled.ChatRoomThumbnail src={chatRoom.imageUrl} />
      </Styled.ImageContainer>
      <Styled.ChatRoomInfoContainer>
        <Styled.ChatRoomTitle>{chatRoom.title}</Styled.ChatRoomTitle>
        <Styled.ChatRoomSubtitle>
          {chatRoom.description}
        </Styled.ChatRoomSubtitle>
        <Styled.ChatRoomTagSection>
          {chatRoom.categoryIdList.slice(0, 3).map((category) => {
            return (
              <Tag
                key={category.id}
                icon={category.image}
                label={category.name}
              />
            );
          })}
        </Styled.ChatRoomTagSection>
        <Styled.ChatRoomPariticipantList>
          {participantList.map((imageUrl, idx) => (
            <Styled.ParticipantItem key={uuidv4()} $index={idx}>
              <ProfileImage
                src={imageUrl}
                alt="참여 유저 프로필 이미지"
                size={24}
              />
            </Styled.ParticipantItem>
          ))}
          {chatRoom.participantCount > 4 && (
            <Styled.ParticipantItem $index={4}>
              <ParticipantCount>
                <span>{chatRoom.participantCount - 4}</span>
              </ParticipantCount>
            </Styled.ParticipantItem>
          )}
        </Styled.ChatRoomPariticipantList>
      </Styled.ChatRoomInfoContainer>
    </Styled.Wrapper>
  );
};

export default ChatRoomCard;
