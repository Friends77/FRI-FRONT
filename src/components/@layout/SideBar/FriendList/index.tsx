import * as Styled from './FriendList.styled';
import useGetMyFriendList from '@/hooks/user/useGetMyFriendList';
import ListWrapper from '../ListWrapper';
import FriendItem from '../FriendItem';
import { useFormContext } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { IProfileSimpleResponse } from '@/types/user';
import { filterKeyword } from '@/utils/search';

const FriendList = () => {
  const { watch } = useFormContext();

  const keyword = watch('keyword');

  const [friendList, setFriendList] = useState<IProfileSimpleResponse[]>([]);

  const { data } = useGetMyFriendList();

  useEffect(() => {
    setFriendList(data.content);
  }, [data]);

  useEffect(() => {
    if (data.content.length > 0) {
      const filteredList = filterKeyword({
        type: 'user',
        keyword,
        content: data.content,
      });

      setFriendList(filteredList as IProfileSimpleResponse[]);
    }
  }, [data.content, keyword]);

  return (
    <ListWrapper title="친구" count={friendList.length}>
      {friendList.length > 0 &&
        friendList.map((friend) => (
          <FriendItem key={friend.memberId} friend={friend} />
        ))}
      {keyword && friendList.length === 0 && (
        <Styled.EmptyText>검색 결과가 없습니다.</Styled.EmptyText>
      )}
    </ListWrapper>
  );
};

export default FriendList;
