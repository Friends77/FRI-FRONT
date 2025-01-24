import { useEffect, useState } from 'react';
import { ISentMessageItem } from '@/types/chat';
import { useMutation, useQuery } from '@tanstack/react-query';
import { enterChatRoom, getChatMessages } from '@/apis/chat';
import { CHAT_KEYS } from '@/constants/@queryKeys';

interface IUseMessageListProps {
  roomId: number;
  setSentMessageList: React.Dispatch<React.SetStateAction<ISentMessageItem[]>>;
}

const useGetPreviousMessage = ({
  roomId,
  setSentMessageList,
}: IUseMessageListProps) => {
  const [isEnter, setIsEnter] = useState(false);

  const { data: messagesResponse } = useQuery({
    queryKey: CHAT_KEYS.CHAT_MESSAGES(roomId),
    queryFn: () => getChatMessages({ roomId }),
    enabled: !!roomId && isEnter,
  });

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
  }, []);

  useEffect(() => {
    if (messagesResponse) {
      setSentMessageList(messagesResponse.content);
    }
  }, [messagesResponse]);
};

export default useGetPreviousMessage;
