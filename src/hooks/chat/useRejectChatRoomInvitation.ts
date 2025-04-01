import { rejectChatRoomInvite } from '@/apis/chat';
import { CHAT_KEYS } from '@/constants/@queryKeys';
import { ALERT_MESSAGE } from '@/constants/message';
import alarmListAtom from '@/recoil/user/alarmList';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';

const useRejectChatRoomInvitation = () => {
  const queryClient = useQueryClient();

  const setAlarmList = useSetRecoilState(alarmListAtom);

  return useMutation({
    mutationFn: rejectChatRoomInvite,
    onSuccess: async (_, alarmId) => {
      await queryClient.invalidateQueries({
        queryKey: CHAT_KEYS.CHAT_LIST,
      });

      setAlarmList((prevList) =>
        prevList.filter((alarm) => alarmId !== alarm.id),
      );
    },
    onError: () => {
      alert(ALERT_MESSAGE.CHAT_INVITE_REJECT_FAILED);
    },
  });
};

export default useRejectChatRoomInvitation;
