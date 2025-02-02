import { useEffect, useState } from 'react';
import { IGetChatMessagesResponse, ISentMessageItem } from '@/types/chat';
import { useMutation } from '@tanstack/react-query';
import { enterChatRoom } from '@/apis/chat';
import useGetPreviousMessage from './useGetPreviousMessage';

interface IUseMessageListProps {
  roomId: number;
  setSentMessageList: React.Dispatch<React.SetStateAction<ISentMessageItem[]>>;
  messageListRef: React.RefObject<HTMLUListElement>;
}

const useEnterChatRoom = ({
  roomId,
  setSentMessageList,
  messageListRef,
}: IUseMessageListProps) => {
  const [isEnter, setIsEnter] = useState(false);

  const { data: messagesResponse } = useGetPreviousMessage({
    roomId,
    shouldFetchMessages: isEnter,
  });

  const { mutate } = useMutation({
    mutationFn: () => enterChatRoom(roomId),
    onSuccess: () => {
      setIsEnter(true);
    },
    onError: (error) => {
      console.error(error);
      alert('채팅방 입장 실패!');
    },
  });

  useEffect(() => {
    mutate();
  }, []);

  const updateSentMessages = async (
    messagesResponse: IGetChatMessagesResponse,
  ) => {
    setSentMessageList(messagesResponse.content);
  };

  useEffect(() => {
    const loadMessagesAndScroll = async () => {
      if (messagesResponse) {
        await updateSentMessages(messagesResponse);

        const messageList = messageListRef.current;

        if (messageList) {
          messageList.scrollTo(0, messageList.scrollHeight);
        }
      }
    };

    loadMessagesAndScroll();
  }, [messagesResponse]);
};

export default useEnterChatRoom;
