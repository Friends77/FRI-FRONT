import { PAGE_SIZE } from '@/hooks/chat/useGetMyChatList';
import * as Styled from './SideBarChatListSkeleton.styled';
import { v4 as uuidv4 } from 'uuid';

const SideBarChatListSkeleton = () => {
  return (
    <Styled.SkeletonWrapper>
      {/* 스켈레톤 박스 개수는 채팅방 개수 유무에 따라 결정
      count > PAGE_SIZE ? PAGE_SIZE : count */}
      {Array.from({ length: PAGE_SIZE }, () => 0).map(() => (
        <Styled.SkeletonItem key={uuidv4()}>
          <Styled.ChatRoomImg />
          <Styled.ChatRoomInfo>
            <Styled.TitleAndTime>
              <Styled.Title />
              <Styled.Time />
            </Styled.TitleAndTime>
            <Styled.Message />
            <Styled.ParticipantList>
              {Array.from({ length: 5 }, () => 0).map((_, index) => (
                <Styled.ParticipantItem key={uuidv4()} $index={index} />
              ))}
            </Styled.ParticipantList>
          </Styled.ChatRoomInfo>
        </Styled.SkeletonItem>
      ))}
    </Styled.SkeletonWrapper>
  );
};

export default SideBarChatListSkeleton;
