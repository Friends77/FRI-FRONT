import * as Styled from './ProfileSkeleton.styled';

const ProfileSkeleton = () => {
  return (
    <Styled.SkeletonContent>
      <Styled.SkeletonImg />
      <Styled.SkeletonNickname />
    </Styled.SkeletonContent>
  );
};

export default ProfileSkeleton;
