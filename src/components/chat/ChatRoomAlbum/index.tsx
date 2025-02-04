import { useRecoilValue } from 'recoil';
import * as Styled from './ChatRoomAlbum.styled';
import { imageMessagesSelector } from '@/recoil/chat/message';

interface IChatRoomAlbum {
  isOpen: boolean;
  onClose: () => void;
  onAlbumImageClick: (path: string) => void;
}
const ChatRoomAlbum = ({
  isOpen,
  onClose,
  onAlbumImageClick,
}: IChatRoomAlbum) => {
  const imageMessages = useRecoilValue(imageMessagesSelector);

  return (
    <Styled.ChatRoomAlbum $isOpen={isOpen}>
      <Styled.Header>
        <Styled.BackButton type="button" onClick={onClose}>
          <Styled.BackIcon title="이전으로" width="24" height="24" />
        </Styled.BackButton>
        <Styled.Title>사진</Styled.Title>
      </Styled.Header>
      <Styled.AlbumContent>
        {imageMessages.map((path, index) => (
          <Styled.AlbumImageButton
            key={`${path}-${index}`}
            onClick={() => onAlbumImageClick(path)}
          >
            <Styled.AlbumImage src={path} alt="사진" />
          </Styled.AlbumImageButton>
        ))}
      </Styled.AlbumContent>
    </Styled.ChatRoomAlbum>
  );
};

export default ChatRoomAlbum;
