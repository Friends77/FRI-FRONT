import { SwiperClass } from 'swiper/react';
import Close from '../SVG/Icon/Close';
import * as Styled from './ImageViewer.styled';
import ModalContainer from '@/utils/portal';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useEffect, useRef, useState } from 'react';
import useLockBodyScroll from '@/hooks/@common/useLockBodyScroll';
import PageNavigator from '@/components/home/PageNavigator';

interface IImageViewer {
  imageList: string[];
  alt: string;
  onClose: () => void;
  selectedImageIndex: number;
}

const ImageViewer = ({
  imageList,
  alt,
  onClose,
  selectedImageIndex,
}: IImageViewer) => {
  const swiper = useRef<SwiperClass | null>(null);
  const [swiperIndex, setSwiperIndex] = useState(selectedImageIndex);

  const handleClose = () => {
    onClose();
  };

  const handlePrev = () => {
    swiper.current?.slidePrev();
  };
  const handleNext = () => {
    swiper.current?.slideNext();
  };

  useEffect(() => {
    if (swiper) {
      swiper.current?.slideTo(selectedImageIndex, 0);
    }
  }, [swiper, selectedImageIndex]);

  useEffect(() => {
    setSwiperIndex(swiperIndex);
  }, [swiperIndex]);

  useLockBodyScroll();

  return (
    <ModalContainer id="modal">
      <Styled.ImageViewerContainer>
        <Styled.ImageViewer>
          <Styled.Header>
            <Styled.Heading>미리보기</Styled.Heading>
            <Styled.CloseButton onClick={handleClose}>
              <Close title="닫기" width="24" height="24" />
            </Styled.CloseButton>
          </Styled.Header>
          <Styled.SwiperContainer
            slidesPerView={1}
            onSwiper={(e) => {
              swiper.current = e;
            }}
            onSlideChange={(e) => {
              setSwiperIndex(e.activeIndex);
            }}
          >
            <Styled.PrevButton>
              <PageNavigator
                color="gray"
                direction="prev"
                disabled={swiperIndex === 0}
                onClick={handlePrev}
              />
            </Styled.PrevButton>
            {imageList.map((path, index) => (
              <Styled.SwiperSlideContainer key={index}>
                <Styled.Image src={path} alt={alt} />
              </Styled.SwiperSlideContainer>
            ))}
            <Styled.NextButton>
              <PageNavigator
                color="gray"
                direction="next"
                disabled={swiperIndex === imageList.length - 1}
                onClick={handleNext}
              />
            </Styled.NextButton>
          </Styled.SwiperContainer>
          <Styled.Pagination>{`${swiperIndex + 1}/${imageList.length}`}</Styled.Pagination>
        </Styled.ImageViewer>
      </Styled.ImageViewerContainer>
    </ModalContainer>
  );
};

export default ImageViewer;
