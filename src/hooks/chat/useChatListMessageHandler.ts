import { useEffect } from 'react';
import useMessageSubscription from './useMessageSubscription';
import { useLocation, useParams } from 'react-router';
import { CHAT_PATH } from '@/constants/routes';
import { ISentMessageItem } from '@/types/chat';
import { useSetRecoilState } from 'recoil';
import roomListAtom from '@/recoil/chat/roomList';

const useAlarmMessageHandler = () => {
  const { pathname } = useLocation();

  const { roomId } = useParams();

  const { subscribe } = useMessageSubscription();

  const setChatRoomList = useSetRecoilState(roomListAtom);

  useEffect(() => {
    const unsubscribe = subscribe(handleReceivedMessage);

    return () => unsubscribe();
  }, [roomId]);

  const handleReceivedMessage = (data: string) => {
    const message: ISentMessageItem = JSON.parse(data);

    const { chatRoomId, content } = message;

    // 내가 입장한 채팅방 메세지는 제외하고 카운트
    if (pathname.includes(CHAT_PATH.CHAT_ROOM_PATH)) {
      if (Number(roomId) === chatRoomId) {
        setChatRoomList((prevList) =>
          prevList.map((chatRoom) =>
            chatRoom.id === chatRoomId
              ? {
                  ...chatRoom,
                  lastMessage: content,
                }
              : chatRoom,
          ),
        );

        return;
      }
    }

    setChatRoomList((prevList) =>
      prevList.map((chatRoom) =>
        chatRoom.id === chatRoomId
          ? {
              ...chatRoom,
              unreadMessageCount: chatRoom.unreadMessageCount + 1,
              lastMessage: content,
            }
          : chatRoom,
      ),
    );
  };
};

export default useAlarmMessageHandler;
