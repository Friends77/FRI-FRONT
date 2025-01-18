import MessageInput from '@/components/chat/MessageInput';
import MessageList from '@/components/chat/MessageList';
import useMessageList from '@/hooks/chat/useMessageList';
import useMessageSubscription from '@/hooks/chat/useMessageSubscription';
import useWebSocket from '@/hooks/chat/useWebSocket';
import sendMessageHandlerAtom from '@/recoil/chat/sendMessageHandler';
import socketConnectedAtom from '@/recoil/chat/socketConnected';
import profileAtom from '@/recoil/user/profile';
import { ISentMessageItem, IPendingMessageItem } from '@/types/chat';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useRecoilState, useRecoilValue } from 'recoil';

const ChatRoomPage = () => {
  const { roomId: roomIdQuery } = useParams();
  const roomId = Number(roomIdQuery);

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
  const [myMessageContent, setMyMessageContent] = useState('');

  // TODO: 제거 예정
  useWebSocket({
    setSocketConnected,
  });

  useMessageList({ roomId, setSentMessageList });

  const { subscribe } = useMessageSubscription();

  useEffect(() => {
    const unsubscribe = subscribe(handleReceivedMessage);
    return () => unsubscribe();
  }, []);

  const handleReceivedMessage = (data: string) => {
    const message: ISentMessageItem = JSON.parse(data);

    const { code, chatRoomId, senderId, clientMessageId } = message;

    // if (code === 200 && chatRoomId === roomId) {
    if (chatRoomId === roomId) {
      // if (senderId === myProfile?.memberId) {
      //   setPendingMessageList((prevList) =>
      //     prevList.filter(
      //       (message) => message.clientMessageId !== clientMessageId,
      //     ),
      //   );
      // }

      setSentMessageList((prevList) => [...prevList, message]);
    }

    if (code !== 200 && clientMessageId) {
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

  return (
    <>
      <MessageList
        pendingMessageList={pendingMessageList}
        sentMessageList={sentMessageList}
        failedMessageList={failedMessageList}
        onResendMessage={handleResendMessage}
      />
      <MessageInput
        value={myMessageContent}
        setMyMessageContent={setMyMessageContent}
        setPendingMessageList={setFailedMessageList}
      />
    </>
  );
};

export default ChatRoomPage;
