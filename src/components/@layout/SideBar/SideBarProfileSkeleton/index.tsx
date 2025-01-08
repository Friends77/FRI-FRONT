import * as Styled from './SideBarProfileSkeleton.styled';

const SideBarProfileSkeleton = () => {
  return (
    <Styled.SkeletonContent>
      <Styled.SkeletonImg />
      <Styled.SkeletonNickname />
    </Styled.SkeletonContent>
  );
};

export default SideBarProfileSkeleton;
