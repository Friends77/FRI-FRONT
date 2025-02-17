/**
 * 홈페이지
 * @author 선우
 */

import HomeChatListByTag from '@/components/home/HomeChatListByTag';
import * as Styled from './home.styled';
import RecommendedUsers from '@/components/@common/Recommendations/User/RecommendedUsers';

const HomePage = () => {
  return (
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
  );
};

export default HomePage;
