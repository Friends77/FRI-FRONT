import { getChatMessages } from '@/apis/chat';
import { CHAT_CONSTANT } from '@/constants/chat';
import { useEffect, useState } from 'react';
import { IGetChatMessagesResponse } from '@/types/chat';

interface IUseMessageListProps {
  roomId: number;
  shouldFetchPreviousMessages: boolean;
  size?: number;
  lastMessageId?: number;
}

const useGetPreviousMessage = ({
  roomId,
  shouldFetchPreviousMessages,
  lastMessageId,
}: IUseMessageListProps) => {
  const [data, setData] = useState<IGetChatMessagesResponse | null>(null);

  useEffect(() => {
    if (!roomId || !shouldFetchPreviousMessages) return;

    const fetchMessages = async () => {
      try {
        const response = await getChatMessages({
          roomId,
          size: CHAT_CONSTANT.DEFAULT_MESSAGE_SIZE,
          lastMessageId,
        });

        setData(response);
      } catch (error) {
        alert('메세지를 가져오는데 실패했습니다.');
      }
    };

    fetchMessages();
  }, [roomId, shouldFetchPreviousMessages, lastMessageId]);

  return { data };
};

export default useGetPreviousMessage;
