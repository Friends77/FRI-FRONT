import MessageInput from '@/components/chat/MessageInput';
import MessageList from '@/components/chat/MessageList';
import useMessageList from '@/hooks/chat/useMessageList';
import useWebSocket from '@/hooks/chat/useWebSocket';
import { IChatMessageItem } from '@/types/chat';
import { useState } from 'react';
import { useParams } from 'react-router';

const ChatRoomPage = () => {
  const { roomId } = useParams();

  const [socketConnected, setSocketConnected] = useState(false);
  const [myMessageContent, setMyMessageContent] = useState('');
  const [messageList, setMessageList] = useState<IChatMessageItem[]>([]);

  const { sendMessageToServer } = useWebSocket({
    setSocketConnected,
    setMessageList,
  });

  useMessageList({ roomId: roomId as string, setMessageList });

  const onMyMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMyMessageContent(e.target.value);
  };

  const onSendMessage = (e: React.FormEvent) => {
    if (socketConnected && roomId) {
      e.preventDefault();

      const myMessageForm = {
        message: myMessageContent,
        chatRoomId: roomId,
      };

      sendMessageToServer(myMessageForm);

      // TODO: 프로필 조회가 완성되면, senderId, senderName값 수정
      // TODO: 메세지 타입 수정
      setMessageList((prevMessageList) => [
        ...prevMessageList,
        {
          type: 'TEXT',
          status: 'loading',
          message: myMessageContent,
          senderId: 1,
          senderName: '지원',
          sendTime: new Date().getTime() + '',
        },
      ]);

      setMyMessageContent('');
    }
  };

  return (
    <>
      <MessageList messages={messageList} />
      <MessageInput
        value={myMessageContent}
        onMessageChange={onMyMessageChange}
        onSendMessage={onSendMessage}
      />
    </>
  );
};

export default ChatRoomPage;
