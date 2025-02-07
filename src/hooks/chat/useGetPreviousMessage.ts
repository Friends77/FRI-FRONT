import { useQuery } from '@tanstack/react-query';
import { getChatMessages } from '@/apis/chat';
import { CHAT_KEYS } from '@/constants/@queryKeys';
import { CHAT_CONSTANT } from '@/constants/chat';

interface IUseMessageListProps {
  roomId: number;
  shouldFetchMessages: boolean;
  size?: number;
  lastMessageId?: number;
}

const useGetPreviousMessage = ({
  roomId,
  shouldFetchMessages,
  lastMessageId,
}: IUseMessageListProps) => {
  const { data } = useQuery({
    queryKey: CHAT_KEYS.CHAT_MESSAGES(roomId),
    queryFn: () =>
      getChatMessages({
        roomId,
        size: CHAT_CONSTANT.DEFAULT_MESSAGE_SIZE,
        lastMessageId,
      }),
    enabled: !!roomId && shouldFetchMessages,
  });

  return { data };
};

export default useGetPreviousMessage;
