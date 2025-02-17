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
    const filteredList = filterKeyword({
      type: 'user',
      keyword,
      content: friendList,
    });

    setFriendList(filteredList as IProfileSimpleResponse[]);
  }, [keyword]);

  return (
    <SideBarListWrapper title="친구" count={friendList.length}>
      {friendList.map((friend) => (
        <SideBarFriendItem key={friend.memberId} friend={friend} />
      ))}
    </SideBarListWrapper>
  );
};

export default SideBarFriendList;
