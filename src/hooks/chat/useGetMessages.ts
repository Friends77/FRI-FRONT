import { getChatMessages } from '@/apis/chat';
import { CHAT_KEYS } from '@/constants/@queryKeys';
import { useQuery } from '@tanstack/react-query';

const useGetMessages = (roomId: string) => {
  return useQuery({
    queryKey: CHAT_KEYS.CHAT_MESSAGES(roomId),
    queryFn: () => getChatMessages({ roomId }),
    enabled: !!roomId,
  });
};

export default useGetMessages;
