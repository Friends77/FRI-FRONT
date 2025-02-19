import * as Styled from './SideBarFriendList.styled';
import useGetMyFriendList from '@/hooks/user/useGetMyFriendList';
import SideBarListWrapper from '../SideBarListWrapper';
import SideBarFriendItem from '../SideBarFriendItem';
import { useFormContext } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { IProfileSimpleResponse } from '@/types/user';
import { filterKeyword } from '@/utils/search';

const SideBarFriendList = () => {
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
    <SideBarListWrapper title="친구" count={friendList.length}>
      {friendList.length > 0 ? (
        friendList.map((friend) => (
          <SideBarFriendItem key={friend.memberId} friend={friend} />
        ))
      ) : (
        <Styled.EmptyText>검색 결과가 없습니다.</Styled.EmptyText>
      )}
    </SideBarListWrapper>
  );
};

export default SideBarFriendList;
