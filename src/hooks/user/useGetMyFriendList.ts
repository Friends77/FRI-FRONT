import { getFriendList } from '@/apis/user';
import { USER_KEYS } from '@/constants/@queryKeys';
import { useSuspenseQuery } from '@tanstack/react-query';

const useGetMyFriendList = () => {
  return useSuspenseQuery({
    queryKey: USER_KEYS.FRIEND_LIST,
    queryFn: getFriendList,
  });
};

export default useGetMyFriendList;
