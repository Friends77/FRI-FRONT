import styled from 'styled-components';

export const BasicInfoFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 120px;
  margin-bottom: 120px;
`;

export const BasicInfoFormHeader = styled.section`
  ${({ theme }) => theme.typo.D1_B};
  color: ${({ theme }) => theme.colors.Gray_1000};
`;

export const BasicInfoFormContentSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: left;
  gap: 40px;
  margin-top: 66px;
`;

export const BasicInfoFormImagePickerSection = styled.section`
  display: flex;
  justify-content: center;
`;

export const BasicInfoFormBirthSection = styled.section`
  position: relative;
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

export const BasicInfoFormGenderSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const BasicInfoFormRadio = styled.article`
  display: flex;
  gap: 88px;
`;
