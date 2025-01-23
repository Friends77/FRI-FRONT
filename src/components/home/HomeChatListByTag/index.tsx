/**
 * 사용자 선택 태그 기반 추천 채팅방 리스트
 * @author 선우
 */

import { useChatRoomsByTag } from '@/hooks/home/useChatRoomsByTag';
import profileAtom from '@/recoil/user/profile';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { SwiperClass, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import ChatRoomCard from '../ChatRoomCard';
import PageNavigator from '../PageNavigator';
import * as Styled from './HomeChatListByTag.styled';
import { tags } from '@/constants/tag';
import Tag from '@/components/@common/Tag';

const HomeChatListByTag = () => {
  // swiper 관련 state
  const [swiper, setSwiper] = useState<SwiperClass>();
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const [categoryIds, setCategoryIds] = useState<number[]>([]);

  // 전역 변수에 저장된 사용자 정보 가져오기
  const userInfo = useRecoilValue(profileAtom);

  // 사용자가 선택한 관심사 배열 원소 중, 2개만 추출해서 세팅
  useEffect(() => {
    if (userInfo) {
      const userSelectedTag = userInfo.interestTag
        .map((tag) => tag.id)
        .slice(0, 2);

      setCategoryIds([...userSelectedTag]);
    }
  }, [userInfo]);

  // 사용자 선택 태그1이 포함된 채팅방 리스트
  const { data: chatRooms } = useChatRoomsByTag(categoryIds[0]);

  // 태그 매칭
  let tag = tags.find((tag) => tag.id === categoryIds[0])!;

  // 추천 채팅방 없을 때
  if (!chatRooms) {
    return <div>추천 채팅방 없음</div>;
  }

  return (
    <Styled.Wrapper>
      <Styled.TitleNSwiperSection>
        <Styled.SubTitleSection>
          <Tag icon={tag.image} label={tag?.name} />
          <Styled.SubTitle>이 포함된 채팅방을 추천해드릴게요</Styled.SubTitle>
        </Styled.SubTitleSection>
        <Styled.SwiperSection>
          <PageNavigator
            direction="prev"
            disabled={isBeginning}
            onClick={() => swiper?.slidePrev()}
          />
          <PageNavigator
            direction="next"
            disabled={isEnd}
            onClick={() => swiper?.slideNext()}
          />
        </Styled.SwiperSection>
      </Styled.TitleNSwiperSection>
      <Styled.ChatRoomSection>
        <Styled.StyledSwiper
          slidesPerView={3}
          spaceBetween={20}
          pagination={{
            clickable: true,
          }}
          onSlideChange={(e) => {
            setIsBeginning(e.isBeginning);
            setIsEnd(e.isEnd);
          }}
          onSwiper={(e) => {
            setSwiper(e);
          }}
        >
          {chatRooms &&
            chatRooms.content.map((chatRoom) => (
              <SwiperSlide key={chatRoom.id}>
                <ChatRoomCard {...chatRoom} />
              </SwiperSlide>
            ))}
        </Styled.StyledSwiper>
      </Styled.ChatRoomSection>
    </Styled.Wrapper>
  );
};

export default HomeChatListByTag;
