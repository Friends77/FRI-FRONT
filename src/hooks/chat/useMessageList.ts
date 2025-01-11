import { useEffect } from 'react';
import useGetMessages from './useGetMessages';
import { IChatMessageItem } from '@/types/chat';

interface IUseMessageListProps {
  roomId: string;
  setMessageList: React.Dispatch<React.SetStateAction<IChatMessageItem[]>>;
}

const useMessageList = ({ roomId, setMessageList }: IUseMessageListProps) => {
  const { data: messagesResponse } = useGetMessages(roomId);

  useEffect(() => {
    if (messagesResponse) {
      setMessageList(
        messagesResponse.content.map(
          ({ type, content, senderId, createdAt }) => ({
            type,
            status: 'success',
            message: content,
            senderId,
            senderName: '테스트',
            sendTime: createdAt,
          }),
        ),
      );
    }
  }, [messagesResponse]);
};

export default useMessageList;
