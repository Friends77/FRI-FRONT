import { exitChatRoom } from '@/apis/chat';
import { ROOT_PATH } from '@/constants/routes';
import { useNavigate } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CHAT_KEYS } from '@/constants/@queryKeys';
import { ALERT_MESSAGE } from '@/constants/message';

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
      alert(ALERT_MESSAGE.CHAT_EXIT_FAILED);
    },
  });
};

export default useExitChatRoom;
