import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { enterChatRoom } from '@/apis/chat';

interface IUseMessageListProps {
  roomId: number;
  setIsEnter: React.Dispatch<React.SetStateAction<boolean>>;
  lastMsgId: number | null;
}

const useEnterChatRoom = ({
  roomId,
  setIsEnter,
  lastMsgId,
}: IUseMessageListProps) => {
  const { mutate } = useMutation({
    mutationFn: () => enterChatRoom(roomId),
    onError: (_) => {
      alert('채팅방 입장 실패!');
    },
  });

  useEffect(() => {
    if (!lastMsgId) {
      mutate();
      setIsEnter(true);
    }
  }, [lastMsgId]);
};

export default useEnterChatRoom;
