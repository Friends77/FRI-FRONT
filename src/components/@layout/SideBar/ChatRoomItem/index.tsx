import { IMyChatItem } from '@/types/chat';
import * as Styled from './ChatRoomItem.styled';
import { formatToHHMM } from '@/utils/formatter/time';
import { v4 as uuidv4 } from 'uuid';
import ProfileImage from '@/components/@common/ProfileImage';

interface IChatRoomItemProps {
  chatRoom: IMyChatItem;
  isSelected: boolean;
  onClick: (roomId: number) => void;
}

const ChatRoomItem = ({
  chatRoom,
  isSelected,
  onClick,
}: IChatRoomItemProps) => {
  const {
    id,
    imageUrl,
    title,
    lastMessage,
    lastMessageTime,
    unreadMessageCount,
    participantCount,
    participantProfileList,
  } = chatRoom;

  const participantList = [...participantProfileList].slice(0, 4);

  return (
    <Styled.Wrapper onClick={() => onClick(id)} $isSelected={isSelected}>
      <Styled.ChatRoomImg src={imageUrl} alt={`${title} 채팅방 이미지`} />
      <Styled.ChatRoomInfo>
        <Styled.TitleAndTime>
          <Styled.Title>{title}</Styled.Title>
          <Styled.Time dateTime={lastMessageTime}>
            {formatToHHMM(lastMessageTime)}
          </Styled.Time>
        </Styled.TitleAndTime>
        <Styled.Message>{lastMessage}</Styled.Message>
        <Styled.ParticipantList>
          {participantList.map((imgUrl, index) => (
            <Styled.ParticipantItem key={uuidv4()} $index={index}>
              <ProfileImage
                src={imgUrl}
                alt="참여 유저 프로필 이미지"
                size={24}
              />
            </Styled.ParticipantItem>
          ))}
          {participantCount > 4 && (
            <Styled.ParticipantItem $index={4}>
              <Styled.ParticipantCount>
                <span>{participantCount - 4}</span>
              </Styled.ParticipantCount>
            </Styled.ParticipantItem>
          )}
        </Styled.ParticipantList>
        {!!unreadMessageCount && (
          <Styled.UnreadCountContainer>
            <span>{unreadMessageCount > 99 ? '+99' : unreadMessageCount}</span>
          </Styled.UnreadCountContainer>
        )}
      </Styled.ChatRoomInfo>
    </Styled.Wrapper>
  );
};

export default ChatRoomItem;
