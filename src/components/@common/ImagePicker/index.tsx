import defaultProfileImg from '@/assets/images/defaultProfile.png';
import { ReactEventHandler, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import * as Styled from './ImagePicker.styled';
import { useImageUpload } from '@/hooks/@common/useImageUpload';
import { ALERT_MESSAGE } from '@/constants/message';

export interface IImagePickerProps {
  /** 폼에서 사용할 필드 이름 */
  name: string;
  /** 이미지 용도 ('public': 비로그인, 'private': 로그인) */
  usage: 'public' | 'private';
  /** 기본 이미지 URL */
  imageUrl?: string;
  /** 기본 프로필 이미지 URL */
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

  useEffect(() => {
    if (imageUrl) {
      setPickedImage(imageUrl);
    }
  }, [imageUrl]);

  const handleImgError: ReactEventHandler<HTMLImageElement> = () => {
    setPickedImage(null);
  };

  const { mutate: imageUpload } = useImageUpload({
    onSuccessHandler: (path) => setValue(name, path, { shouldDirty: true }),
    onErrorHandler: () => {
      alert(ALERT_MESSAGE.IMAGE_UPLOAD_FAILED);
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

      if (usage === 'public') {
        setValue(name, file);
      } else {
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
          <Styled.ImagePickerAddImageButton>
            <Styled.ImagePickerAddImageIcon
              title="이미지 선택 아이콘"
              width="20"
              height="20"
            />
          </Styled.ImagePickerAddImageButton>
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
