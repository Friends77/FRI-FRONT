import Camera from '@/components/@common/SVG/Icon/Camera';
import styled from 'styled-components';

export const ImagePickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 97px;
  height: 117px;
  gap: 8px;
`;

export const ImagePickerImageSection = styled.section`
  position: relative;
`;

export const ImagePickerImagePreview = styled.img`
  width: 88px;
  height: 88px;
  object-fit: cover;
  border-radius: 999px;
  cursor: pointer;
`;

export const ImagePickerAddImageButton = styled.div`
  position: absolute;
  right: -6px;
  bottom: 4px;
  width: 32px;
  height: 32px;
  background-color: ${({ theme }) => theme.colors.White};
  border: 1px solid ${({ theme }) => theme.colors.Gray_300};
  border-radius: 16px;
  cursor: pointer;
`;

export const ImagePickerAddImageIcon = styled(Camera)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const ImagePickerRemoveImageButton = styled.p`
  ${({ theme }) => theme.typo.B1_R};
  color: ${({ theme }) => theme.colors.Gray_800};
  cursor: pointer;
  text-decoration: underline;
`;
