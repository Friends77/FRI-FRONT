import { ReactEventHandler } from 'react';
import defaultProfileImg from '@/assets/images/defaultProfile.png';
import * as Styled from './ProfileImage.styled';

interface IProfileImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** 이미지 크기 */
  size: number;
}

const ProfileImage = ({ size, ...rest }: IProfileImageProps) => {
  const handleImgError: ReactEventHandler<HTMLImageElement> = (e) => {
    e.currentTarget.src = defaultProfileImg;
  };

  return <Styled.ProfileImg $size={size} onError={handleImgError} {...rest} />;
};

export default ProfileImage;
