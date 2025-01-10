import { enterChatRoom } from '@/apis/chat';
import { CHAT_PATH } from '@/constants/routes';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const useEnterChatRoom = () => {
  const navigate = useNavigate();
  const [roomIdContent, setRoomIdContent] = useState('');

  const { mutate } = useMutation({
    mutationFn: enterChatRoom,
    onSuccess: () => {
      const path = CHAT_PATH.CHAT_ROOM.replace(':roomId', roomIdContent);
      navigate(path);
      setRoomIdContent('');
    },
    onError: (error) => {
      console.error(error);
      alert('채팅방 입장 실패!');
    },
  });

  return { mutate, roomIdContent, setRoomIdContent };
};

export default useEnterChatRoom;
