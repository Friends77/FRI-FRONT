import { rejectChatRoomInvite } from '@/apis/chat';
import { CHAT_KEYS } from '@/constants/@queryKeys';
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
      alert('채팅방 초대 거절을 실패했습니다.');
    },
  });
};

export default useRejectChatRoomInvitation;
