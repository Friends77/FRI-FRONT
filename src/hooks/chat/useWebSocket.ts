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
  const pongTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (tokenResponse) {
      connectWebSocket();
    }

    return () => {
      closeWebSocket();
    };
  }, [tokenResponse]);

  const closeWebSocket = () => {
    clearPongTimer();
    ws.current?.close();
    ws.current = null;
  };

  const connectWebSocket = () => {
    const webSocketUrl = `${websocketURL}/chat?token=${tokenResponse?.secondaryToken}`;
    ws.current = new WebSocket(webSocketUrl);

    ws.current.onopen = handleOpen;
    ws.current.onmessage = handleMessage;
    ws.current.onclose = handleClose;
    ws.current.onerror = handleError;
  };

  const handleOpen = () => {
    console.log(ws.current?.readyState);
    runPongTimer();
    setSocketConnected(true);
    setRetryCount(0);
    setSendMessageHandler(() => sendMessageToServer);
  };

  const handleMessage = (event: MessageEvent) => {
    notifySubscribers(event.data);
  };

  const handleClose = () => {
    console.log(ws.current?.readyState);
    clearPongTimer();
    setSocketConnected(false);

    if (retryCount < 1) {
      setRetryCount((prev) => prev + 1);
      setTimeout(() => connectWebSocket(), 1000);
    }
  };

  const handleError = (error: Event) => {
    console.log(ws.current?.readyState, error);
  };

  const runPongTimer = () => {
    clearPongTimer();

    pongTimer.current = setTimeout(() => {
      if (ws.current?.readyState !== WebSocket.OPEN) return;
      sendMessageToServer({ type: 'pong' });
      runPongTimer();
    }, 1000 * 25);
  };

  const clearPongTimer = () => {
    if (pongTimer.current) {
      clearTimeout(pongTimer.current);
      pongTimer.current = null;
    }
  };

  const sendMessageToServer = (data: { [key: string]: string | number }) => {
    const serializedSendMessageForm = JSON.stringify(data);
    ws.current?.send(serializedSendMessageForm);
  };
};

export default useWebSocket;
