import { IChatMessageItem } from '@/types/chat';
import { useEffect, useRef, useState } from 'react';
import { useGetSecondaryToken } from './useGetSecondaryToken';

interface IUseWebSocketProps {
  setSocketConnected: (connected: boolean) => void;
  setMessageList: React.Dispatch<React.SetStateAction<IChatMessageItem[]>>;
}

const websocketURL = import.meta.env.VITE_WEB_SOCKET_URL;

const useWebSocket = ({
  setMessageList,
  setSocketConnected,
}: IUseWebSocketProps) => {
  const { data: tokenResponse } = useGetSecondaryToken();

  const [secondaryToken, setSecondaryToken] = useState<string | null>(null);
  const ws = useRef<WebSocket | null>(null);
  const [pongTimer, setPongTimer] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  const webSocketUrl = `${websocketURL}/chat?token=${secondaryToken}`;

  useEffect(() => {
    if (tokenResponse) {
      setSecondaryToken(tokenResponse.secondaryToken);
    }
  }, [tokenResponse]);

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

  const sendMessageToServer = (data: { [key: string]: string | number }) => {
    const serializedSendMessageForm = JSON.stringify(data);
    ws.current?.send(serializedSendMessageForm);
  };

  return { sendMessageToServer };
};

export default useWebSocket;
