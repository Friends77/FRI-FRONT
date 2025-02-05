import ChatRoomHeader from '@/components/chat/ChatRoomHeader';
import * as Styled from './ChatRoom.styled';
import MessageInput from '@/components/chat/MessageInput';
import MessageList from '@/components/chat/MessageList';
import useGetChatRoomDetail from '@/hooks/chat/useGetChatRoomDetail';
import useWebSocket from '@/hooks/chat/useWebSocket';
import { ISentMessageItem } from '@/types/chat';
import { useRef, useState } from 'react';
import { useParams } from 'react-router';
import useMessageHandler from '@/hooks/chat/useMessageHandler';
import useScrollHandler from '@/hooks/chat/useScrollHandler';
import useGetChatMembers from '@/hooks/chat/useGetChatMembers';
import { useRecoilValue } from 'recoil';
import roomDetailAtom from '@/recoil/chat/roomDetail';
import ChatRoomInfoDrawer from '@/components/chat/ChatRoomInfoDrawer';
import ChatRoomAlbum from '@/components/chat/ChatRoomAlbum';
import ImageViewer from '@/components/@common/ImageViewer';
import { imageMessagesSelector } from '@/recoil/chat/message';
import useChatRoomDrawer from '@/hooks/chat/useChatRoomDrawer';
import useEnterChatRoom from '@/hooks/chat/useEnterChatRoom';
import useResetState from '@/hooks/chat/useResetState';

const ChatRoomPage = () => {
  const { roomId: roomIdQuery } = useParams();
  const roomId = Number(roomIdQuery);

  const chatRoomDetail = useRecoilValue(roomDetailAtom);
  const imageMessages = useRecoilValue(imageMessagesSelector);

  const messageListRef = useRef<HTMLUListElement | null>(null);

  const [isEnter, setIsEnter] = useState(false);
  const [isShowPreviewMessage, setIsShowPreviewMessage] = useState(false);
  const [previewMessage, setPreviewMessage] = useState<ISentMessageItem | null>(
    null,
  );

  // TODO: 테스트 후, 제거 예정
  useWebSocket();
  useResetState({ roomId, setIsEnter });
  useEnterChatRoom({ roomId, setIsEnter });
  useGetChatRoomDetail({ roomId });
  useGetChatMembers({ roomId });

  const { myMessageContent, setMyMessageContent, handleSendMessage } =
    useMessageHandler({
      roomId,
      messageListRef,
      setPreviewMessage,
      setIsShowPreviewMessage,
    });

  useScrollHandler({
    roomId,
    isEnter,
    messageListRef,
    setPreviewMessage,
    setIsShowPreviewMessage,
  });

  const {
    isOpenDrawer,
    isOpenAlbum,
    isShowImageViewer,
    selectedIndex,
    onMoreButtonClick,
    onCloseDrawer,
    onOpenAlbum,
    onCloseAlbum,
    onImageViewerClose,
    onAlbumImageClick,
  } = useChatRoomDrawer(imageMessages);

  const goToBottom = () => {
    messageListRef.current?.scrollTo(0, messageListRef.current.scrollHeight);
  };

  const handlePreviewMessageClick = () => {
    goToBottom();
    setIsShowPreviewMessage(false);
    setPreviewMessage(null);
  };

  return (
    <>
      {isShowImageViewer && (
        <ImageViewer
          imageList={imageMessages}
          alt="이미지 메세지"
          onClose={onImageViewerClose}
          selectedImageIndex={selectedIndex}
        />
      )}
      <Styled.ChatRoom>
        <ChatRoomAlbum
          isOpen={isOpenAlbum}
          onClose={onCloseAlbum}
          onAlbumImageClick={onAlbumImageClick}
        />
        <ChatRoomInfoDrawer
          isOpen={isOpenDrawer}
          onCloseDrawer={onCloseDrawer}
          onOpenAlbum={onOpenAlbum}
          onAlbumImageClick={onAlbumImageClick}
        />
        <Styled.ChatRoomContainer $isOpenDrawer={isOpenDrawer}>
          <Styled.ChatRoomWrapper>
            <ChatRoomHeader
              title={chatRoomDetail?.title || ''}
              onMoreButtonClick={onMoreButtonClick}
            />
            <MessageList
              ref={messageListRef}
              isShowPreviewMessage={isShowPreviewMessage}
              onPreviewMessageClick={handlePreviewMessageClick}
              previewMessage={previewMessage}
            />
            <MessageInput
              value={myMessageContent}
              setMyMessageContent={setMyMessageContent}
              onSendMessage={handleSendMessage}
            />
          </Styled.ChatRoomWrapper>
        </Styled.ChatRoomContainer>
      </Styled.ChatRoom>
    </>
  );
};

export default ChatRoomPage;
