import { useEffect, useRef } from 'react';
import useMessageSubscription from './useMessageSubscription';
import { useRecoilState, useSetRecoilState } from 'recoil';
import sendMessageHandlerAtom from '@/recoil/chat/sendMessageHandler';
import chatSocketConnectedAtom from '@/recoil/chat/socketConnected';
import { ISecondaryTokenResponse } from '@/types/chat';

const websocketURL = import.meta.env.VITE_WEB_SOCKET_URL;

const useChatWebSocket = (tokenResponse?: ISecondaryTokenResponse) => {
  const { notifySubscribers } = useMessageSubscription();

  const [socketConnected, setSocketConnected] = useRecoilState(
    chatSocketConnectedAtom,
  );

  const setSendMessageHandler = useSetRecoilState(sendMessageHandlerAtom);

  const ws = useRef<WebSocket | null>(null);

  const pongTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const retryCountRef = useRef(0);

  useEffect(() => {
    if (!socketConnected && tokenResponse) {
      connectWebSocket();
    }
  }, [socketConnected, tokenResponse]);

  const connectWebSocket = () => {
    const webSocketUrl = `${websocketURL}/chat?token=${tokenResponse?.secondaryToken}`;
    ws.current = new WebSocket(webSocketUrl);

    ws.current.onopen = handleOpen;
    ws.current.onmessage = handleMessage;
    ws.current.onclose = handleClose;
    ws.current.onerror = handleError;
  };

  const handleOpen = () => {
    console.log('채팅', ws.current?.readyState);
    runPongTimer();
    setSocketConnected(true);
    setSendMessageHandler(() => sendMessageToServer);
  };

  const handleMessage = (event: MessageEvent) => {
    notifySubscribers(event.data);
  };

  const handleClose = (event: CloseEvent) => {
    console.log('채팅 close', ws.current?.readyState, event.code, event.reason);
    clearPongTimer();
    setSocketConnected(false);

    if (retryCountRef.current < 1) {
      retryCountRef.current += 1;
      setTimeout(() => connectWebSocket(), 1000);
    }
  };

  const handleError = (error: Event) => {
    console.log('채팅', ws.current?.readyState, error);
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

export default useChatWebSocket;
