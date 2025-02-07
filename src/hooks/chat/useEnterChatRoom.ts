import { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { enterChatRoom } from '@/apis/chat';
import { CHAT_KEYS } from '@/constants/@queryKeys';

interface IUseMessageListProps {
  roomId: number;
  setIsEnter: React.Dispatch<React.SetStateAction<boolean>>;
}

const useEnterChatRoom = ({ roomId, setIsEnter }: IUseMessageListProps) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => enterChatRoom(roomId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CHAT_KEYS.CHAT_LIST(),
      });
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
