import { getChatList } from '@/apis/chat';
import { CHAT_KEYS } from '@/constants/@queryKeys';
import { useQuery } from '@tanstack/react-query';

const useGetMyChatList = () => {
  const { data } = useQuery({
    queryKey: CHAT_KEYS.CHAT_LIST(),
    queryFn: getChatList,
  });

  return { data };
};

export default useGetMyChatList;
