import { useCreateChatRoom } from '@/hooks/chat/useCreateChatRoom';
import useGetMyChatList from '@/hooks/chat/useGetMyChatList';
import { useEffect } from 'react';
import { Link } from 'react-router';
import { useRecoilState } from 'recoil';
import chatRoomListAtom from '@/recoil/user/chatRoomList';

const ChatListPage = () => {
  const [chatRoomList, setChatRoomList] = useRecoilState(chatRoomListAtom);

  const { mutate: createChatRoom } = useCreateChatRoom();

  const { data } = useGetMyChatList();

  useEffect(() => {
    if (data) {
      setChatRoomList(data);
    }
  }, [data]);

  const handleCreateChatRoom = () => {
    createChatRoom({ title: '테스트', categoryIdList: [1] });
  };

  return (
    <>
      <button onClick={handleCreateChatRoom}>채팅방 생성</button>
      <ul>
        {chatRoomList?.map((chat) => (
          <li key={chat.id}>
            <Link
              to={`/chat/room/${chat.id}`}
            >{`${chat.title}(${chat.id})`}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ChatListPage;
