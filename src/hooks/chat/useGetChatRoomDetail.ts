import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getChatRoomDetail } from '@/apis/chat';
import { CHAT_KEYS } from '@/constants/@queryKeys';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import roomDetailAtom from '@/recoil/chat/roomDetail';
import sendMessageHandlerAtom from '@/recoil/chat/sendMessageHandler';
import roomListAtom from '@/recoil/chat/roomList';

interface IUseGetChatRoomDetails {
  roomId: number;
}

const useGetChatRoomDetail = ({ roomId }: IUseGetChatRoomDetails) => {
  const setChatRoomDetail = useSetRecoilState(roomDetailAtom);

  const setChatRoomList = useSetRecoilState(roomListAtom);

  const sendMessageToServer = useRecoilValue(sendMessageHandlerAtom);

  const { data: chatRoomDetail } = useQuery({
    queryKey: CHAT_KEYS.CHAT_DETAIL(roomId),
    queryFn: () => getChatRoomDetail(roomId),
    enabled: !!roomId,
  });

  useEffect(() => {
    if (chatRoomDetail) {
      setChatRoomDetail(chatRoomDetail);

      if (sendMessageToServer) {
        const messageForm = {
          type: 'READ',
          chatRoomId: roomId,
          messageId: chatRoomDetail.lastMessageId,
          clientMessageId: '',
          content: '',
        };

        sendMessageToServer(messageForm);
        setChatRoomList((prevList) =>
          prevList.map((chatRoom) =>
            chatRoom.id === roomId
              ? { ...chatRoom, unreadMessageCount: 0 }
              : chatRoom,
          ),
        );
      }
    }
  }, [chatRoomDetail, setChatRoomDetail, sendMessageToServer, setChatRoomList]);
};

export default useGetChatRoomDetail;
