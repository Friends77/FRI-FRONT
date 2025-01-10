import { createChatRoom } from '@/apis/chat';
import { useMutation } from '@tanstack/react-query';

export const useCreateChatRoom = () => {
  return useMutation({
    mutationFn: createChatRoom,
    onSuccess: ({ chatRoomId }) => {
      alert(`${chatRoomId}번 채팅방 생성완료!`);
    },
    onError: (error) => {
      console.log(error);
      alert('채팅방 생성실패!');
    },
  });
};
