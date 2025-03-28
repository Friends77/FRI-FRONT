import styled from 'styled-components';

export const BasicInfoFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BasicInfoFormHeader = styled.div`
  ${({ theme }) => theme.typo.D1_B};
  color: ${({ theme }) => theme.colors.Gray_1000};
`;

export const BasicInfoFormContentSection = styled.div`
  margin-top: 40px;
`;

export const BasicInfoFormImagePickerSection = styled.div`
  display: flex;
  justify-content: center;
`;

export const BasicInfoFormBirthSection = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 16px;
  margin-top: 8px;
`;

export const BasicInfoFormBirthYearSection = styled.div`
  display: flex;
`;

export const BasicInfoFormMDSection = styled.div`
  display: flex;
  gap: 8px;
`;

export const BasicInfoFormLabel = styled.label`
  ${({ theme }) => theme.typo.T2_B};
  color: ${({ theme }) => theme.colors.Gray_1000};

  &::after {
    content: '*';
    position: absolute;
    color: ${({ theme }) => theme.colors.Alter_error};
  }
`;

export const BasicInfoFormGenderSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 30px;
  margin-bottom: 40px;
`;

export const BasicInfoFormRadio = styled.div`
  display: flex;
  gap: 88px;
`;
