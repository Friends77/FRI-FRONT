import { getChatList } from '@/apis/chat';
import { CHAT_KEYS } from '@/constants/@queryKeys';
import { useSuspenseQuery } from '@tanstack/react-query';

const useGetMyChatList = () => {
  return useSuspenseQuery({
    queryKey: CHAT_KEYS.CHAT_LIST,
    queryFn: getChatList,
    staleTime: 5 * 60 * 1000,
  });
};

export default useGetMyChatList;
