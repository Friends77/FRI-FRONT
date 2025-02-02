import camera from '@/assets/images/camera.png';
import defaultProfileImg from '@/assets/images/defaultProfile.png';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import * as Styled from './ImagePicker.styled';

export interface IImagePickerProps {
  name: string;
}

const ImagePicker = ({ name }: IImagePickerProps) => {
  const { register, setValue } = useFormContext();

  const [pickedImage, setPickedImage] = useState<string | null>(null);

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

      setValue('imageUrl', file);
    }
  };

  return (
    <Styled.ImagePickerWrapper>
      <Styled.ImagePickerImageSection>
        <Styled.ImagePickerImagePreview
          src={pickedImage ? pickedImage : defaultProfileImg}
        />
        <label>
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
