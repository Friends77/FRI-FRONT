import { getChatMessages } from '@/apis/chat';
import { CHAT_KEYS } from '@/constants/@queryKeys';
import { useQuery } from '@tanstack/react-query';

export const useGetMessages = (roomId: string) => {
  const { data } = useQuery({
    queryKey: CHAT_KEYS.CHAT_MESSAGES(roomId),
    queryFn: () => getChatMessages({ roomId }),
    enabled: !!roomId,
  });

  return { data };
};
