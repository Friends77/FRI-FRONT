import { getChatList } from '@/apis/chat';
import { CHAT_KEYS } from '@/constants/@queryKeys';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

export const PAGE_SIZE = 7;

const useGetMyChatList = () => {
  return useSuspenseInfiniteQuery({
    queryKey: CHAT_KEYS.CHAT_LIST,
    queryFn: ({ pageParam }: { pageParam: number | null }) =>
      getChatList({ size: PAGE_SIZE, lastChatRoomMemberId: pageParam }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext
        ? lastPage.content[lastPage.content.length - 1].chatRoomMemberId
        : undefined;
    },
    select: (data) => data.pages.map((page) => page.content),
  });
};

export default useGetMyChatList;
