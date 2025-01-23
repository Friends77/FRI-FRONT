import { useCreateChatRoom } from '@/hooks/chat/useCreateChatRoom';
import useGetMyChatList from '@/hooks/chat/useGetMyChatList';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { IMyChatItem } from '@/types/chat';

const ChatListPage = () => {
  const [chatList, setChatList] = useState<IMyChatItem[] | null>();

  const { mutate: createChatRoom } = useCreateChatRoom();
  const { data } = useGetMyChatList();

  useEffect(() => {
    if (data) {
      setChatList(data.content);
    }
  }, [data]);

  const handleCreateChatRoom = () => {
    createChatRoom({ title: '테스트', categoryIdList: [1] });
  };

  return (
    <>
      <button onClick={handleCreateChatRoom}>채팅방 생성</button>
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
