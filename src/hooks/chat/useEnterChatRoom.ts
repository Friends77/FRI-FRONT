import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { enterChatRoom } from '@/apis/chat';

interface IUseMessageListProps {
  roomId: number;
  setIsEnter: React.Dispatch<React.SetStateAction<boolean>>;
}

const useEnterChatRoom = ({ roomId, setIsEnter }: IUseMessageListProps) => {
  const { mutate } = useMutation({
    mutationFn: () => enterChatRoom(roomId),
    onSuccess: () => {
      setIsEnter(true);
    },
    onError: (error) => {
      console.error(error);
      alert('채팅방 입장 실패!');
    },
  });

  useEffect(() => {
    mutate();
  }, [roomId]);
};

export default useEnterChatRoom;
