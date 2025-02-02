import { SwiperClass } from 'swiper/react';
import Close from '../SVG/Icon/Close';
import * as Styled from './ImageViewer.styled';
import ModalContainer from '@/utils/portal';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import PrevButton from '../SVG/Icon/PrevButton';
import NextButton from '../SVG/Icon/NextButton';
import { useEffect, useState } from 'react';
import useLockBodyScroll from '@/hooks/@common/useLockBodyScroll';

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
  const [swiper, setSwiper] = useState<SwiperClass>();
  const [swiperIndex, setSwiperIndex] = useState(0);

  const handleClose = () => {
    onClose();
  };

  const handlePrev = () => {
    swiper?.slidePrev();
  };
  const handleNext = () => {
    swiper?.slideNext();
  };

  useEffect(() => {
    if (swiper) {
      swiper.slideTo(selectedImageIndex, 0);
    }
  }, [swiper, selectedImageIndex]);

  useLockBodyScroll();

  return (
    <ModalContainer id="modal">
      <Styled.ImageViewerContainer>
        <Styled.ImageViewer>
          <Styled.Header>
            <h3>미리보기</h3>
            <Styled.CloseButton onClick={handleClose}>
              <Close title="닫기" width="24" height="24" />
            </Styled.CloseButton>
          </Styled.Header>
          <Styled.SwiperContainer
            slidesPerView={1}
            onSwiper={(e) => {
              setSwiper(e);
            }}
            onActiveIndexChange={(e) => setSwiperIndex(e.realIndex)}
          >
            <Styled.PrevButton onClick={handlePrev}>
              {/* TODO: PageNavigator가 머지되면 교체예정 */}
              <PrevButton title="이전" width="40" height="40" />
            </Styled.PrevButton>
            {imageList.map((path, index) => (
              <Styled.SwiperSlideContainer key={index}>
                <Styled.Image src={path} alt={alt} />
              </Styled.SwiperSlideContainer>
            ))}
            <Styled.NextButton onClick={handleNext}>
              {/* TODO: PageNavigator가 머지되면 교체예정 */}
              <NextButton title="다음" width="40" height="40" />
            </Styled.NextButton>
          </Styled.SwiperContainer>
          <Styled.Pagination>{`${swiperIndex + 1}/${imageList.length}`}</Styled.Pagination>
        </Styled.ImageViewer>
      </Styled.ImageViewerContainer>
    </ModalContainer>
  );
};

export default ImageViewer;
