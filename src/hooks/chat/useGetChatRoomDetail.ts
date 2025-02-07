import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getChatRoomDetail } from '@/apis/chat';
import { CHAT_KEYS } from '@/constants/@queryKeys';
import { useSetRecoilState } from 'recoil';
import roomDetailAtom from '@/recoil/chat/roomDetail';

interface IUseGetChatRoomDetails {
  roomId: number;
}

const useGetChatRoomDetail = ({ roomId }: IUseGetChatRoomDetails) => {
  const setChatRoomDetail = useSetRecoilState(roomDetailAtom);

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
