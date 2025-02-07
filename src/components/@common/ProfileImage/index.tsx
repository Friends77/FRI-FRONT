import { ReactEventHandler } from 'react';
import defaultProfileImg from '@/assets/images/defaultProfile.png';
import * as Styled from './ProfileImage.styled';

interface IProfileImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** 이미지 크기, size === 가로 === 세로 */
  size: number;
}

/**
 *  @ProfileImage
 *    @사용목적
 *      1) 프로필 이미지 스타일과 에러 처리
 *    @주요기능
 *      1) 프로필 이미지 렌더링
 *      2) 프로필 이미지 src 에러 발생 시 처리
 */

const ProfileImage = ({ size, ...rest }: IProfileImageProps) => {
  const handleImgError: ReactEventHandler<HTMLImageElement> = (e) => {
    e.currentTarget.src = defaultProfileImg;
  };

  return <Styled.ProfileImg $size={size} onError={handleImgError} {...rest} />;
};

export default ProfileImage;
