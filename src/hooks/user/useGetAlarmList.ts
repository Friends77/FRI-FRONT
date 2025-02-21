import { getAlarmList } from '@/apis/user';
import { USER_KEYS } from '@/constants/@queryKeys';
import { USER_CONSTANT } from '@/constants/user';
import { useQuery } from '@tanstack/react-query';

const useGetAlarmList = (lastAlarmId?: number) => {
  return useQuery({
    queryKey: [USER_KEYS.ALARM_LIST, lastAlarmId],
    queryFn: () =>
      getAlarmList({
        size: USER_CONSTANT.DEFAULT_ALARM_SIZE,
        lastAlarmId,
      }),
  });
};

export default useGetAlarmList;
