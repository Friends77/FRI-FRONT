import alarmSocketConnectedAtom from '@/recoil/user/socketConnectedAtom';
import { ISecondaryTokenResponse } from '@/types/chat';
import { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';

const websocketURL = import.meta.env.VITE_WEB_SOCKET_URL;

const useAlarmWebSocket = (tokenResponse?: ISecondaryTokenResponse) => {
  const [socketConnected, setSocketConnected] = useRecoilState(
    alarmSocketConnectedAtom,
  );

  const ws = useRef<WebSocket | null>(null);
  const pongTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const retryCountRef = useRef(0);

  useEffect(() => {
    if (!socketConnected && tokenResponse) {
      connectWebSocket();
    }
  }, [socketConnected, tokenResponse]);

  const connectWebSocket = () => {
    const webSocketUrl = `${websocketURL}/alarm?token=${tokenResponse?.secondaryToken}`;
    ws.current = new WebSocket(webSocketUrl);

    ws.current.onopen = handleOpen;
    ws.current.onmessage = handleMessage;
    ws.current.onclose = handleClose;
    ws.current.onerror = handleError;
  };

  const handleOpen = () => {
    console.log('알림', ws.current?.readyState);
    runPongTimer();
    setSocketConnected(true);
  };

  const handleMessage = (event: MessageEvent) => {
    console.log('알림 메세지 도착', event.data);
  };

  const handleClose = (event: CloseEvent) => {
    console.log('알림 close', ws.current?.readyState, event.code);
    clearPongTimer();
    setSocketConnected(false);

    if (retryCountRef.current < 1) {
      retryCountRef.current += 1;
      setTimeout(() => connectWebSocket(), 1000);
    }
  };

  const handleError = (error: Event) => {
    console.log('알림', ws.current?.readyState, error);
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

export default useAlarmWebSocket;
