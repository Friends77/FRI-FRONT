import * as Styled from './ChatRoomHeader.styled';

interface IChatRoomHeader {
  title: string;
}

const ChatRoomHeader = ({ title }: IChatRoomHeader) => {
  return <Styled.ChatRoomHeader>{title}</Styled.ChatRoomHeader>;
};

export default ChatRoomHeader;
