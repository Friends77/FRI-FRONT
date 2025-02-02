import { useQuery } from '@tanstack/react-query';
import { getChatMessages } from '@/apis/chat';
import { CHAT_KEYS } from '@/constants/@queryKeys';

interface IUseMessageListProps {
  roomId: number;
  shouldFetchMessages: boolean;
  size?: number;
  lastMessageId?: number;
}

const useGetPreviousMessage = ({
  roomId,
  shouldFetchMessages,
  size,
  lastMessageId,
}: IUseMessageListProps) => {
  return useQuery({
    queryKey: CHAT_KEYS.CHAT_MESSAGES(roomId),
    queryFn: () => getChatMessages({ roomId, size, lastMessageId }),
    enabled: !!roomId && shouldFetchMessages,
  });
};

export default useGetPreviousMessage;
