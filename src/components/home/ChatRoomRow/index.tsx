import { useChatRoomsByTag } from '@/hooks/home/useChatRoomsByTag';
import { useEffect, useState } from 'react';
import { SwiperClass, SwiperSlide } from 'swiper/react';
import ChatRoomCard from '../ChatRoomCard';
import PageNavigator from '../../@common/PageNavigator';
import * as Styled from './ChatRoomRow.styled';
import useGetCategory from '@/hooks/@common/useGetCategory';
import Tag from '@/components/@common/Tag';
import { IInterestTag } from '@/types/@common';

export interface ChatRoomRowProps {
  categoryId: number;
}

const ChatRoomRow = ({ categoryId }: ChatRoomRowProps) => {
  const [tag, setTag] = useState<IInterestTag | null>(null);

  const { data: tags } = useGetCategory();

  useEffect(() => {
    if (tags) {
      const tag = tags.find((tag) => tag.id === categoryId)!;
      setTag(tag);
    }
  }, [categoryId, tags]);

  const { data: chatRooms } = useChatRoomsByTag(categoryId);

  const [swiper, setSwiper] = useState<SwiperClass>();

  const [isBeginning, setIsBeginning] = useState(true);

  const [isEnd, setIsEnd] = useState(false);

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

      <Styled.StyledSwiper
        slidesPerView="auto"
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
    </Styled.Wrapper>
  );
};

export default ChatRoomRow;
