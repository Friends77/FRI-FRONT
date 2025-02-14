import { useFormContext } from 'react-hook-form';
import * as Styled from './ImagePicker.styled';
import defaultThumbnail from '@/assets/images/defaultThumbnail.png';
import { ICreateChatRoomForm } from '@/types/chat';
import { useState } from 'react';

const ImagePicker = () => {
  const [previewImage, setPreviewImage] = useState(defaultThumbnail);

  const { setValue } = useFormContext<ICreateChatRoomForm>();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files) {
      setPreviewImage(URL.createObjectURL(files[0]));
      setValue('backgroundImage', files[0]);
    }
  };

  const handleDeleteImage = () => {
    setPreviewImage(defaultThumbnail);
  };

  return (
    <Styled.ImagePickerWrapper>
      <Styled.PreviewImageButton>
        <Styled.PreviewImage
          src={previewImage || defaultThumbnail}
          alt="채팅방 썸네일"
        />
      </Styled.PreviewImageButton>

      <Styled.Content>
        <Styled.Description>
          채팅방 썸네일 미 업로드 시,
          <br /> 기본 채팅방 사진으로 지정됩니다.
        </Styled.Description>

        <Styled.Label>
          이미지 업로드
          <input
            type="file"
            accept="image/*"
            id="backgroundImage"
            onChange={handleImageChange}
            hidden
          />
        </Styled.Label>
        {previewImage !== defaultThumbnail && (
          <Styled.DeleteButton type="button" onClick={handleDeleteImage}>
            삭제
          </Styled.DeleteButton>
        )}
      </Styled.Content>
    </Styled.ImagePickerWrapper>
  );
};

export default ImagePicker;
