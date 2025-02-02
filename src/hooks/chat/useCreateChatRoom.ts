import { createChatRoom } from '@/apis/chat';
import { CHAT_KEYS } from '@/constants/@queryKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateChatRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createChatRoom,
    onSuccess: ({ chatRoomId }) => {
      queryClient.invalidateQueries({
        queryKey: CHAT_KEYS.CHAT_LIST,
      });
      alert(`${chatRoomId}번 채팅방 생성완료!`);
    },
    onError: (error) => {
      console.log(error);
      alert('채팅방 생성실패!');
    },
  });
};
