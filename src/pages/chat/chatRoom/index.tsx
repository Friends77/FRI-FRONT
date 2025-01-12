import MessageInput from '@/components/chat/MessageInput';
import MessageList from '@/components/chat/MessageList';
import useMessageList from '@/hooks/chat/useMessageList';
import useWebSocket from '@/hooks/chat/useWebSocket';
import socketConnectedAtom from '@/recoil/chat/socketConnected';
import { IChatMessageItem } from '@/types/chat';
import { useState } from 'react';
import { useParams } from 'react-router';
import { useRecoilState } from 'recoil';

const ChatRoomPage = () => {
  const { roomId: roomIdQuery } = useParams();
  const roomId = Number(roomIdQuery);

  const [socketConnected, setSocketConnected] =
    useRecoilState(socketConnectedAtom);
  const [myMessageContent, setMyMessageContent] = useState('');
  const [messageList, setMessageList] = useState<IChatMessageItem[]>([]);

  const onReceivedMessage = (data: string) => {
    const message: IChatMessageItem = JSON.parse(data);

    // TODO: 프로필 조회가 완성되면 주석 해제
    // 내 메세지 수신인 경우
    // if (message.chatRoomId === roomId && memberId === senderId) {
    //   setMessageList((prevList) =>
    //     prevList.map((message) =>
    //       message.sendTime === sendTime
    //         ? { ...message, status: 'success' }
    //         : message,
    //     ),
    //   );
    //   return;
    // }

    // 상대 메세지 수신인 경우
    if (message.chatRoomId === roomId) {
      setMessageList((prevList) => [...prevList, message]);
    }
  };

  const { sendMessageToServer } = useWebSocket({
    setSocketConnected,
    onReceivedMessage,
  });

  useMessageList({ roomId, setMessageList });

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
