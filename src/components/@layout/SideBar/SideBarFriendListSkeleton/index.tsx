import * as Styled from './SideBarFriendListSkeleton.styled';
import { v4 as uuidv4 } from 'uuid';

const SideBarFriendListSkeleton = () => {
  return (
    <Styled.SkeletonWrapper>
      {Array.from({ length: 10 }, () => 0).map(() => (
        <Styled.SkeletonItem key={uuidv4()}>
          <Styled.ProfileImg />
          <Styled.FriendInfo>
            <Styled.Nickname />
            <Styled.SelfDescription />
          </Styled.FriendInfo>
        </Styled.SkeletonItem>
      ))}
    </Styled.SkeletonWrapper>
  );
};

export default SideBarFriendListSkeleton;
