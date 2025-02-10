import styled from 'styled-components';

export const UsersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 424px;
  gap: 16px;
  overflow-x: hidden;
`;

export const UsersTopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.typo.Gray_1000};
`;

export const UsersTitleSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const UsersTitle = styled.h3`
  ${({ theme }) => theme.typo.D2_B};
`;

export const UsersSubTitle = styled.h5`
  ${({ theme }) => theme.typo.T2_R};
`;

export const UsersButtonSection = styled.section`
  cursor: pointer;
`;

export const UsersRecommendSection = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
