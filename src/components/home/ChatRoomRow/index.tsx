/**
 * 각 태그별로 렌더링 되는 추천 채팅방 리스트 행
 * @author 선우
 */

import { useChatRoomsByTag } from '@/hooks/home/useChatRoomsByTag';
import { useEffect, useState } from 'react';
import { SwiperClass, SwiperSlide } from 'swiper/react';
import ChatRoomCard from '../ChatRoomCard';
import PageNavigator from '../PageNavigator';
import * as Styled from './ChatRoomRow.styled';
import { useFetchCategory } from '@/hooks/auth/useFetchCategory';
import Tag from '@/components/@common/Tag';
import { IInterestTag } from '@/types/@common';

export interface ChatRoomRowProps {
  categoryId: number;
}

const ChatRoomRow = ({ categoryId }: ChatRoomRowProps) => {
  const [tag, setTag] = useState<IInterestTag | null>(null);

  // 카테고리 조회
  const { data: tags } = useFetchCategory();

  // 사용자 선택 태그 정보 조회
  useEffect(() => {
    if (tags) {
      const tag = tags.find((tag) => tag.id === categoryId)!;
      setTag(tag);
    }
  }, [categoryId, tags]);

  // 사용자 선택 태그가 포함된 채팅방 리스트
  const { data: chatRooms } = useChatRoomsByTag(categoryId);

  // swiper 관련 state
  const [swiper, setSwiper] = useState<SwiperClass>();

  const [isBeginning, setIsBeginning] = useState(true);

  const [isEnd, setIsEnd] = useState(false);

  // 추천 채팅방 없을 때
  if (!chatRooms) {
    return <div>추천 채팅방 없음</div>;
  }

  return (
    <Styled.Wrapper>
      <Styled.TitleNSwiperSection>
        <Styled.SubTitleSection>
          {tag && <Tag size="large" icon={tag.image} label={tag.name} />}
          <Styled.SubTitle>
            태그가 포함된 채팅방을 추천해 드릴게요.
          </Styled.SubTitle>
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

export default ChatRoomRow;
