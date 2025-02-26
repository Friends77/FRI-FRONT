import isLoggedInAtom from '@/recoil/auth/isLoggedIn';
import alarmListAtom from '@/recoil/user/alarmList';
import { AlarmType } from '@/types/user';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useGetSecondaryToken } from '../chat/useGetSecondaryToken';
import hasAlarmAtom from '@/recoil/user/hasAlarm';

const websocketURL = import.meta.env.VITE_WEB_SOCKET_URL;

const useAlarmWebSocket = () => {
  const isLoggedIn = useRecoilValue(isLoggedInAtom);

  const { data: tokenResponse } = useGetSecondaryToken({
    isLoggedIn: !!isLoggedIn,
    type: 'alarm',
  });

  const [socketConnected, setSocketConnected] = useState(false);

  const setAlarmList = useSetRecoilState(alarmListAtom);

  const [hasAlarm, setHasAlarm] = useRecoilState(hasAlarmAtom);

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
    const message = JSON.parse(event.data);

    if (
      message.type === AlarmType.FRIEND_REQUEST ||
      message.type === AlarmType.CHAT_ROOM_INVITATION
    ) {
      setAlarmList((prevList) => [message, ...prevList]);

      if (!hasAlarm) {
        setHasAlarm(true);
      }
    }
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
