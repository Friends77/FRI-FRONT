import { enterChatRoom } from '@/apis/chat';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router';

const useEnterChatRoom = () => {
  const { roomId } = useParams();

  return useMutation({
    mutationFn: () => enterChatRoom(roomId as string),
    onSuccess: () => {
      console.log('성공');
    },
    onError: (error) => {
      console.error(error);
      alert('채팅방 입장 실패!');
    },
  });
};

export default useEnterChatRoom;
