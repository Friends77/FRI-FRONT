import { useState } from 'react';
import defaultProfileImg from '@/assets/images/defaultProfile.png';
import * as Styled from './ProfileImage.styled';

interface IProfileImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** 이미지 크기 */
  size: number;
}

const ProfileImage = ({ size, src, ...rest }: IProfileImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);

  const handleImgError = () => {
    setImgSrc(defaultProfileImg);
  };

  return (
    <Styled.ProfileImg
      src={imgSrc}
      $size={size}
      alt="프로필 이미지"
      onError={handleImgError}
      {...rest}
    />
  );
};

export default ProfileImage;
