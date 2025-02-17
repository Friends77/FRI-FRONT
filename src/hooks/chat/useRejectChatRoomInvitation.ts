import { rejectChatRoomInvite } from '@/apis/chat';
import { USER_KEYS } from '@/constants/@queryKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useRejectChatRoomInvitation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rejectChatRoomInvite,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: USER_KEYS.ALARM_LIST,
      });
    },
    onError: () => {
      alert('채팅방 초대 거절을 실패했습니다.');
    },
  });
};

export default useRejectChatRoomInvitation;
