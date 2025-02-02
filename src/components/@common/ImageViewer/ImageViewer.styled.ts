import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';

export const ImageViewerContainer = styled.div`
  z-index: 300;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const ImageViewer = styled.div`
  width: 708px;
  height: 90%;
  background-color: ${({ theme }) => theme.colors.White};
  padding: 24px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  ${({ theme }) => theme.typo.T1_B};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const CloseButton = styled.button`
  display: flex;
`;

export const SwiperContainer = styled(Swiper)`
  text-align: center;
  width: 100%;
  height: 100%;
  margin-bottom: 24px;
`;

export const SwiperSlideContainer = styled(SwiperSlide)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Image = styled.img`
  width: 500px;
  object-fit: cover;
`;

export const PrevButton = styled.button`
  position: absolute;
  top: 50%;
  left: 0;
  cursor: pointer;
  z-index: 400;
`;
export const NextButton = styled.button`
  position: absolute;
  top: 50%;
  right: 0;
  cursor: pointer;
  z-index: 400;
`;

export const Pagination = styled.div`
  ${({ theme }) => theme.typo.T2_R};
  text-align: center;
`;
