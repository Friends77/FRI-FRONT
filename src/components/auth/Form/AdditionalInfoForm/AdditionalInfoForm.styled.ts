import styled from 'styled-components';

export const AIFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 120px;
`;

export const AIFormHeader = styled.section`
  ${({ theme }) => theme.typo.D1_B};
  color: ${({ theme }) => theme.colors.Gray_1000};
`;

export const AIFormContentSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  margin: 66px 0px 120px 0px;
`;

export const AIFormMBTISection = styled.section`
  display: flex;
  flex-direction: column;
  width: 320px;
  gap: 16px;
`;

export const AIFormMBTIOption = styled.section`
  display: flex;
  justify-content: space-between;
`;

export const AIFormLabel = styled.label`
  ${({ theme }) => theme.typo.T2_B};
  color: ${({ theme }) => theme.colors.Gray_1000};
`;

export const AIFormRadio = styled.article`
  display: flex;
  flex-direction: column;
  align-items: left;
  gap: 6px;
`;

export const AIFormTagSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 320px;
  gap: 16px;
`;

export const AIFormButtonSection = styled.section`
  display: flex;
  gap: 16px;
`;

export const AIFormCheckBoxSection = styled.section`
  display: flex;
  justify-content: space-between;
`;

export const AIFormColumnSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
