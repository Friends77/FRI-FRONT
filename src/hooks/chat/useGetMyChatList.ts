import { getChatList } from '@/apis/chat';
import { CHAT_KEYS } from '@/constants/@queryKeys';
import { useSuspenseQuery } from '@tanstack/react-query';

const useGetMyChatList = (nickname?: string) => {
  return useSuspenseQuery({
    queryKey: CHAT_KEYS.CHAT_LIST(nickname),
    queryFn: () => getChatList(nickname),
    staleTime: 5 * 60 * 1000,
  });
};

export default useGetMyChatList;
