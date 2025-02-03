import {
  failedMessageAtom,
  pendingMessageAtom,
  sentMessageAtom,
} from '@/recoil/chat/message';
import sendMessageHandlerAtom from '@/recoil/chat/sendMessageHandler';
import profileAtom from '@/recoil/user/profile';
import { ISendMyMessageForm, ISentMessageItem } from '@/types/chat';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import useMessageSubscription from './useMessageSubscription';
import socketConnectedAtom from '@/recoil/chat/socketConnected';
import chatMembersAtom from '@/recoil/chat/member';
import useGetMemberProfile from './useGetMemberProfile';

interface IUseMessageHandlerProps {
  roomId: number;
  messageListRef: React.RefObject<HTMLUListElement>;
  setPreviewMessage: (message: ISentMessageItem | null) => void;
  setIsShowPreviewMessage: (isShow: boolean) => void;
}

const useMessageHandler = ({
  roomId,
  messageListRef,
  setPreviewMessage,
  setIsShowPreviewMessage,
}: IUseMessageHandlerProps) => {
  const socketConnected = useRecoilValue(socketConnectedAtom);
  const myProfile = useRecoilValue(profileAtom);
  const [pendingMessageList, setPendingMessageList] =
    useRecoilState(pendingMessageAtom);
  const setSentMessageList = useSetRecoilState(sentMessageAtom);
  const setFailedMessageList = useSetRecoilState(failedMessageAtom);
  const sendMessageToServer = useRecoilValue(sendMessageHandlerAtom);
  const setChatMembersAtom = useSetRecoilState(chatMembersAtom);

  const messageTimers = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const [myMessageContent, setMyMessageContent] = useState('');
  const [newMemberId, setNewMemberId] = useState<number | null>(null);

  const { subscribe } = useMessageSubscription();

  useEffect(() => {
    if (myProfile) {
      const unsubscribe = subscribe(handleReceivedMessage);
      return () => unsubscribe();
    }
  }, [myProfile]);

  useGetMemberProfile({ roomId, memberId: newMemberId, setNewMemberId });

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

  const handleSendMessage = async ({
    messageType,
    imagePath,
  }: ISendMyMessageForm) => {
    if (socketConnected && roomId && myProfile) {
      await sendMyMessage({ messageType, imagePath });

      const messageList = messageListRef.current;

      if (messageList) {
        setTimeout(() => {
          messageList.scrollTo(0, messageList.scrollHeight);
        }, 0);
      }
    }
  };

  const sendMyMessage = async ({
    messageType,
    imagePath,
  }: ISendMyMessageForm) => {
    const id = uuidv4();

    const myMessageForm = {
      chatRoomId: roomId,
      clientMessageId: id,
      content:
        messageType === 'IMAGE' ? (imagePath as string) : myMessageContent,
      type: messageType,
    };

    if (sendMessageToServer) {
      sendMessageToServer(myMessageForm);
    }

    if (myProfile) {
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

    if (code === 200 && chatRoomId === roomId) {
      if (senderId === myProfile?.memberId) {
        if (clientMessageId) {
          clearMessageTimer(clientMessageId);
        }

        setPendingMessageList((prevList) =>
          prevList.filter(
            (message) => message.clientMessageId !== clientMessageId,
          ),
        );
      } else {
        if (message.type === 'SYSTEM_MEMBER_ENTER') {
          setNewMemberId(message.senderId as number);
        }

        if (message.type === 'SYSTEM_MEMBER_LEAVE') {
          setChatMembersAtom((prevList) =>
            prevList.filter((member) => message.senderId !== member.id),
          );
        }

        if (messageListRef.current) {
          const { scrollHeight, scrollTop, clientHeight } =
            messageListRef.current;
          const scrollPercentage = scrollTop / (scrollHeight - clientHeight);
          if (scrollPercentage < 0.95) {
            setPreviewMessage(message);
            setIsShowPreviewMessage(true);
          }
        }
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

  return { myMessageContent, setMyMessageContent, handleSendMessage };
};

export default useMessageHandler;
