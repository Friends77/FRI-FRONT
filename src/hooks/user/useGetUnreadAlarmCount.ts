import { getUnreadAlarmCount } from '@/apis/user';
import { USER_KEYS } from '@/constants/@queryKeys';
import { useQuery } from '@tanstack/react-query';

const useGetUnreadAlarmCount = () => {
  return useQuery({
    queryKey: USER_KEYS.UNREAD_ALARM_COUNT,
    queryFn: getUnreadAlarmCount,
  });
};

export default useGetUnreadAlarmCount;
