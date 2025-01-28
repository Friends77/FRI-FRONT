import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getChatRoomDetail } from '@/apis/chat';
import { CHAT_KEYS } from '@/constants/@queryKeys';
import { IChatRoomDetailResponse } from '@/types/chat';

interface IUseGetChatRoomDetails {
  roomId: number;
  setChatRoomDetail: React.Dispatch<
    React.SetStateAction<IChatRoomDetailResponse | null>
  >;
}

const useGetChatRoomDetail = ({
  roomId,
  setChatRoomDetail,
}: IUseGetChatRoomDetails) => {
  const { data: chatRoomDetail } = useQuery({
    queryKey: CHAT_KEYS.CHAT_DETAIL(roomId),
    queryFn: () => getChatRoomDetail(roomId),
    enabled: !!roomId,
  });

  useEffect(() => {
    if (chatRoomDetail) {
      setChatRoomDetail(chatRoomDetail);
    }
  }, [chatRoomDetail]);
};

export default useGetChatRoomDetail;
