import MessageInput from '@/components/chat/MessageInput';
import MessageList from '@/components/chat/MessageList';
import useGetMessages from '@/hooks/chat/useGetMessages';
import useWebSocket from '@/hooks/chat/useWebSocket';
import messageAtom from '@/recoil/chat/message';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useRecoilState } from 'recoil';

const ChatRoomPage = () => {
  const { roomId } = useParams();
  const { data: messagesResponse } = useGetMessages(roomId as string);

  const [socketConnected, setSocketConnected] = useState(false);
  const [myMessageContent, setMyMessageContent] = useState('');
  const [messageList, setMessageList] = useRecoilState(messageAtom);

  const { sendMessageToServer } = useWebSocket({
    setSocketConnected,
    setMessageList,
  });

  useEffect(() => {
    if (messagesResponse) {
      setMessageList(
        messagesResponse.content.map(
          ({ type, content, senderId, createdAt }) => ({
            type,
            status: 'success',
            message: content,
            senderId,
            senderName: '테스트',
            sendTime: createdAt,
          }),
        ),
      );
    }
  }, [messagesResponse]);

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
