import MessageInput from '@/components/chat/MessageInput';
import MessageList from '@/components/chat/MessageList';
import useMessageList from '@/hooks/chat/useMessageList';
import useMessageSubscription from '@/hooks/chat/useMessageSubscription';
import useWebSocket from '@/hooks/chat/useWebSocket';
import sendMessageHandlerAtom from '@/recoil/chat/sendMessageHandler';
import socketConnectedAtom from '@/recoil/chat/socketConnected';
import profileAtom from '@/recoil/user/profile';
import {
  ISentMessageItem,
  IPendingMessageItem,
  MessageType,
} from '@/types/chat';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
const ChatRoomPage = () => {
  const { roomId: roomIdQuery } = useParams();
  const roomId = Number(roomIdQuery);

  const messageTimers = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const [myMessageContent, setMyMessageContent] = useState('');
  const [pendingMessageList, setPendingMessageList] = useState<
    IPendingMessageItem[]
  >([]);
  const [sentMessageList, setSentMessageList] = useState<ISentMessageItem[]>(
    [],
  );
  const [failedMessageList, setFailedMessageList] = useState<
    IPendingMessageItem[]
  >([]);

  const [socketConnected, setSocketConnected] =
    useRecoilState(socketConnectedAtom);
  const sendMessageToServer = useRecoilValue(sendMessageHandlerAtom);
  const myProfile = useRecoilValue(profileAtom);

  // TODO: 테스트 후, 제거 예정
  useWebSocket({
    setSocketConnected,
  });

  useMessageList({ roomId, setSentMessageList });

  const { subscribe } = useMessageSubscription();

  useEffect(() => {
    if (myProfile) {
      const unsubscribe = subscribe(handleReceivedMessage);
      return () => unsubscribe();
    }
  }, [myProfile]);

  const setMessageTimer = (clientMessageId: string) => {
    const timer = setTimeout(() => {
      handleMessageSendFailure(clientMessageId);
    }, 1000 * 5);

    messageTimers.current.set(clientMessageId, timer);
  };

  const clearMessageTimer = (clientMessageId: string) => {
    const timer = messageTimers.current.get(clientMessageId);

    if (timer) {
      clearTimeout(timer);
      messageTimers.current.delete(clientMessageId);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    if (socketConnected && roomId && myProfile) {
      e.preventDefault();
      const id = uuidv4();

      const myMessageForm = {
        chatRoomId: roomId,
        clientMessageId: id,
        content: myMessageContent,
        type: 'TEXT' as MessageType,
      };

      if (sendMessageToServer) {
        sendMessageToServer(myMessageForm);
      }

      // TODO: 메세지 타입 수정
      setPendingMessageList((prevList) => [
        ...prevList,
        {
          ...myMessageForm,
          senderId: myProfile.memberId,
        },
      ]);

      setMyMessageContent('');
      setMessageTimer(id);
    }
  };

  const handleReceivedMessage = (data: string) => {
    const message: ISentMessageItem = JSON.parse(data);

    const { code, chatRoomId, senderId, clientMessageId } = message;

    if (code === 200 && chatRoomId === roomId && clientMessageId) {
      if (senderId === myProfile?.memberId) {
        clearMessageTimer(clientMessageId);
        setPendingMessageList((prevList) =>
          prevList.filter(
            (message) => message.clientMessageId !== clientMessageId,
          ),
        );
      }

      setSentMessageList((prevList) => [...prevList, message]);
    }

    if (code !== 200 && clientMessageId) {
      clearMessageTimer(clientMessageId);
      setPendingMessageList((prevList) =>
        prevList.filter(
          (message) => message.clientMessageId !== clientMessageId,
        ),
      );

      handleMessageSendFailure(clientMessageId);
    }
  };

  const handleMessageSendFailure = (clientMessageId: string) => {
    const failedMessage = pendingMessageList.find(
      (pendingMessage) => clientMessageId === pendingMessage.clientMessageId,
    );

    if (failedMessage) {
      setFailedMessageList((prevList) => [...prevList, failedMessage]);

      setPendingMessageList((prevList) =>
        prevList.filter(
          (pendingMessage) =>
            clientMessageId !== pendingMessage.clientMessageId,
        ),
      );
    }
  };

  const handleResendMessage = (clientMessageId: string) => {
    if (socketConnected && roomId) {
      const failedMessage = failedMessageList.find(
        (failedMessage) => clientMessageId === failedMessage.clientMessageId,
      );

      if (failedMessage && sendMessageToServer) {
        const messageForm = {
          chatRoomId: roomId,
          clientMessageId: failedMessage.clientMessageId,
          message: failedMessage.content,
        };

        sendMessageToServer(messageForm);
      }
    }
  };

  const handleDeleteMessage = (clientMessageId: string) => {
    setFailedMessageList((prevList) =>
      prevList.filter((message) => message.clientMessageId !== clientMessageId),
    );
  };

  return (
    <>
      <MessageList
        pendingMessageList={pendingMessageList}
        sentMessageList={sentMessageList}
        failedMessageList={failedMessageList}
        onResendMessage={handleResendMessage}
        onDeleteMessage={handleDeleteMessage}
      />
      <MessageInput
        value={myMessageContent}
        setMyMessageContent={setMyMessageContent}
        onSendMessage={handleSendMessage}
      />
    </>
  );
};

export default ChatRoomPage;
