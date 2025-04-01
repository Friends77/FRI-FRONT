import { getChatMessages } from '@/apis/chat';
import { CHAT_CONSTANT } from '@/constants/chat';
import { useEffect, useState } from 'react';
import { IGetChatMessagesResponse } from '@/types/chat';
import { ALERT_MESSAGE } from '@/constants/message';

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
        alert(ALERT_MESSAGE.MESSAGE_FETCH_FAILED);
      }
    };

    fetchMessages();
  }, [roomId, shouldFetchPreviousMessages, lastMessageId]);

  return { data };
};

export default useGetPreviousMessage;
