import { createChatRoom } from '@/apis/chat';
import { ALERT_MESSAGE } from '@/constants/message';
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
      alert(ALERT_MESSAGE.CHAT_CREATION_FAILED);
    },
  });
};
