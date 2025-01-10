import { useCreateChatRoom } from '@/hooks/chat/useCreateChatRoom';
import useGetMyChatList from '@/hooks/chat/useGetMyChatList';
import { FormEvent, useEffect } from 'react';
import { Link } from 'react-router';
import useEnterChatRoom from '../../../hooks/chat/useEnterChatRoom';

const ChatListPage = () => {
  const { mutate: createChatRoom } = useCreateChatRoom();
  const { chatList, mutate: getMyChatList } = useGetMyChatList();

  const {
    mutate: enterChatRoom,
    roomIdContent,
    setRoomIdContent,
  } = useEnterChatRoom();

  useEffect(() => {
    getMyChatList();
  }, []);

  const handleCreateChat = () => {
    createChatRoom({ title: '테스트', categoryIdList: [1] });
  };

  const handleRoomIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomIdContent(e.target.value);
  };

  const handleEnterChatRoom = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    enterChatRoom(roomIdContent);
  };

  return (
    <>
      <button onClick={handleCreateChat}>채팅방 생성</button>
      <form onSubmit={handleEnterChatRoom}>
        <input type="text" onChange={handleRoomIdChange} />
        <button type="submit">채팅방 입장</button>
      </form>
      <ul>
        {chatList?.map((chat) => (
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
