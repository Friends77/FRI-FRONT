import * as Styled from './ChatListSkeleton.styled';
import { v4 as uuidv4 } from 'uuid';

const ChatListSkeleton = () => {
  return (
    <Styled.SkeletonWrapper>
      <Styled.Header />
      <ul>
        {Array.from({ length: 20 }, () => 0).map(() => (
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
      </ul>
    </Styled.SkeletonWrapper>
  );
};

export default ChatListSkeleton;
