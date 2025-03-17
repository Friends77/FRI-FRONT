import HomeChatListByTag from '@/components/home/HomeChatListByTag';
import * as Styled from './home.styled';
import RecommendedUsers from '@/components/home/Recommendations/User/RecommendedUsers';
import HomeFriendListByTag from '@/components/home/HomeFriendListByTag';
import Banner from '@/components/home/Banner';
import { useRecoilValue } from 'recoil';
import isLoggedInAtom from '@/recoil/auth/isLoggedIn';

const HomePage = () => {
  const isLoggedIn = useRecoilValue(isLoggedInAtom);

  return (
    <Styled.Wrapper>
      <Banner
        roomId={5}
        title={
          <Styled.BannerTitle>
            <h3>
              화제의 기대작!
              <br />
              오징어게임 진심인
              <br />
              사람들과 이모저모 수다 떨기
            </h3>
          </Styled.BannerTitle>
        }
        subTitle="내가 재밌게 본 드라마를 같이 얘기 나누고 싶다면?"
      />
      <Styled.RecommendedContent>
        {/* 사용자 선택 태그 기반 추천 채팅방 영역 */}
        <Styled.ChatRoomByTagSection>
          <Styled.ChatRoomByTagTitleSection>
            <Styled.ChatRoomByTagTitle>
              {isLoggedIn && <>나랑 </>}
              <Styled.Highlight>취향</Styled.Highlight>이 맞는 사람들을
              만나보세요!
            </Styled.ChatRoomByTagTitle>
          </Styled.ChatRoomByTagTitleSection>
          <HomeChatListByTag />
        </Styled.ChatRoomByTagSection>
        {/* 친구 찾아보기 영역 */}
        <RecommendedUsers />
      </Styled.RecommendedContent>
      {/* 사용자 선택 태그 기반 추천 친구 영역 */}
      <HomeFriendListByTag />
    </Styled.Wrapper>
  );
};

export default HomePage;
