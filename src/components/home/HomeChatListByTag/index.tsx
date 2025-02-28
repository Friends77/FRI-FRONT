/**
 * 사용자 선택 태그 기반 추천 채팅방 리스트
 * @author 선우
 */

import profileAtom from '@/recoil/user/profile';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import 'swiper/swiper-bundle.css';
import ChatRoomRow from '../ChatRoomRow';

const HomeChatListByTag = () => {
  const [categoryIds, setCategoryIds] = useState<number[]>([]);

  // 전역 변수에 저장된 사용자 정보 가져오기
  const userInfo = useRecoilValue(profileAtom);

  // 사용자가 선택한 관심사 배열 원소 중, 2개만 추출해서 세팅
  useEffect(() => {
    if (userInfo) {
      const userSelectedTag = userInfo.interestTag
        .slice(0, 2)
        .map((tag) => tag.id);

      setCategoryIds(userSelectedTag);
    } else {
      const randomTag = Math.floor(Math.random() * 34) + 1;

      setCategoryIds([randomTag]);
    }
  }, [userInfo]);

  return (
    <>
      {categoryIds.map((categoryId, idx) => (
        <ChatRoomRow key={idx} categoryId={categoryId} />
      ))}
    </>
  );
};

export default HomeChatListByTag;
