import { createChatRoom } from '@/apis/chat';
import { CHAT_PATH } from '@/constants/routes';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

export const useCreateChatRoom = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createChatRoom,
    onSuccess: ({ chatRoomId }) => {
      navigate(CHAT_PATH.CHAT_ROOM.replace(':roomId', `${chatRoomId}`));
    },
    onError: () => {
      alert('채팅방 생성을 실패했습니다.');
    },
  });
};
