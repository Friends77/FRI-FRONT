import { getChatList } from '@/apis/chat';
import { CHAT_KEYS } from '@/constants/@queryKeys';
import { useSuspenseQuery } from '@tanstack/react-query';

const useGetMyChatList = () => {
  return useSuspenseQuery({
    queryKey: CHAT_KEYS.CHAT_LIST,
    queryFn: getChatList,
  });
};

export default useGetMyChatList;
