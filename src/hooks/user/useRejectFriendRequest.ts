import { rejectFriendRequest } from '@/apis/user';
import { USER_KEYS } from '@/constants/@queryKeys';
import { ALERT_MESSAGE } from '@/constants/message';
import alarmListAtom from '@/recoil/user/alarmList';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';

const useRejectFriendRequest = () => {
  const queryClient = useQueryClient();

  const setAlarmList = useSetRecoilState(alarmListAtom);

  return useMutation({
    mutationFn: rejectFriendRequest,
    onSuccess: async (_, alarmId) => {
      await queryClient.invalidateQueries({
        queryKey: USER_KEYS.FRIEND_LIST,
      });

      setAlarmList((prevList) =>
        prevList.filter((alarm) => alarmId !== alarm.id),
      );
    },
    onError: () => {
      alert(ALERT_MESSAGE.FRIEND_REQUEST_REJECT_FAILED);
    },
  });
};

export default useRejectFriendRequest;
