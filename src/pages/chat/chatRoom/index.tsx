import { useGetMessages } from '@/hooks/chat/useGetMessages';
import { useGetSecondaryToken } from '@/hooks/chat/useGetSecondaryToken';
import { IChatMessageItem } from '@/types/chat';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';

const websocketURL = import.meta.env.VITE_WEB_SOCKET_URL;

const ChatRoomPage = () => {
  const [socketConnected, setSocketConnected] = useState(false);
  const [pongTimer, setPongTimer] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  const [myMessageContent, setMyMessageContent] = useState('');
  const { secondaryToken, mutate: getSecondaryToken } = useGetSecondaryToken();

  const { roomId } = useParams();
  const ws = useRef<WebSocket | null>(null);

  const {
    messageList,
    setMessageList,
    mutate: getChatMessages,
  } = useGetMessages();

  const webSocketUrl = `${websocketURL}/chat?token=${secondaryToken}`;

  useEffect(() => {
    getSecondaryToken();
  }, []);

  useEffect(() => {
    if (roomId) {
      getChatMessages({ roomId });
    }
  }, []);

  useEffect(() => {
    if (secondaryToken) {
      ws.current = new WebSocket(webSocketUrl);

      ws.current.onopen = () => {
        console.log(ws.current?.readyState);
        runPongTimer();
        setSocketConnected(true);
      };

      ws.current.onmessage = (event) => {
        handleReceivedMessage(event.data);
      };

      ws.current.onclose = () => {
        clearPongTimer();
        setSocketConnected(false);
      };

      ws.current.onerror = () => {};
    }

    return () => {
      ws.current?.close();
    };
  }, [secondaryToken]);

  const runPongTimer = () => {
    const timer = setTimeout(() => {
      setPongTimer(null);
      if (ws.current?.readyState !== WebSocket.OPEN) return;
      // TODO: 서버 ping, pong 구현되면 테스트
      // sendMessageToServer({ type: 'pong' });
      runPongTimer();
    }, 1000 * 25);

    setPongTimer(timer);
  };

  const clearPongTimer = () => {
    if (pongTimer) {
      clearTimeout(pongTimer);
      setPongTimer(null);
    }
  };

  const sendMessageToServer = (data: { [key: string]: string | number }) => {
    const serializedSendMessageForm = JSON.stringify(data);
    ws.current?.send(serializedSendMessageForm);
  };

  const handleMyMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMyMessageContent(e.target.value);
  };

  const handleSendMessage = () => {
    if (socketConnected && roomId) {
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

  const handleReceivedMessage = (data: string) => {
    const message: IChatMessageItem = JSON.parse(data);

    // TODO: 프로필 조회가 완성되면 주석 해제
    // 내 메세지 수신인 경우
    // if (memberId === senderId) {
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
    setMessageList((prevList) => [...prevList, message]);
  };

  return (
    <>
      <div>
        <ul>
          {messageList.map((message) => (
            <li key={message.sendTime}>{message.message}</li>
          ))}
        </ul>
      </div>
      <form>
        <label htmlFor="">
          <textarea
            name=""
            id=""
            rows={2}
            value={myMessageContent}
            onChange={handleMyMessageChange}
            placeholder="메세지를 입력해주세요"
          ></textarea>
        </label>
        <button type="button" onClick={handleSendMessage}>
          전송
        </button>
      </form>
    </>
  );
};

export default ChatRoomPage;
