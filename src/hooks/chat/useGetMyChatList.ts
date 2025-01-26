import { getChatList } from '@/apis/chat';
import { CHAT_KEYS } from '@/constants/@queryKeys';
import { useSuspenseQuery } from '@tanstack/react-query';

<<<<<<< HEAD
const useGetMyChatList = (nickname?: string) => {
=======
const useGetMyChatList = (nickname: string) => {
>>>>>>> 053ee204a19428dbf22c746d5cbd5db0da1505c6
  return useSuspenseQuery({
    queryKey: CHAT_KEYS.CHAT_LIST(nickname),
    queryFn: () => getChatList(nickname),
  });
};

export default useGetMyChatList;
