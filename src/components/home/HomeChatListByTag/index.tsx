import profileAtom from '@/recoil/user/profile';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import 'swiper/swiper-bundle.css';
import ChatRoomRow from '../ChatRoomRow';
import { getRandomNumbers } from '@/utils/random';

const HomeChatListByTag = () => {
  const [categoryIds, setCategoryIds] = useState<number[]>([]);

  const userInfo = useRecoilValue(profileAtom);

  // 사용자가 선택한 관심사 배열 원소 중, 2개만 추출
  useEffect(() => {
    if (userInfo) {
      const userSelectedTag = userInfo.interestTag
        .slice(0, 2)
        .map((tag) => tag.id);

      setCategoryIds(userSelectedTag);
    } else {
      setCategoryIds(getRandomNumbers(1));
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
