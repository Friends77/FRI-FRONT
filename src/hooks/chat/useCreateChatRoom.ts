import { createChatRoom } from '@/apis/chat';
import { CHAT_KEYS } from '@/constants/@queryKeys';
import { CHAT_PATH } from '@/constants/routes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

export const useCreateChatRoom = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  return useMutation({
    mutationFn: createChatRoom,
    onSuccess: async ({ chatRoomId }) => {
      await queryClient.invalidateQueries({
        queryKey: CHAT_KEYS.CHAT_LIST,
      });
      navigate(CHAT_PATH.CHAT_ROOM.replace(':roomId', `${chatRoomId}`));
    },
    onError: () => {
      alert('채팅방 생성을 실패했습니다.');
    },
  });
};
