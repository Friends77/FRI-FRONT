import useGetMyChatList from '@/hooks/chat/useGetMyChatList';
import SideBarListWrapper from '../SideBarListWrapper';
import { formatToHHMM } from '@/utils/formatter/time';
import { v4 as uuidv4 } from 'uuid';
import * as Styled from './SideBarChatList.styled';

const SideBarChatList = () => {
  const { data } = useGetMyChatList();

  return (
    <SideBarListWrapper title="채팅방" count={data.content.length}>
      {data.content.map(
        ({
          id,
          imageUrl,
          title,
          lastMessage,
          lastMessageTime,
          unreadMessageCount,
          participantCount,
          participantProfileList,
        }) => {
          const participantList = [...participantProfileList].slice(0, 4);

          return (
            <Styled.Wrapper key={id}>
              <Styled.ChatRoomImg
                src={imageUrl}
                alt={`${title} 채팅방 이미지`}
              />
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
                      <Styled.ParticipantImg
                        src={imgUrl}
                        alt="참여 유저 프로필 이미지"
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
                    <span>
                      {unreadMessageCount > 99 ? '+99' : unreadMessageCount}
                    </span>
                  </Styled.UnreadCountContainer>
                )}
              </Styled.ChatRoomInfo>
            </Styled.Wrapper>
          );
        },
      )}
    </SideBarListWrapper>
  );
};

export default SideBarChatList;
