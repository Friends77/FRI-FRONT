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
  border-radius: 999px;
`;
export const ImagePickerAddImageButton = styled.img`
  position: absolute;
  cursor: pointer;
  bottom: 5px;
  right: 0;
  width: 32px;
  height: 32px;
  border: 1px solid ${({ theme }) => theme.colors.Gray_300};
  border-radius: 16px;
`;
export const ImagePickerRemoveImageButton = styled.p`
  ${({ theme }) => theme.typo.B1_R};
  color: ${({ theme }) => theme.colors.Gray_800};
  cursor: pointer;
  text-decoration: underline;
`;
