import { useEffect, useRef, useState } from 'react';
import { useGetSecondaryToken } from './useGetSecondaryToken';
import useMessageSubscription from './useMessageSubscription';
import { useSetRecoilState } from 'recoil';
import sendMessageHandlerAtom from '@/recoil/chat/sendMessageHandler';

interface IUseWebSocketProps {
  setSocketConnected: (connected: boolean) => void;
}

const websocketURL = import.meta.env.VITE_WEB_SOCKET_URL;

const useWebSocket = ({ setSocketConnected }: IUseWebSocketProps) => {
  const { data: tokenResponse } = useGetSecondaryToken();
  const { notifySubscribers } = useMessageSubscription();
  const setSendMessageHandler = useSetRecoilState(sendMessageHandlerAtom);

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
        setSendMessageHandler(() => sendMessageToServer);
      };

      ws.current.onmessage = (event) => {
        console.log(ws.current?.readyState);
        notifySubscribers(event.data);
      };

      ws.current.onclose = () => {
        console.log(ws.current?.readyState);
        clearPongTimer();
        setSocketConnected(false);
      };

      ws.current.onerror = (error) => {
        console.log(ws.current?.readyState);
        console.log(error);
      };
    }

    return () => {
      ws.current?.close();
    };
  }, [tokenResponse]);

  const runPongTimer = () => {
    const timer = setTimeout(() => {
      setPongTimer(null);
      if (ws.current?.readyState !== WebSocket.OPEN) return;
      sendMessageToServer({ type: 'pong' });
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
