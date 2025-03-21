import styled from 'styled-components';

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 120px;
`;

export const FormHeader = styled.div`
  ${({ theme }) => theme.typo.D1_B};
  color: ${({ theme }) => theme.colors.Gray_1000};
`;

export const FormContentSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  margin: 66px 0px 120px 0px;
`;

export const FormMBTISection = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;
  gap: 16px;
`;

export const FormMBTIOption = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const FormLabel = styled.label`
  ${({ theme }) => theme.typo.T2_B};
  color: ${({ theme }) => theme.colors.Gray_1000};
`;

export const FormRadio = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  gap: 6px;
`;

export const FormTagSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;
  gap: 16px;
`;

export const FormButtonSection = styled.div`
  display: flex;
  gap: 16px;
`;

export const FormCheckBoxSection = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const FormColumnSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
