import useGetMyChatList from '@/hooks/chat/useGetMyChatList';
import SideBarListWrapper from '../SideBarListWrapper';
import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import chatRoomListAtom from '@/recoil/user/chatRoomList';
import { useFormContext } from 'react-hook-form';
import useDebounce from '@/hooks/@common/useDebounce';
import { useNavigate, useParams } from 'react-router';
import { CHAT_PATH } from '@/constants/routes';
import SideBarChatRoomItem from '../SideBarChatRoomItem';

const SideBarChatList = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const { watch } = useFormContext();
  const keyword = watch('keyword');

  const debouncedKeyword = useDebounce(keyword);
  const { data } = useGetMyChatList(debouncedKeyword);

  const [chatRoomList, setChatRoomList] = useRecoilState(chatRoomListAtom);

  useEffect(() => {
    if (data) {
      setChatRoomList(data);
    }
  }, [data, setChatRoomList]);

  const handleChatRoomClick = useCallback(
    (roomId: number) => {
      const path = CHAT_PATH.CHAT_ROOM.replace(':roomId', roomId.toString());
      navigate(path);
    },
    [navigate],
  );
  return (
    <SideBarListWrapper isOpened title="채팅방" count={chatRoomList.length}>
      {chatRoomList.map((chatRoom) => (
        <SideBarChatRoomItem
          key={chatRoom.id}
          chatRoom={chatRoom}
          isSelected={roomId === chatRoom.id.toString()}
          onClick={handleChatRoomClick}
        />
      ))}
    </SideBarListWrapper>
  );
};

export default SideBarChatList;
