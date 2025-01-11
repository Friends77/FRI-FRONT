import { getChatList } from '@/apis/chat';
import { CHAT_KEYS } from '@/constants/@queryKeys';
import { useQuery } from '@tanstack/react-query';

const useGetMyChatList = () => {
  return useQuery({
    queryKey: [CHAT_KEYS.CHAT_LIST],
    queryFn: getChatList,
  });
};

export default useGetMyChatList;
