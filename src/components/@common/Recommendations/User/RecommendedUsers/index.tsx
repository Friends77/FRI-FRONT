/**
 * 친구 찾아보기 섹션
 * @author 선우
 */

import Restart from '@/components/@common/SVG/Icon/Restart';
import useGetUserRecommendations from '@/hooks/@common/useGetRecommendedUsers';
import profileAtom from '@/recoil/user/profile';
import { useRecoilValue } from 'recoil';
import UserCard from '../UserCard';
import * as Styled from './RecommendedUsers.styled';
import isLoggedInAtom from '@/recoil/auth/isLoggedIn';

const RecommendedUsers = () => {
  // 전역 변수에 저장된 사용자 정보 가져오기
  const userInfo = useRecoilValue(profileAtom);

  const isLoggedIn = useRecoilValue(isLoggedInAtom);

  let size = 0;

  // 사용자 선택 관심사 태그 갯수에 따라 다르게 렌더링
  if (isLoggedIn || userInfo) {
    size = (userInfo?.interestTag?.length ?? 0) >= 2 ? 9 : 4;
  } else {
    // 비로그인 시에는 4명의 친구만 추천
    size = 4;
  }

  const { data, refetch } = useGetUserRecommendations(size);

  return (
    <Styled.UsersWrapper>
      <Styled.UsersTopSection>
        <Styled.UsersTitleSection>
          <Styled.UsersTitle>친구 찾아보기</Styled.UsersTitle>
          <Styled.UsersSubTitle>
            인기 있는 친구들의 프로필을 추천받아보세요.
          </Styled.UsersSubTitle>
        </Styled.UsersTitleSection>
        <Styled.UsersButtonSection onClick={() => refetch()}>
          <Restart title="새로고침" width="20" height="22" />
        </Styled.UsersButtonSection>
      </Styled.UsersTopSection>
      <Styled.UsersRecommendSection>
        {data &&
          data.content.map((user) => (
            <UserCard key={user.memberId} userInfo={user} />
          ))}
      </Styled.UsersRecommendSection>
    </Styled.UsersWrapper>
  );
};

export default RecommendedUsers;
