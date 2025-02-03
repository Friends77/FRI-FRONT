import styled from 'styled-components';
import { Swiper } from 'swiper/react';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
`;

export const TitleNSwiperSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SubTitleSection = styled.section`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const SubTitle = styled.h3`
  ${({ theme }) => theme.typo.T2_R};
  color: ${({ theme }) => theme.colors.Gray_1000};
`;

export const SwiperSection = styled.section`
  display: flex;
  align-items: flex-end;
  gap: 8px;
`;

export const ChatRoomSection = styled.section`
  display: flex;
`;

export const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;
`;
