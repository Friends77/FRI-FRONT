import { useCreateChatRoom } from '@/hooks/chat/useCreateChatRoom';
import useGetMyChatList from '@/hooks/chat/useGetMyChatList';
import { FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router';
import useEnterChatRoom from '../../../hooks/chat/useEnterChatRoom';
import { IMyChatItem } from '@/types/chat';

const ChatListPage = () => {
  const [chatList, setChatList] = useState<IMyChatItem[] | null>();

  const { mutate: createChatRoom } = useCreateChatRoom();
  const { data } = useGetMyChatList();

  const {
    mutate: enterChatRoom,
    roomIdContent,
    setRoomIdContent,
  } = useEnterChatRoom();

  useEffect(() => {
    if (data) {
      setChatList(data.content);
    }
  }, [data]);

  const handleCreateChatRoom = () => {
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
      <button onClick={handleCreateChatRoom}>채팅방 생성</button>
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
