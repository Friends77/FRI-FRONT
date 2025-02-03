import useGetMyFriendList from '@/hooks/user/useGetMyFriendList';
import SideBarListWrapper from '../SideBarListWrapper';
import SideBarFriendItem from '../SideBarFriendItem';

const SideBarFriendList = () => {
  const {
    data: { content },
  } = useGetMyFriendList();

  return (
    <SideBarListWrapper title="친구" count={content.length}>
      {content.map((friend) => (
        <SideBarFriendItem key={friend.memberId} friend={friend} />
      ))}
    </SideBarListWrapper>
  );
};

export default SideBarFriendList;
