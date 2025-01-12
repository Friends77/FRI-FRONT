import { useEffect, useRef, useState } from 'react';
import { useGetSecondaryToken } from './useGetSecondaryToken';

interface IUseWebSocketProps {
  setSocketConnected: (connected: boolean) => void;
  onReceivedMessage: (data: string) => void;
}

const websocketURL = import.meta.env.VITE_WEB_SOCKET_URL;

const useWebSocket = ({
  onReceivedMessage,
  setSocketConnected,
}: IUseWebSocketProps) => {
  const { data: tokenResponse } = useGetSecondaryToken();

  const ws = useRef<WebSocket | null>(null);
  const [pongTimer, setPongTimer] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  useEffect(() => {
    if (tokenResponse) {
      const webSocketUrl = `${websocketURL}/chat?token=${tokenResponse.secondaryToken}`;

      ws.current = new WebSocket(webSocketUrl);

      ws.current.onopen = () => {
        console.log(ws.current?.readyState);
        runPongTimer();
        setSocketConnected(true);
      };

      ws.current.onmessage = (event) => {
        onReceivedMessage(event.data);
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
  }, [tokenResponse]);

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

  return { sendMessageToServer };
};

export default useWebSocket;
