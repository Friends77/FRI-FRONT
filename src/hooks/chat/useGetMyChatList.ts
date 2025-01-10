import { getChatList } from '@/apis/chat';
import { IMyChatItem } from '@/types/chat';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

const useGetMyChatList = () => {
  const [chatList, setChatList] = useState<IMyChatItem[] | null>();

  const { mutate } = useMutation({
    mutationFn: getChatList,
    onSuccess: ({ content }) => {
      setChatList(content);
    },
    onError: (error) => {
      console.error(error);
      alert('내 채팅 목록 불러오기 실패!');
    },
  });

  return { mutate, chatList };
};

export default useGetMyChatList;
