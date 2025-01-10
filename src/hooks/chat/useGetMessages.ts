import { getChatMessages } from '@/apis/chat';
import messageAtom from '@/recoil/chat/message';
import { useMutation } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';

export const useGetMessages = () => {
  const [messageList, setMessageList] = useRecoilState(messageAtom);

  const { mutate } = useMutation({
    mutationFn: getChatMessages,
    onSuccess: ({ content }) => {
      setMessageList(
        content.map(({ type, content, senderId, createdAt }) => ({
          type,
          status: 'success',
          message: content,
          senderId,
          senderName: '테스트',
          sendTime: createdAt,
        })),
      );
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { messageList, setMessageList, mutate };
};
