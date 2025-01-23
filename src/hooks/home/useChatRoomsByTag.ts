import { getChatRoomsByTag } from '@/apis/home';
import { useQuery } from '@tanstack/react-query';

export const useChatRoomsByTag = (tags: number) => {
  return useQuery({
    queryKey: ['chatRoomsByTag'],
    queryFn: () => getChatRoomsByTag(tags),
  });
};
