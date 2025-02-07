import { exitChatRoom } from '@/apis/chat';
import { ROOT_PATH } from '@/constants/routes';
import chatRoomListAtom from '@/recoil/user/chatRoomList';
import { useNavigate } from 'react-router';
import { useSetRecoilState } from 'recoil';
import { useMutation } from '@tanstack/react-query';

const useExitChatRoom = () => {
  const navigate = useNavigate();
  const setChatRoomList = useSetRecoilState(chatRoomListAtom);

  return useMutation({
    mutationFn: exitChatRoom,
    onSuccess: ({ chatRoomId }) => {
      setChatRoomList((prevList) =>
        prevList.filter((room) => room.id !== chatRoomId),
      );

      navigate(ROOT_PATH.ROOT);
    },
    onError: () => {
      alert('채팅방 나가기를 실패했습니다.');
    },
  });
};

export default useExitChatRoom;
