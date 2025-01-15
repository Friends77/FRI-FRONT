import { useEffect } from 'react';
import useGetMessages from './useGetMessages';
import { ISentMessageItem } from '@/types/chat';

interface IUseMessageListProps {
  roomId: number;
  setSentMessageList: React.Dispatch<React.SetStateAction<ISentMessageItem[]>>;
}

const useMessageList = ({
  roomId,
  setSentMessageList,
}: IUseMessageListProps) => {
  const { data: messagesResponse } = useGetMessages(roomId);

  useEffect(() => {
    if (messagesResponse) {
      setSentMessageList(messagesResponse.content);
    }
  }, [messagesResponse]);
};

export default useMessageList;
