import { getFriendsByTag } from '@/apis/home';
import { HOME_KEYS } from '@/constants/@queryKeys';
import { useQuery } from '@tanstack/react-query';

export const useFriendsByTag = (tag: number) => {
  return useQuery({
    queryKey: HOME_KEYS.RECOMMENDED_FRIENDS_BY_TAGS(tag),
    queryFn: () => getFriendsByTag(tag),
  });
};
