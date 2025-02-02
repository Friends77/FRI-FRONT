import MoreHorizon from '@/components/@common/SVG/Icon/MoreHorizon';
import * as Styled from './ChatRoomHeader.styled';

interface IChatRoomHeader {
  title: string;
  onMoreButtonClick: () => void;
}

const ChatRoomHeader = ({ title, onMoreButtonClick }: IChatRoomHeader) => {
  return (
    <Styled.ChatRoomHeader>
      <Styled.Header>{title}</Styled.Header>
      <Styled.MoreButton onClick={onMoreButtonClick}>
        <MoreHorizon title="더보기" width="32" height="32" />
      </Styled.MoreButton>
    </Styled.ChatRoomHeader>
  );
};

export default ChatRoomHeader;
