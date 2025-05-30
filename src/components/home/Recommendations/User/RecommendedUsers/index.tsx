import Restart from '@/components/@common/SVG/Icon/Restart';
import { HOME_CONSTANT } from '@/constants/home';
import usePublicRecommendations from '@/hooks/home/usePublicRecommendations';
import isLoggedInAtom from '@/recoil/auth/isLoggedIn';
import profileAtom from '@/recoil/user/profile';
import { useRecoilValue } from 'recoil';
import UserCard from '../UserCard';
import * as Styled from './RecommendedUsers.styled';
import usePrivateRecommendations from '@/hooks/home/usePrivateRecommendations';
import { ISimpleUserProfile } from '@/types/user';
import { useEffect, useState } from 'react';
import useGetTagLength from '@/hooks/home/useGetTagLength';

const RecommendedUsers = () => {
  const myProfile = useRecoilValue(profileAtom);

  const isLoggedIn = useRecoilValue(isLoggedInAtom);

  const myTagLength = useGetTagLength();

  const [size, setSize] = useState<number>(HOME_CONSTANT.RECO_SIZE_DEFAULT);

  // 사용자 선택 관심사 태그 갯수에 따라 다르게 렌더링
  useEffect(() => {
    if (isLoggedIn || myProfile) {
      if ((myProfile?.interestTag?.length as number) >= 2) {
        setSize(HOME_CONSTANT.RECO_SIZE_MULTI_TAG);
      }
    }
  }, [isLoggedIn, myProfile]);

  // 비로그인 시 친구 찾아보기 섹션 데이터
  const { data: publicRecommendUsers } = usePublicRecommendations();

  // 로그인 시 친구 찾아보기 섹션 데이터
  const { data: privateRecommendUsers, refetch } =
    usePrivateRecommendations(size);

  return (
    <Styled.UsersWrapper
      $type={
        myTagLength < HOME_CONSTANT.FRIEND_RECO_WITH_INTEREST_CARD
          ? 'row'
          : 'column'
      }
    >
      <Styled.UsersTopSection>
        <Styled.UsersTitleSection>
          <Styled.UsersTitle>친구 찾아보기</Styled.UsersTitle>
          <Styled.UsersSubTitle>
            인기 있는 친구들의 프로필을 추천받아 보세요.
          </Styled.UsersSubTitle>
        </Styled.UsersTitleSection>
        {isLoggedIn && (
          <Styled.UsersButtonSection type="button" onClick={() => refetch()}>
            <Restart title="새로고침" width="20" height="22" />
          </Styled.UsersButtonSection>
        )}
      </Styled.UsersTopSection>
      <Styled.UsersRecommendSection>
        {isLoggedIn
          ? privateRecommendUsers &&
            privateRecommendUsers.content
              .filter(
                (user) =>
                  user.type === 'AVAILABLE' || user.type === 'REQUESTED',
              )
              .slice(
                0,
                myTagLength < HOME_CONSTANT.FRIEND_RECO_WITH_INTEREST_CARD
                  ? HOME_CONSTANT.FRIEND_LIMIT_FEW_INTERESTS
                  : undefined,
              )
              .map((user) => (
                <UserCard
                  key={user.profileSimpleResponseDto.memberId}
                  profile={user.profileSimpleResponseDto}
                  friendStatusType={user.type}
                />
              ))
          : publicRecommendUsers &&
            publicRecommendUsers.content.map((user: ISimpleUserProfile) => (
              <UserCard key={user.memberId} profile={user} />
            ))}
      </Styled.UsersRecommendSection>
    </Styled.UsersWrapper>
  );
};

export default RecommendedUsers;
