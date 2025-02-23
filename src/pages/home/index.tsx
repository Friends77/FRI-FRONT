/**
 * 홈페이지
 * @author 선우
 */

import HomeChatListByTag from '@/components/home/HomeChatListByTag';
import * as Styled from './home.styled';
import RecommendedUsers from '@/components/@common/Recommendations/User/RecommendedUsers';
import HomeFriendListByTag from '@/components/home/HomeFriendListByTag';
import Banner from '@/components/home/Banner';

const HomePage = () => {
  return (
    <Styled.Wrapper>
      {/*배너 영역 */}
      <Banner
        roomId={5}
        title={
          <Styled.BannerTitle>
            <h3>화제의 기대작!</h3>
            <h3>오징어게임 진심인</h3>
            <h3>사람들과 이모저모 수다 떨기</h3>
          </Styled.BannerTitle>
        }
        subTitle="내가 재밌게 본 드라마를 같이 얘기 나누고 싶다면?"
      />
      <Styled.RecommendedContent>
        {/* 사용자 선택 태그 기반 추천 채팅방 영역 */}
        <Styled.ChatRoomByTagSection>
          <Styled.ChatRoomByTagTitleSection>
            <Styled.ChatRoomByTagTitle>
              나랑 <Styled.Highlight>취향</Styled.Highlight>이 맞는 사람들을
              만나보세요!
            </Styled.ChatRoomByTagTitle>
          </Styled.ChatRoomByTagTitleSection>
          <HomeChatListByTag />
        </Styled.ChatRoomByTagSection>
        {/* 친구 찾아보기 영역 */}
        <RecommendedUsers />
      </Styled.RecommendedContent>
      {/*사용자 선택 태그 기반 추천 친구 영역 */}
      <HomeFriendListByTag />
    </Styled.Wrapper>
  );
};

export default HomePage;
