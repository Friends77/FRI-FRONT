import * as Styled from '../SideBarFriendList/SideBarFriendList.styled';
import SideBarListWrapper from '../SideBarListWrapper';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import chatRoomListAtom from '@/recoil/chat/roomList';
import { useFormContext } from 'react-hook-form';
// import useDebounce from '@/hooks/@common/useDebounce';
import { useNavigate, useParams } from 'react-router';
import { CHAT_PATH } from '@/constants/routes';
import SideBarChatRoomItem from '../SideBarChatRoomItem';
import { IMyChatItem } from '@/types/chat';
import { filterKeyword } from '@/utils/search';

const SideBarChatList = () => {
  const { roomId } = useParams();

  const navigate = useNavigate();

  const { watch } = useFormContext();

  const keyword = watch('keyword');

  // debouncedKeyword 안됨
  // const debouncedKeyword = useDebounce(keyword);

  const chatRoomList = useRecoilValue(chatRoomListAtom);

  const [filteredChatList, setFilteredChatList] = useState(chatRoomList);

  useEffect(() => {
    const filteredList = filterKeyword({
      type: 'chat',
      keyword,
      content: chatRoomList,
    });

    setFilteredChatList(filteredList as IMyChatItem[]);
  }, [keyword, chatRoomList]);

  const handleChatRoomClick = useCallback(
    (roomId: number) => {
      const path = CHAT_PATH.CHAT_ROOM.replace(':roomId', roomId.toString());
      navigate(path);
    },
    [navigate],
  );

  return (
    <SideBarListWrapper isOpened title="채팅방" count={filteredChatList.length}>
      {filteredChatList.length > 0 ? (
        filteredChatList.map((chatRoom) => (
          <SideBarChatRoomItem
            key={chatRoom.id}
            chatRoom={chatRoom}
            isSelected={roomId === chatRoom.id.toString()}
            onClick={handleChatRoomClick}
          />
        ))
      ) : (
        <Styled.EmptyText>검색 결과가 없습니다.</Styled.EmptyText>
      )}
    </SideBarListWrapper>
  );
};

export default SideBarChatList;
