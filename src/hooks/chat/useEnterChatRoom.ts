import { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { enterChatRoom as enterChatRoomRequest } from '@/apis/chat';
import { CHAT_KEYS } from '@/constants/@queryKeys';
import { ALERT_MESSAGE } from '@/constants/message';

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
  const queryClient = useQueryClient();

  const { mutate: enterChatRoom } = useMutation({
    mutationFn: () => enterChatRoomRequest(roomId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CHAT_KEYS.CHAT_LIST,
      });

      setIsEnter(true);
    },
    onError: () => {
      alert(ALERT_MESSAGE.CHAT_ENTRY_FAILED);
    },
  });

  useEffect(() => {
    if (!lastMsgId) {
      enterChatRoom();
    }
  }, [lastMsgId]);
};

export default useEnterChatRoom;
