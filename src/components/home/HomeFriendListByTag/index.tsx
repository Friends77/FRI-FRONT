import { Highlight } from '@/pages/home/home.styled';
import profileAtom from '@/recoil/user/profile';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { SubTitle } from '../ChatRoomRow/ChatRoomRow.styled';
import FriendsCard from '../FriendsCard';
import * as Styled from './HomeFriendListByTag.styles';
import { getRandomNumbers } from '@/utils/random';
import { HOME_CONSTANT } from '@/constants/home';

const HomeFriendListByTag = () => {
  const [categoryIds, setCategoryIds] = useState<number[]>([]);

  const userInfo = useRecoilValue(profileAtom);

  // 사용자가 선택한 관심사 배열 원소 중, 3개만 추출
  useEffect(() => {
    if (userInfo) {
      const userSelectedTag = userInfo.interestTag
        .slice(0, HOME_CONSTANT.FRIEND_RECO_WITH_INTEREST_CARD)
        .map((tag) => tag.id);

      setCategoryIds(userSelectedTag);
    } else {
      setCategoryIds(
        getRandomNumbers(HOME_CONSTANT.FRIEND_RECO_WITH_INTEREST_CARD),
      );
    }
  }, [userInfo]);

  return (
    <Styled.FriendListByTagWrapper>
      <Styled.FriendListByTagTitleSection>
        <Styled.FriendListByTagTitle>
          {userInfo && <>나랑 </>}
          <Highlight>취미</Highlight>가 맞는 친구를 추천해줄게요!
        </Styled.FriendListByTagTitle>
        {userInfo && (
          <SubTitle>나와 같은 태그가 포함된 친구를 추천해 드릴게요. </SubTitle>
        )}
      </Styled.FriendListByTagTitleSection>
      <Styled.FriendListByTagInnerWrapper>
        {categoryIds.map((categoryId, idx) => (
          <FriendsCard key={idx} categoryId={categoryId} />
        ))}
      </Styled.FriendListByTagInnerWrapper>
    </Styled.FriendListByTagWrapper>
  );
};

export default HomeFriendListByTag;
