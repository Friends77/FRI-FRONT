import { useQuery } from '@tanstack/react-query';
import { getChatMessages } from '@/apis/chat';
import { CHAT_KEYS } from '@/constants/@queryKeys';
import { CHAT_CONSTANT } from '@/constants/chat';

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
  const { data } = useQuery({
    queryKey: CHAT_KEYS.CHAT_MESSAGES,
    queryFn: () =>
      getChatMessages({
        roomId,
        size: CHAT_CONSTANT.DEFAULT_MESSAGE_SIZE,
        lastMessageId,
      }),
    enabled: !!roomId && shouldFetchPreviousMessages,
  });

  return { data };
};

export default useGetPreviousMessage;
