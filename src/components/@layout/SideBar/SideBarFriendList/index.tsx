import useGetMyFriendList from '@/hooks/user/useGetMyFriendList';
import SideBarListWrapper from '../SideBarListWrapper';
import * as Styled from './SideBarFriendList.styled';

const SideBarFriendList = () => {
  const {
    data: { content },
  } = useGetMyFriendList();

  return (
    <SideBarListWrapper isOpened title="친구" count={content.length}>
      {content.map((friend) => (
        <Styled.Wrapper key={friend.memberId}>
          <Styled.ProfileImg
            src={friend.imageUrl}
            alt={`${friend.nickname} 프로필 이미지`}
          />
          <Styled.FriendInfo>
            <Styled.Nickname>{friend.nickname}</Styled.Nickname>
            <Styled.SelfDescription>
              {friend.selfDescription}
            </Styled.SelfDescription>
          </Styled.FriendInfo>
        </Styled.Wrapper>
      ))}
    </SideBarListWrapper>
  );
};

export default SideBarFriendList;
