import { useEffect, useRef } from 'react';
import { useGetSecondaryToken } from './useGetSecondaryToken';
import useMessageSubscription from './useMessageSubscription';
import { useSetRecoilState } from 'recoil';
import sendMessageHandlerAtom from '@/recoil/chat/sendMessageHandler';
import socketConnectedAtom from '@/recoil/chat/socketConnected';

const websocketURL = import.meta.env.VITE_WEB_SOCKET_URL;

const useWebSocket = () => {
  const { data: tokenResponse } = useGetSecondaryToken();
  const { notifySubscribers } = useMessageSubscription();
  const setSocketConnected = useSetRecoilState(socketConnectedAtom);
  const setSendMessageHandler = useSetRecoilState(sendMessageHandlerAtom);

  const ws = useRef<WebSocket | null>(null);
  const pongTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const retryCountRef = useRef(0);

  useEffect(() => {
    if (tokenResponse) {
      connectWebSocket();
    }
  }, [tokenResponse]);

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
    setSendMessageHandler(() => sendMessageToServer);
  };

  const handleMessage = (event: MessageEvent) => {
    notifySubscribers(event.data);
  };

  const handleClose = () => {
    console.log(ws.current?.readyState);
    clearPongTimer();
    setSocketConnected(false);

    if (retryCountRef.current < 1) {
      retryCountRef.current += 1;
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
