import { useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import * as Styled from './ImagePicker.styled';
import defaultProfileImg from '@/assets/images/defaultProfile.png';
import camera from '@/assets/images/camera.png';

export interface IImagePickerProps {
  name: string;
}

const ImagePicker = ({ name }: IImagePickerProps) => {
  const { control, register, setValue } = useFormContext();

  const [pickedImage, setPickedImage] = useState<string | null>(null);

  const imageInput = useRef<HTMLInputElement | null>(null);

  const handlePickClick = () => {
    imageInput.current?.click();
  };

  const handleImageDelete = () => {
    setPickedImage(null);
    setValue(name, null);
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

      setValue('imageUrl', e.target.value);
    }
  };

  return (
    <Styled.ImagePickerWrapper>
      <Styled.ImagePickerImageSection>
        <Styled.ImagePickerImagePreivew
          src={pickedImage ? pickedImage : defaultProfileImg}
        />
        <Controller
          control={control}
          name={name}
          render={({ field: { ref } }) => (
            <input
              id={name}
              type="file"
              accept="image/*"
              {...register(name)}
              onChange={(e) => {
                handleImageChange(e);
              }}
              ref={(el) => {
                ref(el);
                imageInput.current = el;
              }}
              hidden
            />
          )}
        />
        <Styled.ImagePickerAddImageButton
          src={camera}
          onClick={handlePickClick}
        />
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
