import { exitChatRoom } from '@/apis/chat';
import { ROOT_PATH } from '@/constants/routes';
import { useNavigate } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CHAT_KEYS } from '@/constants/@queryKeys';

const useExitChatRoom = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: exitChatRoom,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: CHAT_KEYS.CHAT_LIST,
      });

      navigate(ROOT_PATH.ROOT);
    },
    onError: () => {
      alert('채팅방 나가기를 실패했습니다.');
    },
  });
};

export default useExitChatRoom;
