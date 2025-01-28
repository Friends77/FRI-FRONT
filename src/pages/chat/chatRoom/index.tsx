import ChatRoomHeader from '@/components/chat/ChatRoomHeader';
import * as Styled from './ChatRoom.styled';
import MessageInput from '@/components/chat/MessageInput';
import MessageList from '@/components/chat/MessageList';
import useGetChatRoomDetail from '@/hooks/chat/useGetChatRoomDetail';
import useWebSocket from '@/hooks/chat/useWebSocket';
import { ISentMessageItem, IChatRoomDetailResponse } from '@/types/chat';
import { useRef, useState } from 'react';
import { useParams } from 'react-router';
import useMessageHandler from '@/hooks/chat/useMessageHandler';
import useScrollHandler from '@/hooks/chat/useScrollHandler';
const ChatRoomPage = () => {
  const { roomId: roomIdQuery } = useParams();
  const roomId = Number(roomIdQuery);

  const [chatRoomDetail, setChatRoomDetail] =
    useState<IChatRoomDetailResponse | null>(null);

  const messageListRef = useRef<HTMLUListElement | null>(null);

  const [isShowPreviewMessage, setIsShowPreviewMessage] = useState(false);
  const [previewMessage, setPreviewMessage] = useState<ISentMessageItem | null>(
    null,
  );

  // TODO: 테스트 후, 제거 예정
  useWebSocket();

  useGetChatRoomDetail({ roomId, setChatRoomDetail });

  const { myMessageContent, setMyMessageContent, handleSendMessage } =
    useMessageHandler({
      roomId,
      messageListRef,
      setPreviewMessage,
      setIsShowPreviewMessage,
    });

  useScrollHandler({
    messageListRef,
    setPreviewMessage,
    setIsShowPreviewMessage,
  });

  const goToBottom = () => {
    messageListRef.current?.scrollTo(0, messageListRef.current.scrollHeight);
  };

  const handlePreviewMessageClick = () => {
    goToBottom();
    setIsShowPreviewMessage(false);
    setPreviewMessage(null);
  };

  return (
    <Styled.ChatRoomContainer>
      <ChatRoomHeader title={chatRoomDetail?.title || ''} />
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
    </Styled.ChatRoomContainer>
  );
};

export default ChatRoomPage;
