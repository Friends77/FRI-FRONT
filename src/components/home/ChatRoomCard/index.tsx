/**
 * 채팅방 카드 컴포넌트
 * @author 선우
 */

import Tag from '@/components/@common/Tag';
import * as Styled from './ChatRoomCard.styled';
import { tags } from '@/constants/tag';

export interface IChatRoomCardProps {
  id: number;
  title: string;
  imageUrl: string;
  categoryIdList: {
    id: number;
  }[];
  participantCount: number;
  participantProfileList: string[];
}

const ChatRoomCard = (chatRoom: IChatRoomCardProps) => {
  return (
    <Styled.Wrapper>
      <Styled.ImageContainer>
        <Styled.ChatRoomThumbnail src={chatRoom.imageUrl} />
      </Styled.ImageContainer>
      <Styled.ChatRoomInfoContainer>
        <Styled.ChatRoomTitle>{chatRoom.title}</Styled.ChatRoomTitle>
        <Styled.ChatRoomSubtitle>채팅방 부제목 영역</Styled.ChatRoomSubtitle>
        <Styled.ChatRoomTagSection>
          {chatRoom.categoryIdList.map((category, idx) => {
            if (idx > 2) {
              return;
            }
            const tag = tags.find((tags) => tags.id === category.id)!;
            return <Tag key={category.id} icon={tag.image} label={tag.name} />;
          })}
        </Styled.ChatRoomTagSection>
      </Styled.ChatRoomInfoContainer>
    </Styled.Wrapper>
  );
};

export default ChatRoomCard;
