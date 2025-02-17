/**
 * 사용자 선택 태그 기반 추천 친구 리스트
 * @author 선우
 */

import profileAtom from '@/recoil/user/profile';
import { useEffect, useState } from 'react';
import FriendsGrid from '../FriendsGrid';
import { useRecoilValue } from 'recoil';
import * as Styled from './HomeFriendListByTag.styles';
import { ChatRoomByTagTitle } from '@/pages/home/home.styled';
import { Highlight } from '@/pages/home/home.styled';

const HomeFriendListByTag = () => {
  const [categoryIds, setCategoryIds] = useState<number[]>([]);

  // 전역 변수에 저장된 사용자 정보 가져오기
  const userInfo = useRecoilValue(profileAtom);

  // 사용자가 선택한 관심사 배열 원소 중, 3개만 추출해서 세팅
  useEffect(() => {
    if (userInfo) {
      const userSelectedTag = userInfo.interestTag
        .slice(0, 3)
        .map((tag) => tag.id);

      setCategoryIds(userSelectedTag);
    }
  }, [userInfo]);

  return (
    <Styled.FriendListByTagWrapper>
      <ChatRoomByTagTitle>
        나랑 <Highlight>취미</Highlight>가 맞는 친구를 추천해줄게요!
      </ChatRoomByTagTitle>
      <Styled.FriendListByTagInnerWrapper>
        {categoryIds.map((categoryId, idx) => (
          <FriendsGrid key={idx} categoryId={categoryId} />
        ))}
      </Styled.FriendListByTagInnerWrapper>
    </Styled.FriendListByTagWrapper>
  );
};

export default HomeFriendListByTag;
