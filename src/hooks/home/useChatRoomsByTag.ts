import { getChatRoomsByTag } from '@/apis/home';
import { HOME_KEYS } from '@/constants/@queryKeys';
import { useQuery } from '@tanstack/react-query';

export const useChatRoomsByTag = (tags: number) => {
  return useQuery({
    queryKey: HOME_KEYS.RECOMMENDED_ROOMS_BY_TAGS,
    queryFn: () => getChatRoomsByTag(tags),
  });
};
