import styled from 'styled-components';

export const ImagePickerWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  padding-bottom: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.Gray_300};
  margin-bottom: 40px;
`;

export const PreviewImageButton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const PreviewImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 8px;
  object-fit: cover;
`;

export const Content = styled.div`
  margin-bottom: 34px;
`;

export const Description = styled.p`
  ${({ theme }) => theme.typo.B1_R};
  color: ${({ theme }) => theme.colors.Gray_1000};
  margin-bottom: 8px;
  line-height: 21px;
`;

export const Label = styled.label`
  display: inline-block;
  ${({ theme }) => theme.typo.B1_B};
  border-radius: 8px;
  cursor: pointer;
  padding: 6px 12px;
  color: ${({ theme }) => theme.colors.White};
  background-color: ${({ theme }) => theme.colors.Blue_400};
`;

export const DeleteButton = styled.button`
  ${({ theme }) => theme.typo.B1_R};
  color: ${({ theme }) => theme.colors.Gray_800};
  cursor: pointer;
  text-decoration: underline;
`;
