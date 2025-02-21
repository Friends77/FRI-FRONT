import { acceptChatRoomInvite } from '@/apis/chat';
import { CHAT_KEYS } from '@/constants/@queryKeys';
import alarmListAtom from '@/recoil/user/alarmList';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';

interface IUseAcceptChatRoomInvitation {
  onSuccessHandler: () => void;
}

const useAcceptChatRoomInvitation = ({
  onSuccessHandler,
}: IUseAcceptChatRoomInvitation) => {
  const queryClient = useQueryClient();

  const setAlarmList = useSetRecoilState(alarmListAtom);

  return useMutation({
    mutationFn: acceptChatRoomInvite,
    onSuccess: async (_, alarmId) => {
      await queryClient.invalidateQueries({
        queryKey: CHAT_KEYS.CHAT_LIST,
      });

      setAlarmList((prevList) =>
        prevList.filter((alarm) => alarmId !== alarm.id),
      );

      onSuccessHandler();
    },
    onError: () => {
      alert('채팅방 초대 수락을 실패했습니다.');
    },
  });
};

export default useAcceptChatRoomInvitation;
