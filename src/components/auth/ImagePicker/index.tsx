import camera from '@/assets/images/camera.png';
import defaultProfileImg from '@/assets/images/defaultProfile.png';
import { ReactEventHandler, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import * as Styled from './ImagePicker.styled';
import { useImageUpload } from '@/hooks/@common/useImageUpload';

export interface IImagePickerProps {
  name: string;
  usage: 'signUp' | 'myPage'; // usage: 사용처(회원가입, 마이페이지)
  imageUrl?: string;
  defaultImageUrl?: string;
}

const ImagePicker = ({
  name,
  usage,
  imageUrl,
  defaultImageUrl,
}: IImagePickerProps) => {
  const { register, setValue } = useFormContext();

  const [pickedImage, setPickedImage] = useState<string | null>(
    imageUrl || null,
  );

  const handleImgError: ReactEventHandler<HTMLImageElement> = () => {
    setPickedImage(null);
  };

  const { mutate: imageUpload } = useImageUpload({
    onSuccessHandler: (path) => setValue(name, path, { shouldDirty: true }),
    onErrorHandler: () => {
      alert('이미지 업로드에 실패하였습니다!');
    },
  });

  const handleImageDelete = () => {
    setPickedImage(null);
    setValue(name, null, { shouldDirty: true });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        if (typeof fileReader.result === 'string') {
          setPickedImage(fileReader.result);
        }
      };

      fileReader.readAsDataURL(file);

      if (usage === 'signUp') {
        // 회원가입인 경우
        setValue(name, file);
      } else {
        // 프로필 수정인 경우
        const formData = new FormData();
        formData.append('image', file);

        imageUpload(formData);
      }
      setValue('imageUrl', file);
    }
  };

  return (
    <Styled.ImagePickerWrapper>
      <Styled.ImagePickerImageSection>
        <label>
          <Styled.ImagePickerImagePreview
            src={pickedImage || defaultImageUrl || defaultProfileImg}
            onError={handleImgError}
          />
          <input
            type="file"
            accept="image/*"
            id={name}
            {...register(name)}
            onChange={handleImageChange}
            hidden
          />
          <Styled.ImagePickerAddImageButton src={camera} />
        </label>
      </Styled.ImagePickerImageSection>
      {pickedImage && (
        <Styled.ImagePickerRemoveImageButton onClick={handleImageDelete}>
          삭제
        </Styled.ImagePickerRemoveImageButton>
      )}
    </Styled.ImagePickerWrapper>
  );
};

export default ImagePicker;
